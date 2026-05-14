"use client";

import React, { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTrackerStore } from "../store";
import ProgressView from "../components/ProgressView";
import DashboardView from "../components/DashboardView";
import type { SSEEvent } from "../types";

export default function RunPage() {
  const { slug } = useParams();
  const router = useRouter();
  const run = useTrackerStore((state) => state.runs[slug as string]);
  const updateRun = useTrackerStore((state) => state.updateRun);
  const addLog = useTrackerStore((state) => state.addLog);
  const isStarted = useRef(false);

  useEffect(() => {
    if (!run) {
      router.replace("/tool/ai-mention-tracker/setup");
      return;
    }

    if (run.status === "RUNNING" && !isStarted.current) {
      isStarted.current = true;
      startTracking();
    }
  }, [slug, run, router]);

  const startTracking = async () => {
    if (!run) return;

    try {
      const response = await fetch("/api/run-tracker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(run.config),
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to start tracker API.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.trim().startsWith("data: ")) {
            try {
              const eventData: SSEEvent = JSON.parse(line.trim().slice(6));

              if (eventData.done) {
                updateRun(slug as string, {
                  status: "DASHBOARD",
                  runId: eventData.runId || null,
                  progress: 100,
                });
                return;
              }

              // Update run in store
              addLog(slug as string, {
                step: eventData.step,
                total: eventData.total,
                keyword: eventData.keyword,
                platform: eventData.platform,
                platformLabel: eventData.platformLabel,
                mentioned: eventData.mentioned,
                position: eventData.position,
                aiResponseText: eventData.aiResponseText,
                error: eventData.error,
              });

              if (eventData.total > 0) {
                updateRun(slug as string, {
                  progress: (eventData.step / eventData.total) * 100,
                });
              }
            } catch (parseError) {
              console.error("Failed to parse SSE line:", line, parseError);
            }
          }
        }
      }
    } catch (error) {
      console.error("Stream error:", error);
      updateRun(slug as string, { status: "SETUP" });
      alert("An error occurred while tracking. Please check the console.");
    }
  };

  if (!run) return null;

  return (
    <main>
      {run.status === "RUNNING" && (
        <ProgressView logs={run.logs} progress={run.progress} />
      )}
      {run.status === "DASHBOARD" && (
        <DashboardView formData={run.config} logs={run.logs} runId={run.runId} />
      )}
    </main>
  );
}
