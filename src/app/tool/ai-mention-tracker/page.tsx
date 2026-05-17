"use client";

import React from "react";
import Link from "next/link";
import { useTrackerStore } from "./store";

export default function AIMentionTrackerHistoryPage() {
  const runsMap = useTrackerStore((state) => state.runs);
  const deleteRun = useTrackerStore((state) => state.deleteRun);

  // Memoize runs to prevent re-renders unless store changes
  const sortedRuns = React.useMemo(() => {
    return Object.values(runsMap).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [runsMap]);

  return (
    <main className="flex-1 flex flex-col min-w-0 bg-background-light">
        <div className="flex-1 p-4 md:p-8 lg:p-12 max-w-5xl mx-auto w-full">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-display font-black text-slate-900 tracking-tight">Tracking History</h2>
              <p className="text-slate-500 mt-2">Manage and revisit your previous AI mention analysis reports.</p>
            </div>
            <Link 
              href="/tool/ai-mention-tracker/setup"
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-md shadow-primary/20 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined">add</span>
              New Tracking Run
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-medium">
                  <tr>
                    <th className="px-6 py-4">Brand</th>
                    <th className="px-6 py-4">Domain</th>
                    <th className="px-6 py-4">Target</th>
                    <th className="px-6 py-4">Date Run</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sortedRuns.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-400 italic">
                        No previous runs found. Start your first analysis!
                      </td>
                    </tr>
                  ) : (
                    sortedRuns.map((run) => (
                      <tr key={run.slug} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-6 py-4 font-medium text-slate-900">{run.config.brandName}</td>
                        <td className="px-6 py-4 text-slate-500 font-mono text-xs">{run.config.brandDomain}</td>
                        <td className="px-6 py-4 text-slate-500">
                          {run.config.targetCountry} / {(run.config.targetLanguage || 'en').toUpperCase()}
                        </td>
                        <td className="px-6 py-4 text-slate-500">
                          {new Date(run.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4">
                          {run.status === "DASHBOARD" ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span> Completed
                            </span>
                          ) : run.status === "RUNNING" ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span> In Progress ({Math.round(run.progress)}%)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-yellow-600"></span> Setup
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                          <Link 
                            href={`/tool/ai-mention-tracker/${run.slug}`}
                            className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors flex items-center gap-1 font-bold"
                            title="View Report"
                          >
                            <span className="material-symbols-outlined">visibility</span>
                          </Link>
                          <button 
                            onClick={() => {
                              if(confirm('Are you sure you want to delete this run?')) {
                                deleteRun(run.slug);
                              }
                            }}
                            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Run"
                          >
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
  );
}
