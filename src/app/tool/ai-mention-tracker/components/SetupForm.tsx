"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FormData } from "../types";

interface Props {
  onSubmit: (data: FormData) => void;
}

const TEST_INPUTS = [
  {
    label: "Big Tech (Cloud)",
    icon: "cloud",
    data: {
      brandName: "Microsoft Azure",
      brandDomain: "azure.microsoft.com",
      competitors: ["aws.amazon.com", "cloud.google.com"],
      keywords: "best cloud platform for enterprise AI\nmost reliable cloud infrastructure 2026\nAWS vs Azure for machine learning\ntop cloud providers for data security",
      brandKeywords: "Azure AI features\nAzure pricing for startups"
    }
  },
  {
    label: "Automotive (EVs)",
    icon: "electric_car",
    data: {
      brandName: "Tesla",
      brandDomain: "tesla.com",
      competitors: ["lucidmotors.com", "rivian.com", "bmw.com"],
      keywords: "best electric car with longest range\ntop rated luxury EVs 2026\nTesla vs Lucid comparison\nsafest electric vehicles for families",
      brandKeywords: "Tesla Model Y review 2024\nTesla autopilot safety"
    }
  },
  {
    label: "Creative (Design)",
    icon: "palette",
    data: {
      brandName: "Adobe",
      brandDomain: "adobe.com",
      competitors: ["canva.com", "figma.com", "framer.com"],
      keywords: "best software for professional graphic design\nAdobe Creative Cloud vs Canva for business\ntop tools for UI/UX design 2026\nai powered photo editing software",
      brandKeywords: "Adobe Photoshop AI tools\nAdobe subscription vs Canva"
    }
  }
];

