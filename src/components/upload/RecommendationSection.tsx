// components/upload/RecommendationSection.tsx
"use client";

import { DatasetProfile } from "@/types/dataset";
import { BarChart3, PieChart, TrendingUp, ScatterChart, Network, ArrowUpRight } from "lucide-react";

export default function RecommendationSection({ profile }: { profile: DatasetProfile }) {
  // Map analytics options to rich iconography
  const recommendations = [
    { name: "Histogram", desc: "Analyze frequency distributions", icon: BarChart3 },
    { name: "Distribution Analysis", desc: "Density and variance check", icon: PieChart },
    { name: "Box Plot", desc: "Identify statistical outliers", icon: TrendingUp },
    { name: "Scatter Plot", desc: "Correlate feature dimensions", icon: ScatterChart },
    { name: "Correlation Analysis", desc: "Feature interaction mapping", icon: Network },
  ];

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 backdrop-blur-xl h-full shadow-2xl">
      <h3 className="text-sm font-medium tracking-wider text-zinc-400 uppercase mb-6 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Recommended Analytics
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec, i) => (
          <button
            key={i}
            className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-indigo-500/30 hover:bg-indigo-500/[0.03] text-left transition-all duration-300 group relative overflow-hidden"
          >
            <div className="flex items-center gap-4 relative z-10">
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-zinc-400 group-hover:text-indigo-400 group-hover:border-indigo-500/20 transition-all">
                <rec.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors">{rec.name}</h4>
                <p className="text-xs text-zinc-500 mt-0.5">{rec.desc}</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all relative z-10" />
            
            {/* Subtle glow hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/[0.02] to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        ))}
      </div>
    </div>
  );
}