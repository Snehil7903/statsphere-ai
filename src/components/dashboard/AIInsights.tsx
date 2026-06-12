"use client";

import { Sparkles, Cpu, Lightbulb } from "lucide-react";
import InsightCard from "@/components/dashboard/InsightCard";
import { insights } from "@/data/mockInsights";

export default function AIInsights() {
  return (
    <section className="w-full bg-white/[0.01] border border-white/5 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group mt-8">
      
      {/* Dynamic Ambient Background Aura */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-fuchsia-500/[0.03] rounded-full blur-[100px] pointer-events-none group-hover:bg-fuchsia-500/[0.05] transition-colors duration-700" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/[0.02] rounded-full blur-[100px] pointer-events-none group-hover:bg-indigo-500/[0.04] transition-colors duration-700" />
      
      {/* Section Header with Live Computing Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">
            <Cpu className="w-3.5 h-3.5 text-fuchsia-400" />
            Cognitive Intelligence Layer
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            AI Insights
          </h2>
        </div>
        
        {/* Animated Active Pulse Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 text-xs font-medium text-fuchsia-400 self-start sm:self-center">
          <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-ping" />
          <Sparkles className="w-3.5 h-3.5" />
          Neural Engine Live
        </div>
      </div>

      {/* Grid Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
        {insights.map((insight, idx) => (
          <InsightCard
            key={insight.title}
            title={insight.title}
            description={insight.description}
            index={idx} // Passed down to distribute icon variants automatically
          />
        ))}
      </div>
      
    </section>
  );
}