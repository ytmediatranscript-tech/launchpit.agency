"use client";

import React from "react";
import Link from "react-router-dom"; // Note: In Next.js we use Link from next/link usually, but for a global component we'll use window.location or next/navigation
import { usePathname } from "next/navigation";

export default function TrackerSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Setup Tracker",
      icon: "settings",
      path: "/tool/ai-mention-tracker/setup",
      isActive: pathname === "/tool/ai-mention-tracker/setup"
    },
    {
      label: "History Runs",
      icon: "history",
      path: "/tool/ai-mention-tracker",
      isActive: pathname === "/tool/ai-mention-tracker"
    }
  ];

  return (
    <aside className="w-64 bg-background-dark text-white flex-shrink-0 flex flex-col hidden md:flex min-h-screen border-r border-slate-800/50">
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold shadow-sm shadow-primary/20">
            <span className="material-symbols-outlined text-lg">troubleshoot</span>
          </div>
          <h1 className="font-display font-bold text-lg tracking-tight">Mention Tracker</h1>
        </div>
      </div>
      <nav className="p-4 flex-1">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => window.location.href = item.path}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                  item.isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${item.isActive ? "fill-current" : ""}`}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-white/10">
        <button 
          onClick={() => window.location.href = "/"}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 font-medium transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">home</span>
          Return Home
        </button>
      </div>
    </aside>
  );
}
