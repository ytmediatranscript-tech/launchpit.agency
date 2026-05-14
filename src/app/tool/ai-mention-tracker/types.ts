/* Shared types for the AI Mention Tracker */

export interface FormData {
  brandName: string;
  brandDomain: string;
  competitors: string[];
  keywords: string[];
}

export interface SSEEvent {
  step: number;
  total: number;
  keyword: string;
  platform: string;
  platformLabel: string;
  mentioned: boolean;
  position: number | null;
  aiResponseText?: string;
  done?: boolean;
  runId?: string;
  error?: string;
}

export interface LogEntry {
  step: number;
  total: number;
  keyword: string;
  platform: string;
  platformLabel: string;
  mentioned: boolean;
  position: number | null;
  aiResponseText?: string;
  error?: string;
}

export type Step = "SETUP" | "RUNNING" | "DASHBOARD";

export const PLATFORM_LIST = [
  { id: "google", label: "Google AI Mode" },
  { id: "chatgpt", label: "ChatGPT" },
  { id: "perplexity", label: "Perplexity" },
  { id: "gemini", label: "Gemini" },
  { id: "claude", label: "Claude" },
] as const;
