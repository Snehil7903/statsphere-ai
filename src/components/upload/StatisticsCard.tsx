"use client";

import { Activity, ArrowUpRight, ShieldAlert } from "lucide-react";

// Assuming your calculateStats returns an object containing these metrics standard
type StatValues = {
  mean?: number;
  median?: number;
  min?: number;
  max?: number;
  stdDev?: number;
  variance?: number;
  [key: string]: any;
};

type StatisticsCardProps = {
  columnName: string;
  stats: StatValues;
};

export default function StatisticsCard({ columnName, stats }: StatisticsCardProps) {
  // Gracefully destructure values with elegant fallbacks
  const { mean = 0, median = 0, min = 0, max = 0, stdDev = 0 } = stats;

  // Format array schema to map individual metrics symmetrically inside sub-pills
  const metricGrid = [
    { label: "Mean (Avg)", val: mean },
    { label: "Median", val: median },
    { label: "Minimum", val: min },
    { label: "Maximum", val: max },
    { label: "Std Deviation", val: stdDev },
  ];

  const formatNumber = (num: number) => {
    return Number.isInteger(num) ? num.toLocaleString() : num.toFixed(3);
  };

  return (
    <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 hover:border-white/15 hover:bg-white/[0.02] shadow-xl transition-all duration-300 group flex flex-col justify-between h-full relative overflow-hidden">
      
      {/* Top Header Block Row */}
      <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:scale-105 transition-transform">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold tracking-tight text-white capitalize">
              {columnName.replace(/([A-Z])/g, " $1").trim()}
            </h4>
            <p className="text-[10px] uppercase text-zinc-500 tracking-wider font-semibold">Distribution Metrics</p>
          </div>
        </div>
        
        <ArrowUpRight className="w-4 h-4 text-zinc-700 group-hover:text-indigo-400 transition-colors" />
      </div>

      {/* Internal Sub-badge Grid Engine Map */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 relative z-10">
        {metricGrid.map((item, idx) => (
          <div 
            key={idx} 
            className={`p-3 rounded-xl border flex flex-col justify-between hover:border-white/10 transition-colors min-h-[65px]
              ${idx === 0 
                ? "bg-indigo-500/[0.02] border-indigo-500/10 col-span-2 sm:col-span-1" 
                : "bg-white/[0.005] border-white/5"
              }`}
          >
            <span className="text-[10px] font-medium text-zinc-500 tracking-wide block truncate">
              {item.label}
            </span>
            <span className={`text-base font-bold tracking-tight mt-1 truncate
              ${idx === 0 ? "text-indigo-300" : "text-zinc-200"}`}
            >
              {formatNumber(item.val)}
            </span>
          </div>
        ))}
      </div>

      {/* Background Hover Flare Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.005] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}