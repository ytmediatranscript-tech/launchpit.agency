"use client";

import React from "react";
import { useRouter } from "next/navigation";
import SetupForm from "../components/SetupForm";
import { useTrackerStore } from "../store";
import type { FormData } from "../types";

export default function SetupPage() {
  const router = useRouter();
  const addRun = useTrackerStore((state) => state.addRun);

  const handleStart = (data: FormData) => {
    // Generate a unique slug based on brand name and timestamp
    const slug = `${data.brandName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Date.now()}`;
    
    addRun({
      slug,
      config: data,
      logs: [],
      status: "RUNNING",
      progress: 0,
      runId: null,
      createdAt: new Date().toISOString(),
    });

    router.push(`/tool/ai-mention-tracker/${slug}`);
  };

  return <SetupForm onSubmit={handleStart} />;
}
