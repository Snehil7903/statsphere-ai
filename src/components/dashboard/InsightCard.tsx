"use client";

import { BrainCircuit, Lightbulb, TrendingUp, ArrowUpRight } from "lucide-react";

type InsightCardProps = {
  title: string;
  description: string;
  index?: number;
};

// Distinct vector mappings to give each type of automated insight structural identity
const INSIGHT_CONFIGS = [
  { icon: BrainCircuit, color: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20" },
  { icon: Lightbulb, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
  { icon: TrendingUp, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
];

export default function InsightCard({ title, description, index = 0 }: InsightCardProps) {
  const config = INSIGHT_CONFIGS[index % INSIGHT_CONFIGS.length];
  const IconComponent = config.icon;

  return (
    <div className="flex flex-col justify-between p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/15 hover:bg-white/[0.02] hover:-translate-y-1 shadow-xl transition-all duration-300 group relative overflow-hidden min-h-[220px]">
      
      <div>
        {/* Header Metadata Row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className={`p-2.5 rounded-xl border border-white/5 shadow-inner ${config.color}`}>
            <IconComponent className="w-4 h-4" />
          </div>
          
          {/* High-End Action Target Indicator Arrow */}
          <ArrowUpRight className="w-4 h-4 text-zinc-700 group-hover:text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
        </div>

        {/* Insight Content Stack */}
        <h4 className="text-sm font-semibold tracking-tight text-white mb-2 group-hover:text-zinc-200 transition-colors">
          {title}
        </h4>
        <p className="text-xs text-zinc-500 font-light leading-relaxed group-hover:text-zinc-400 transition-colors">
          {description}
        </p>
      </div>

      {/* Micro-indicator footer bar inside the card */}
      <div className="mt-6 flex items-center gap-1.5 text-[10px] font-semibold text-zinc-600 group-hover:text-indigo-400 uppercase tracking-widest transition-colors">
        <span className="w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-indigo-400 transition-colors" />
        Analyze Metric
      </div>

      {/* Sleek radial hover gradient background layer mask */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}