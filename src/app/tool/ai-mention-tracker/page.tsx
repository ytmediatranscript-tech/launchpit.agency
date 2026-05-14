"use client";

import React, { useState } from "react";
import type { FormData, LogEntry, Step, SSEEvent } from "./types";
import SetupForm from "./components/SetupForm";
import ProgressView from "./components/ProgressView";
import DashboardView from "./components/DashboardView";

export default function AIMentionTrackerPage() {
  const [step, setStep] = useState<Step>("SETUP");
  const [formData, setFormData] = useState<FormData | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [progress, setProgress] = useState(0);
  const [runId, setRunId] = useState<string | null>(null);

  const startRun = async (data: FormData) => {
    setFormData(data);
    setStep("RUNNING");
    setLogs([]);
    setProgress(0);
    setRunId(null);

    try {
      const response = await fetch("/api/run-tracker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
                if (eventData.runId) setRunId(eventData.runId);
                setStep("DASHBOARD");
                return; // Finished
              }

              // Update logs
              setLogs((prev) => [
                ...prev,
                {
                  step: eventData.step,
                  total: eventData.total,
                  keyword: eventData.keyword,
                  platform: eventData.platform,
                  platformLabel: eventData.platformLabel,
                  mentioned: eventData.mentioned,
                  position: eventData.position,
                  aiResponseText: eventData.aiResponseText,
                  error: eventData.error,
                },
              ]);

              // Update progress bar
              if (eventData.total > 0) {
                setProgress((eventData.step / eventData.total) * 100);
              }
            } catch (parseError) {
              console.error("Failed to parse SSE line:", line, parseError);
            }
          }
        }
      }
    } catch (error) {
      console.error("Stream error:", error);
      alert("An error occurred while tracking. Please check the console.");
      setStep("SETUP");
    }
  };

  return (
    <main>
      {step === "SETUP" && <SetupForm onSubmit={startRun} />}
      {step === "RUNNING" && <ProgressView logs={logs} progress={progress} />}
      {step === "DASHBOARD" && formData && (
        <DashboardView formData={formData} logs={logs} runId={runId} />
      )}
    </main>
  );
}
