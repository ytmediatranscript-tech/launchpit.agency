"use client";

import React, { useRef, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { motion, AnimatePresence } from "framer-motion";
import type { FormData, LogEntry } from "../types";
import { PLATFORM_LIST } from "../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Props {
  formData: FormData;
  logs: LogEntry[];
  runId: string | null;
}

export default function DashboardView({ formData, logs, runId }: Props) {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const {
    brandCount,
    competitorCounts,
    platformHits,
    heatmapData,
    topKeyword,
    bestPlatform,
    visibilityScore,
  } = useMemo(() => {
    let brandMentions = 0;
    const compCounts: Record<string, number> = {};
    formData.competitors.forEach((c) => (compCounts[c] = 0));

    const platformHitsCount: Record<string, number> = {};
    PLATFORM_LIST.forEach((p) => (platformHitsCount[p.id] = 0));

    const keywordHitsCount: Record<string, number> = {};
    formData.keywords.forEach((k) => (keywordHitsCount[k] = 0));

    const heatmap: Record<string, Record<string, LogEntry>> = {};
    formData.keywords.forEach((k) => {
      heatmap[k] = {};
    });

    let validLogs = 0;

    logs.forEach((log) => {
      if (!log.error) {
        validLogs++;
        if (heatmap[log.keyword]) {
          heatmap[log.keyword][log.platform] = log;
        }
        if (log.mentioned) {
          brandMentions++;
          platformHitsCount[log.platform]++;
          if (keywordHitsCount[log.keyword] !== undefined) {
            keywordHitsCount[log.keyword]++;
          }
        }
        if (log.aiResponseText) {
          const lowerText = log.aiResponseText.toLowerCase();
          formData.competitors.forEach((comp) => {
            if (lowerText.includes(comp.toLowerCase())) {
              compCounts[comp]++;
            }
          });
        }
      }
    });

    let bestPlat = "N/A";
    let maxPlat = 0;
    for (const [pId, hits] of Object.entries(platformHitsCount)) {
      if (hits > maxPlat) {
        maxPlat = hits;
        bestPlat = PLATFORM_LIST.find((p) => p.id === pId)?.label || pId;
      }
    }

    let bestKey = "N/A";
    let maxKey = 0;
    for (const [k, hits] of Object.entries(keywordHitsCount)) {
      if (hits > maxKey) {
        maxKey = hits;
        bestKey = k;
      }
    }

    const visScore = validLogs > 0 ? Math.round((brandMentions / validLogs) * 100) : 0;

    return {
      brandCount: brandMentions,
      competitorCounts: compCounts,
      platformHits: platformHitsCount,
      heatmapData: heatmap,
      topKeyword: bestKey,
      bestPlatform: bestPlat,
      visibilityScore: visScore,
    };
  }, [logs, formData]);

  const handleExportPDF = async () => {
    if (!dashboardRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(dashboardRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`AI-Mention-Report-${formData.brandName}.pdf`);
    } finally {
      setIsExporting(false);
    }
  };

  const highlightText = (text: string) => {
    if (!text) return text;
    const regex = new RegExp(
      `(${formData.brandName}|${formData.brandDomain.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      )})`,
      "gi"
    );
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-orange-100 text-primary font-bold px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="bg-background-light font-display text-background-dark min-h-screen antialiased overflow-x-hidden group/design-root w-full">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[1000px] flex-1" ref={dashboardRef}>
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-gray-200 px-6 md:px-10 py-3 bg-white rounded-t-xl shadow-sm mb-4">
              <div className="flex items-center gap-4 text-background-dark">
                <div className="size-6 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">radar</span>
                </div>
                <h2 className="text-background-dark text-lg font-bold leading-tight tracking-[-0.015em]">AI Mention Tracker</h2>
              </div>
              <div className="flex flex-1 justify-end gap-4 md:gap-8">
                <button 
                  onClick={handleExportPDF}
                  disabled={isExporting}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors"
                >
                  <span className="material-symbols-outlined mr-2 text-[18px]">download</span>
                  <span className="truncate">{isExporting ? "Exporting..." : "Download Report"}</span>
                </button>
                <div className="size-10 bg-primary rounded-full flex items-center justify-center text-white font-bold border border-gray-200">
                   <span className="material-symbols-outlined">person</span>
                </div>
              </div>
            </header>

            {/* Metrics Cards */}
            <div className="flex flex-wrap gap-4 p-4">
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-white shadow-sm border border-gray-100">
                <p className="text-gray-500 text-base font-medium leading-normal">Total Mentions</p>
                <p className="text-background-dark tracking-light text-2xl font-bold leading-tight">{brandCount.toLocaleString()}</p>
                <p className="text-green-600 text-sm font-medium leading-normal flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span> Active
                </p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-white shadow-sm border border-gray-100">
                <p className="text-gray-500 text-base font-medium leading-normal">Visibility Score %</p>
                <p className="text-background-dark tracking-light text-2xl font-bold leading-tight">{visibilityScore}%</p>
                <p className="text-blue-600 text-sm font-medium leading-normal flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">info</span> Target
                </p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-white shadow-sm border border-gray-100">
                <p className="text-gray-500 text-base font-medium leading-normal">Best Platform</p>
                <p className="text-background-dark tracking-light text-2xl font-bold leading-tight truncate">{bestPlatform}</p>
                <p className="text-gray-400 text-sm font-medium leading-normal flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">stars</span> Top Performer
                </p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-white shadow-sm border border-gray-100">
                <p className="text-gray-500 text-base font-medium leading-normal">Top Keyword</p>
                <p className="text-background-dark tracking-light text-2xl font-bold leading-tight truncate" title={topKeyword}>{topKeyword}</p>
              </div>
            </div>

            {/* Heatmap */}
            <h2 className="text-background-dark text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Mention Heatmap</h2>
            <div className="px-4 py-3">
              <div className="flex overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm overflow-x-auto">
                <table className="flex-1 w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-gray-600 w-[200px] text-sm font-semibold leading-normal">Keyword</th>
                      {PLATFORM_LIST.map((p) => (
                        <th key={p.id} className="px-4 py-3 text-gray-600 w-32 text-sm font-semibold leading-normal text-center">
                          {p.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {formData.keywords.map((keyword) => (
                      <tr key={keyword} className="border-b border-gray-100 hover:bg-gray-50/50">
                        <td className="h-[60px] px-4 py-2 text-background-dark text-sm font-medium leading-normal font-mono">{keyword}</td>
                        {PLATFORM_LIST.map((platform) => {
                          const log = heatmapData[keyword]?.[platform.id];
                          if (!log) return <td key={platform.id} className="px-4 py-2 text-center text-gray-400">-</td>;

                          return (
                            <td key={platform.id} className="px-4 py-2 text-center">
                              {log.error ? (
                                <span className="inline-flex items-center justify-center rounded-lg h-7 px-3 bg-gray-200 text-gray-600 text-xs font-bold w-full max-w-[80px]">Error</span>
                              ) : log.mentioned ? (
                                <span className="inline-flex items-center justify-center rounded-lg h-7 px-3 bg-green-100 text-green-700 text-xs font-bold w-full max-w-[80px]">
                                  #{log.position || "?"}
                                </span>
                              ) : (
                                <span className="inline-flex items-center justify-center rounded-lg h-7 px-3 bg-red-100 text-red-700 text-xs font-bold w-full max-w-[80px]">None</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Charts Row */}
            <div className="px-4 py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col">
                <h3 className="text-background-dark text-lg font-bold mb-6">Competitor Share of Voice</h3>
                <div className="flex-1 min-h-[250px]">
                  <Bar
                    data={{
                      labels: [formData.brandName, ...formData.competitors],
                      datasets: [
                        {
                          label: "Mentions",
                          data: [brandCount, ...Object.values(competitorCounts)],
                          backgroundColor: [
                            "#ec5b13", // primary
                            ...formData.competitors.map(() => "#94a3b8"), // gray
                          ],
                          borderRadius: 4,
                        },
                      ],
                    }}
                    options={{
                      indexAxis: "y",
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        x: { grid: { display: false } },
                        y: { grid: { display: false } },
                      },
                    }}
                  />
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col items-center justify-center relative min-h-[250px]">
                <h3 className="text-background-dark text-lg font-bold absolute top-6 left-6">Mentions by Platform</h3>
                <div className="w-full h-full pt-10">
                  <Doughnut
                    data={{
                      labels: PLATFORM_LIST.map((p) => p.label),
                      datasets: [
                        {
                          data: PLATFORM_LIST.map((p) => platformHits[p.id] || 0),
                          backgroundColor: ["#3b82f6", "#10b981", "#8b5cf6", "#ec5b13", "#ef4444"],
                          borderWidth: 0,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { position: "right", labels: { usePointStyle: true, boxWidth: 6 } },
                      },
                      cutout: "70%",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none pt-10 pr-20">
                     <span className="text-xl font-bold text-background-dark">{brandCount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Responses */}
            <h2 className="text-background-dark text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">AI Responses Database</h2>
            <div className="px-4 pb-6 flex flex-col gap-3">
              {logs.filter(l => !l.error).length === 0 && (
                <p className="text-gray-500 italic px-4">No responses found.</p>
              )}
              {logs.filter(l => !l.error).map((log, i) => {
                const id = `${log.keyword}-${log.platform}`;
                const isExpanded = expandedRow === id;

                return (
                  <div key={id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <div 
                      className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                      onClick={() => setExpandedRow(isExpanded ? null : id)}
                    >
                      <div className="flex items-center gap-4">
                        {log.mentioned ? (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">Mentioned</span>
                        ) : (
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">No Mention</span>
                        )}
                        <span className="text-sm font-semibold text-background-dark w-48 truncate">{log.keyword}</span>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">smart_toy</span> {log.platformLabel}
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-gray-400">
                        {isExpanded ? 'expand_less' : 'expand_more'}
                      </span>
                    </div>
                    {isExpanded && (
                      <div className="p-5 bg-gray-50 text-sm text-gray-700 leading-relaxed border-l-4 border-primary m-2 bg-white shadow-inner rounded-r">
                        {highlightText(log.aiResponseText || "No response text available.")}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Cited Sources */}
            <h2 className="text-background-dark text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Cited Sources</h2>
            <div className="px-4 pb-10">
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
                    <tr>
                      <th className="px-6 py-3">Source Domain</th>
                      <th className="px-6 py-3">Cited Count</th>
                      <th className="px-6 py-3">Latest Context</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-primary font-medium cursor-pointer flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">link</span> blog.hubspot.com
                      </td>
                      <td className="px-6 py-3 text-background-dark">142</td>
                      <td className="px-6 py-3 text-gray-500 truncate max-w-[300px]">"Top 10 SEO Tools for 2024..."</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-primary font-medium cursor-pointer flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">link</span> searchengineland.com
                      </td>
                      <td className="px-6 py-3 text-background-dark">89</td>
                      <td className="px-6 py-3 text-gray-500 truncate max-w-[300px]">"Comparing modern keyword research platforms..."</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
