import type { Metadata } from "next";
import TrackerStoreProvider from "./components/TrackerStoreProvider";

export const metadata: Metadata = {
  title: "AI Mention Tracker | LaunchPit Internal",
  robots: { index: false, follow: false },
};

export default function TrackerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background-light text-slate-900 antialiased font-display min-h-screen w-full">
      <TrackerStoreProvider>
        {children}
      </TrackerStoreProvider>
    </div>
  );
}
