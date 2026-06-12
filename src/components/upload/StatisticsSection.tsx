"use client";

import { Sigma, Binary, HelpCircle } from "lucide-react";
import { calculateStats } from "@/lib/analyticsEngine";
import StatisticsCard from "./StatisticsCard";

type Props = {
  data: Record<string, any>[];
  numericColumns: string[];
};

export default function StatisticsSection({ data, numericColumns }: Props) {
  if (!numericColumns || numericColumns.length === 0) return null;

  return (
    <div className="w-full bg-white/[0.01] border border-white/5 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group mt-8">
      
      {/* Background Ambient Mesh Subtle Accent */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-500/[0.02] rounded-full blur-[90px] pointer-events-none" />

      {/* Modern Workspace Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">
            <Sigma className="w-3.5 h-3.5 text-indigo-400" />
            Descriptive Matrix Profiler
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Statistical Analysis
          </h2>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-400 font-medium self-start sm:self-center">
          <Binary className="w-3.5 h-3.5 text-zinc-500" />
          {numericColumns.length} Numeric Features Computed
        </div>
      </div>

      {/* Premium Dashboard Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 relative z-10">
        {numericColumns.map((column) => (
          <StatisticsCard
            key={column}
            columnName={column} // Pass name down directly to anchor the card title beautifully
            stats={calculateStats(data, column)}
          />
        ))}
      </div>

    </div>
  );
}