"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ExternalLink, 
  Cpu, 
  Radar, 
  Lock,
  ShieldAlert
} from "lucide-react";

export default function ToolHubPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 15
      }
    }
  };

  const tools = [
    {
      title: "AI Mention Tracker",
      tagline: "Internal SEO Engine",
      description: "Audit and track how your brand is cited, ranked, and presented across major AI platforms like ChatGPT, Gemini, Perplexity, and Claude. Optimize for generative search mindshare.",
      path: "/tool/ai-mention-tracker",
      isExternal: false,
      badges: ["AI SEO", "Active"],
      icon: (
        <div className="relative p-3 rounded-lg bg-[#ec5b13]/5 text-[#ec5b13] border border-[#ec5b13]/10 group-hover:bg-[#ec5b13] group-hover:text-white transition-all duration-300">
          <Radar className="w-5 h-5 animate-pulse" />
        </div>
      )
    },
    {
      title: "Reddit Automation SaaS",
      tagline: "Lead Gen & Social Listening",
      description: "Monitor Reddit forums for relevant conversations in real-time. Automatically generate premium, high-value AI outreach replies to capture high-intent organic leads.",
      path: "https://redditautomation.vercel.app/",
      isExternal: true,
      badges: ["Lead Gen", "Cloud SaaS"],
      icon: (
        <div className="relative p-3 rounded-lg bg-black/5 text-black border border-black/10 group-hover:bg-black group-hover:text-white transition-all duration-300">
          <Cpu className="w-5 h-5" />
        </div>
      )
    }
  ];

  return (
    <main className="bg-[#f8f6f6] h-screen max-h-screen overflow-hidden text-[#4a473a] selection:bg-[#ec5b13] selection:text-white flex flex-col justify-between p-4 md:p-8">
      <div className="max-w-5xl w-full mx-auto my-auto flex flex-col justify-center">
        
        {/* Security Alert Header */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-bold bg-[#ec5b13]/5 border border-[#ec5b13]/15 text-[#ec5b13] uppercase tracking-wider">
            <Lock className="w-3 h-3 text-[#ec5b13]" />
            Secure Workspace
          </span>
        </div>

        {/* Portal Title & Subheader */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <div className="sub-text mb-1 text-[#ec5b13] font-bold tracking-widest text-[11px] uppercase">
            LaunchPit Portals
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-black tracking-tight leading-tight mb-3 font-display">
            Agency Growth Suite
          </h1>
          
          <p className="text-xs md:text-sm text-[#4a473a] max-w-xl mx-auto leading-relaxed">
            Proprietary growth intelligence and social outreach platforms. Engineered internally for rapid lead discovery, brand monitoring, and AI visibility tracking.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto w-full mb-8 items-stretch"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="relative group flex flex-col justify-between p-6 rounded-xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.015)] hover:border-[#ec5b13]/30 hover:shadow-[0_16px_35px_rgba(236,91,19,0.06)] transition-all duration-300 overflow-hidden"
            >
              <div>
                {/* Header inside card */}
                <div className="flex justify-between items-center mb-4">
                  {tool.icon}
                  <div className="flex gap-1.5 justify-end">
                    {tool.badges.map((badge) => (
                      <span 
                        key={badge}
                        className="px-2 py-0.5 rounded text-[8px] uppercase font-bold tracking-wider bg-[#f8f6f6] border border-slate-200/60 text-[#4a473a]"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Body Content */}
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#ec5b13] mb-1 font-display">
                  {tool.tagline}
                </span>
                
                <h2 className="text-xl font-bold font-display text-black tracking-tight mb-2">
                  {tool.title}
                </h2>
                
                <p className="text-xs text-[#4a473a] leading-relaxed mb-6">
                  {tool.description}
                </p>
              </div>

              {/* Styled Black Button with Hover Orange Transition */}
              {tool.isExternal ? (
                <a 
                  href={tool.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-black hover:bg-[#ec5b13] text-white font-bold rounded shadow text-[10px] uppercase tracking-wider transition-colors duration-300 ease-in-out"
                >
                  Launch Service
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <Link 
                  href={tool.path}
                  className="relative overflow-hidden w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#ec5b13] hover:bg-black text-white font-bold rounded shadow text-[10px] uppercase tracking-wider transition-colors duration-300 ease-in-out"
                >
                  Enter Portal
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Secure Workspace Disclaimer Banner */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="pt-4 border-t border-slate-200/60 text-center flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] text-[#4a473a] max-w-4xl mx-auto w-full"
        >
          <div className="flex items-center gap-1.5 text-[#4a473a] font-medium">
            <ShieldAlert className="w-3.5 h-3.5 text-[#ec5b13]" />
            <span>Authorized personnel only. Access strictly monitored.</span>
          </div>
          <div className="font-medium text-slate-400">
            &copy; {new Date().getFullYear()} LaunchPit Agency.
          </div>
        </motion.div>

      </div>
    </main>
  );
}
