import React from "react";
import TrackerStoreProvider from "./components/TrackerStoreProvider";
import TrackerSidebar from "./components/TrackerSidebar";

export const metadata = {
  title: "AI Mention Tracker | LaunchPit",
  description: "Track your brand mentions across top AI platforms like ChatGPT, Gemini, and Claude.",
};

export default function TrackerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TrackerStoreProvider>
      <div className="flex min-h-screen bg-background-light">
        <TrackerSidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {children}
        </div>
      </div>
    </TrackerStoreProvider>
  );
}
