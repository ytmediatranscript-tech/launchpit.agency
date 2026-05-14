"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { LogEntry } from "../types";

interface Props {
  logs: LogEntry[];
  progress: number;
}

export default function ProgressView({ logs, progress }: Props) {
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  const currentLog = logs.length > 0 ? logs[logs.length - 1] : null;

  return (
    <div className="bg-background-light font-display text-background-dark h-screen overflow-hidden flex w-full">
      {/* Sidebar */}
      <aside className="w-64 h-full shrink-0 flex flex-col justify-between bg-[#1e0f24] p-4 overflow-y-auto hidden md:flex">
        <div className="flex flex-col gap-8">
          <div className="flex gap-3 items-center">
            <div className="bg-primary size-10 rounded-full flex items-center justify-center text-white font-bold shadow-sm shadow-primary/20">
              <span className="material-symbols-outlined">troubleshoot</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-white text-base font-medium leading-normal">AI Tracker</h1>
              <p className="text-primary text-sm font-normal leading-normal">Active</p>
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            <a className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors" href="#">
              <span className="material-symbols-outlined text-white">dashboard</span>
              <p className="text-white text-sm font-medium leading-normal">Dashboard</p>
            </a>
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
              <p className="text-white text-sm font-medium leading-normal">Progress</p>
            </div>
          </nav>
        </div>
        <div className="flex flex-col gap-1">
          <a className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors" href="#">
            <span className="material-symbols-outlined text-white">help</span>
            <p className="text-white text-sm font-medium leading-normal">Help</p>
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto p-8 flex flex-col gap-8">
        {/* Header */}
        <header className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-black leading-tight tracking-tight text-background-dark">Run Progress</h2>
            <p className="text-background-dark/70 text-base font-normal">Currently scanning for mentions across selected platforms</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 font-medium transition-colors">
            <span className="material-symbols-outlined text-lg">cancel</span>
            Cancel Run
          </button>
        </header>

        {/* Progress Card */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-end">
              <p className="text-background-dark text-lg font-bold">Overall Completion</p>
              <p className="text-primary text-4xl font-black">{Math.round(progress)}%</p>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
              <motion.div 
                className="bg-primary h-full rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-background-dark/60 text-sm font-medium text-right">
              {progress < 100 ? "Processing live data stream..." : "Analysis complete!"}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2 p-6 rounded-lg bg-background-light border border-gray-200">
              <p className="text-background-dark/70 text-sm font-medium uppercase tracking-wider">Current Target</p>
              <p className="text-background-dark text-2xl font-bold font-mono truncate" title={currentLog?.keyword}>
                {currentLog ? `"${currentLog.keyword}"` : "..."}
              </p>
            </div>
            <div className="flex flex-col gap-2 p-6 rounded-lg bg-background-light border border-gray-200">
              <p className="text-background-dark/70 text-sm font-medium uppercase tracking-wider">Active Platform</p>
              <p className="text-background-dark text-2xl font-bold">
                {currentLog ? currentLog.platformLabel : "Initializing..."}
              </p>
            </div>
          </div>
        </section>

        {/* Activity Feed */}
        <section className="flex flex-col gap-4 flex-1 min-h-0">
          <h3 className="text-xl font-bold text-background-dark">Activity Feed</h3>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 overflow-hidden flex flex-col min-h-0">
            <div 
              ref={logRef}
              className="flex-1 overflow-y-auto p-4 flex flex-col"
            >
              {logs.length === 0 && (
                <div className="flex items-center gap-4 py-3 px-4 text-gray-400">
                  <span className="font-mono text-sm min-w-[60px]">[0/0]</span>
                  <span className="italic flex-1">Starting tracking engine...</span>
                  <span className="material-symbols-outlined animate-spin">sync</span>
                </div>
              )}
              {logs.map((log, i) => (
                <div 
                  key={i}
                  className={`flex items-center gap-4 py-3 px-4 ${i === logs.length - 1 ? 'bg-primary/5 border border-primary/20 rounded-lg' : 'border-b border-gray-100'}`}
                >
                  <span className={`font-mono text-sm min-w-[60px] ${i === logs.length - 1 ? 'text-primary font-bold' : 'text-gray-400'}`}>
                    [{log.step}/{log.total}]
                  </span>
                  <span className={`font-medium ${i === logs.length - 1 ? 'text-background-dark font-bold' : 'text-background-dark/80'}`}>
                    "{log.keyword}"
                  </span>
                  <span className="text-gray-400 mx-2">→</span>
                  <span className="font-medium text-background-dark flex-1">{log.platformLabel}</span>
                  {log.error ? (
                    <span className="material-symbols-outlined text-red-500">error</span>
                  ) : i === logs.length - 1 && progress < 100 ? (
                    <span className="material-symbols-outlined text-primary animate-spin">sync</span>
                  ) : log.mentioned ? (
                    <span className="material-symbols-outlined text-green-600" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  ) : (
                    <span className="material-symbols-outlined text-gray-300">cancel</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