export default function SetupForm({ onSubmit }: Props) {
  const [brandName, setBrandName] = useState("");
  const [brandDomain, setBrandDomain] = useState("");
  const [competitors, setCompetitors] = useState<string[]>(["", ""]);
  const [keywordsText, setKeywordsText] = useState("");
  const [brandKeywordsText, setBrandKeywordsText] = useState("");
  const [apiLogin, setApiLogin] = useState("biswa@launchpit.agency");
  const [apiPassword, setApiPassword] = useState("50426def63757114");
  const [targetCountry, setTargetCountry] = useState("US");
  const [targetLanguage, setTargetLanguage] = useState("en");

  const loadTest = (test: typeof TEST_INPUTS[0]) => {
    setBrandName(test.data.brandName);
    setBrandDomain(test.data.brandDomain);
    setCompetitors(test.data.competitors);
    setKeywordsText(test.data.keywords);
    setBrandKeywordsText(test.data.brandKeywords);
  };

  const addCompetitor = () => setCompetitors([...competitors, ""]);

  const updateCompetitor = (index: number, value: string) => {
    const next = [...competitors];
    next[index] = value;
    setCompetitors(next);
  };

  const removeCompetitor = (index: number) => {
    setCompetitors(competitors.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allKeywords = [
      ...keywordsText.split("\n"),
      ...brandKeywordsText.split("\n")
    ].map((k) => k.trim()).filter(Boolean);

    const filteredCompetitors = competitors.map((c) => c.trim()).filter(Boolean);

    if (!brandName || !brandDomain || allKeywords.length === 0) return;

    onSubmit({
      brandName,
      brandDomain,
      competitors: filteredCompetitors,
      keywords: allKeywords,
      apiLogin,
      apiPassword,
      targetCountry,
      targetLanguage
    });
  };

  return (
    <main className="flex-1 flex flex-col min-w-0 bg-background-light">
      <div className="flex-1 p-4 md:p-8 lg:p-12 max-w-4xl mx-auto w-full">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex items-center gap-4">
               <button 
                 onClick={() => window.location.href = "/tool/ai-mention-tracker"}
                 className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
               >
                 <span className="material-symbols-outlined">arrow_back</span>
               </button>
               <div>
                <h2 className="text-3xl font-display font-black text-slate-900 tracking-tight">New Tracking Setup</h2>
                <p className="text-slate-500 mt-2">Configure parameters to run a fresh AI mention analysis.</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Quick Test Scenarios</span>
              <div className="flex gap-2">
                {TEST_INPUTS.map((test, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => loadTest(test)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:border-primary hover:text-primary transition-all shadow-sm"
                  >
                    <span className="material-symbols-outlined text-sm">{test.icon}</span>
                    {test.label.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-12">
            <form onSubmit={handleSubmit}>
              <div className="p-6 md:p-8 space-y-10">
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-800 border-b-2 border-primary/20 pb-1 inline-block">1. DataForSEO Credentials</h3>
                    <a className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 font-medium" href="https://dataforseo.com" target="_blank">
                      <span className="material-symbols-outlined text-[16px]">help</span> Get API Keys
                    </a>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm font-medium text-slate-700">API Login (Email)</label>
                      <input
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-primary focus:ring-primary/20 text-slate-800 placeholder-slate-400 p-2.5 border"
                        placeholder="your@email.com"
                        type="email"
                        value={apiLogin}
                        onChange={(e) => setApiLogin(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm font-medium text-slate-700">API Password</label>
                      <input
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-primary focus:ring-primary/20 text-slate-800 placeholder-slate-400 p-2.5 border"
                        placeholder="••••••••••••"
                        type="password"
                        value={apiPassword}
                        onChange={(e) => setApiPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-slate-800 border-b-2 border-primary/20 pb-1 inline-block mb-4">2. Brand Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm font-medium text-slate-700">Brand Name</label>
                      <input
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-primary focus:ring-primary/20 text-slate-800 placeholder-slate-400 p-2.5 border"
                        placeholder="e.g. Acme Corp"
                        type="text"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm font-medium text-slate-700">Brand Domain</label>
                      <input
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-primary focus:ring-primary/20 text-slate-800 placeholder-slate-400 p-2.5 border"
                        placeholder="e.g. acme.com"
                        type="text"
                        value={brandDomain}
                        onChange={(e) => setBrandDomain(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-slate-800 border-b-2 border-primary/20 pb-1 inline-block mb-4">3. Target Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm font-medium text-slate-700">Target Country</label>
                      <select
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-primary focus:ring-primary/20 text-slate-800 p-2.5 border"
                        value={targetCountry}
                        onChange={(e) => setTargetCountry(e.target.value)}
                      >
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm font-medium text-slate-700">Language</label>
                      <select
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-primary focus:ring-primary/20 text-slate-800 p-2.5 border"
                        value={targetLanguage}
                        onChange={(e) => setTargetLanguage(e.target.value)}
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-slate-800 border-b-2 border-primary/20 pb-1 inline-block mb-4">4. Competitor Domains</h3>
                  <div className="space-y-3">
                    <AnimatePresence initial={false}>
                      {competitors.map((c, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-3 overflow-hidden"
                        >
                          <input
                            className="flex-1 rounded-lg border-slate-300 shadow-sm focus:border-primary focus:ring-primary/20 text-slate-800 placeholder-slate-400 p-2.5 border"
                            placeholder={`competitor${i + 1}.com`}
                            type="text"
                            value={c}
                            onChange={(e) => updateCompetitor(i, e.target.value)}
                          />
                          <button
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove"
                            type="button"
                            onClick={() => removeCompetitor(i)}
                          >
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <button
                      className="mt-2 flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-primary transition-colors px-2 py-1 rounded"
                      type="button"
                      onClick={addCompetitor}
                    >
                      <span className="material-symbols-outlined text-[18px]">add</span> Add Competitor
                    </button>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-slate-800 border-b-2 border-primary/20 pb-1 inline-block mb-4">5. Keywords (One per line)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm font-medium text-slate-700">High-Volume Keywords</label>
                      <textarea
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-primary focus:ring-primary/20 text-slate-800 placeholder-slate-400 font-mono text-sm p-2.5 border"
                        placeholder="best software&#10;top tools&#10;review 2024"
                        rows={5}
                        value={keywordsText}
                        onChange={(e) => setKeywordsText(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm font-medium text-slate-700">Brand/Niche Keywords</label>
                      <textarea
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-primary focus:ring-primary/20 text-slate-800 placeholder-slate-400 font-mono text-sm p-2.5 border"
                        placeholder="acme specific feature&#10;acme alternatives"
                        rows={5}
                        value={brandKeywordsText}
                        onChange={(e) => setBrandKeywordsText(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </section>
              </div>

              <div className="bg-slate-50 p-6 md:p-8 border-t border-slate-200 flex justify-end">
                <button
                  className="w-full md:w-auto px-8 py-4 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold rounded-lg shadow-md shadow-blue-500/20 transition-colors flex items-center justify-center gap-2 text-lg"
                  type="submit"
                >
                  <span className="material-symbols-outlined">play_arrow</span>
                  Run AI Mention Tracker
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
  );
}
