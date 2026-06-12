"use client";

import { Layers, CheckCircle2, AlertCircle, Percent, ArrowUpRight, ArrowDownRight } from "lucide-react";

type MetricCardProps = {
  title: string;
  value: string | number;
  change: string;
  index: number;
};

// Map each card position index to an elegant, vibrant icon and accent background color
const METRIC_CONFIGS = [
  { icon: Layers, gradient: "from-indigo-500/20 to-purple-500/5 text-indigo-400" },
  { icon: CheckCircle2, gradient: "from-emerald-500/20 to-teal-500/5 text-emerald-400" },
  { icon: AlertCircle, gradient: "from-amber-500/20 to-orange-500/5 text-amber-400" },
  { icon: Percent, gradient: "from-fuchsia-500/20 to-pink-500/5 text-fuchsia-400" },
];

export default function MetricCard({ title, value, change, index }: MetricCardProps) {
  const config = METRIC_CONFIGS[index % METRIC_CONFIGS.length];
  const IconComponent = config.icon;
  
  const isNegative = change.includes("-");

  return (
    <div className="bg-white/[0.02] border border-white/10 hover:border-white/20 rounded-3xl p-6 backdrop-blur-xl transition-all duration-300 shadow-2xl group relative overflow-hidden flex flex-col justify-between h-40">
      
      {/* Subtle Card Hover Backdrop Lighting */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Top Header Row Block */}
      <div className="flex items-center justify-between relative z-10">
        <span className="text-xs font-medium tracking-wider text-zinc-500 uppercase group-hover:text-zinc-400 transition-colors">
          {title}
        </span>
        <div className={`p-2.5 rounded-xl bg-gradient-to-br border border-white/5 shadow-inner ${config.gradient}`}>
          <IconComponent className="w-4 h-4" />
        </div>
      </div>

      {/* Bottom Main Content Matrix Row */}
      <div className="flex items-baseline justify-between mt-4 relative z-10">
        <h3 className="text-3xl font-bold tracking-tight text-white bg-clip-text">
          {value}
        </h3>
        
        {/* Dynamic Context Trend Indicator pill badge */}
        <span className={`inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border border-white/5 shadow-sm
          ${isNegative 
            ? "bg-rose-500/10 text-rose-400" 
            : "bg-emerald-500/10 text-emerald-400"
          }`}
        >
          {isNegative ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
          {change.replace("+", "").replace("-", "")}
        </span>
      </div>

    </div>
  );
}