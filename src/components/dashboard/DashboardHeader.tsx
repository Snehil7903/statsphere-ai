"use client";

import { useMemo } from "react";
import { Calendar, RefreshCw, Sparkles, Download } from "lucide-react";

export default function DashboardHeader() {
  // Dynamically calculate the active calendar date layout for a premium feel
  const formattedDate = useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/5 relative z-10">
      
      {/* Title Meta Stack */}
      <div>
        <div className="flex items-center gap-2 text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          Active Workspace
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50">
          StatSphere Dashboard
        </h1>
        <p className="text-sm text-zinc-500 font-light mt-1">
          AI-Powered Survey Intelligence Platform
        </p>
      </div>

      {/* Interactive Toolbar Actions & Meta Status */}
      <div className="flex flex-wrap items-center gap-4 self-start sm:self-center">
        
        {/* Secondary Download Action Hook */}
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-xs font-medium text-zinc-300 hover:text-white transition-all backdrop-blur-md active:scale-95 shadow-lg">
          <Download className="w-3.5 h-3.5" />
          Export Data
        </button>

        {/* Vertical Separator Line */}
        <div className="hidden min-[400px]:block h-8 w-px bg-white/10" />

        {/* Status System Tracker Info Block */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.01] border border-white/5 shadow-inner backdrop-blur-sm">
          <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="text-left select-none">
            <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 flex items-center gap-1">
              <RefreshCw className="w-2.5 h-2.5 text-emerald-400 animate-spin" style={{ animationDuration: '4s' }} />
              Live Sync
            </p>
            <p className="text-xs font-bold text-zinc-200 mt-0.5">
              {formattedDate}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}