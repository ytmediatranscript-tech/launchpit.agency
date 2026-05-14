"use client";

import React, { useEffect, useState } from "react";
import { useTrackerStore } from "../store";

export default function TrackerStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-background-light min-h-screen w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Loading tracker data...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
