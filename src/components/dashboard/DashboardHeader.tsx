"use client";

import { useMemo, useState } from "react";
import { Calendar, RefreshCw, Sparkles, Download, Check } from "lucide-react";

type DashboardHeaderProps = {
  data?: Record<string, any>[]; // Optional dataset passed down to export
  onExport?: () => void;        // Optional custom callback override
};

export default function DashboardHeader({ data = [], onExport }: DashboardHeaderProps) {
  const [exported, setExported] = useState(false);

  // Dynamically calculate the active calendar date layout for a premium feel
  const formattedDate = useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  // Built-in CSV Exporter logic if custom handler is not provided
  const handleExport = () => {
    if (onExport) {
      onExport();
      return;
    }

    // Default fallback: Generates CSV from provided data or placeholder summary
    const exportDataset = data.length > 0 ? data : [
      { Metric: "Total Surveys", Value: 12450 },
      { Metric: "Responses", Value: 11230 },
      { Metric: "Pending", Value: 1220 },
      { Metric: "Completion Rate", Value: "90%" },
    ];

    const headers = Object.keys(exportDataset[0]).join(",");
    const rows = exportDataset.map(row => Object.values(row).map(val => `"${val}"`).join(","));
    const csvContent = [headers, ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `StatSphere_Summary_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Trigger visual feedback state
    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

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
        
        {/* Working Export Data Action Button */}
        <button 
          onClick={handleExport}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-medium transition-all backdrop-blur-md active:scale-95 shadow-lg cursor-pointer ${
            exported 
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
              : "bg-white/5 border-white/10 hover:border-white/20 text-zinc-300 hover:text-white"
          }`}
        >
          {exported ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              Exported CSV
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              Export Data
            </>
          )}
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