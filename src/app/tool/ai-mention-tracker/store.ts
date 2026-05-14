import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { FormData, LogEntry } from "./types";

export interface TrackerRun {
  slug: string;
  config: FormData;
  logs: LogEntry[];
  status: "SETUP" | "RUNNING" | "DASHBOARD";
  progress: number;
  runId: string | null;
  createdAt: string;
}

interface TrackerState {
  runs: Record<string, TrackerRun>;
  addRun: (run: TrackerRun) => void;
  updateRun: (slug: string, updates: Partial<TrackerRun>) => void;
  addLog: (slug: string, log: LogEntry) => void;
  getRun: (slug: string) => TrackerRun | undefined;
  deleteRun: (slug: string) => void;
}

export const useTrackerStore = create<TrackerState>()(
  persist(
    (set, get) => ({
      runs: {},
      addRun: (run) =>
        set((state) => ({
          runs: { ...state.runs, [run.slug]: run },
        })),
      updateRun: (slug, updates) =>
        set((state) => {
          const run = state.runs[slug];
          if (!run) return state;
          
          // Only update if something actually changed to prevent infinite loops
          const hasChanged = Object.entries(updates).some(([key, value]) => (run as any)[key] !== value);
          if (!hasChanged) return state;

          return {
            runs: {
              ...state.runs,
              [slug]: { ...run, ...updates },
            },
          };
        }),
      addLog: (slug, log) =>
        set((state) => {
          const run = state.runs[slug];
          if (!run) return state;
          // Avoid duplicate logs
          const isDuplicate = run.logs.some(l => l.step === log.step && l.platform === log.platform);
          if (isDuplicate) return state;
          
          return {
            runs: {
              ...state.runs,
              [slug]: { ...run, logs: [...run.logs, log] },
            },
          };
        }),
      getRun: (slug) => get().runs[slug],
      deleteRun: (slug) =>
        set((state) => {
          const newRuns = { ...state.runs };
          delete newRuns[slug];
          return { runs: newRuns };
        }),
    }),
    {
      name: "ai-mention-tracker-storage",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : (null as any))),
    }
  )
);
