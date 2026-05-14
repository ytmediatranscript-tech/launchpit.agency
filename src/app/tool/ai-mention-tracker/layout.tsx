import type { Metadata } from "next";

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
      {children}
    </div>
  );
}
