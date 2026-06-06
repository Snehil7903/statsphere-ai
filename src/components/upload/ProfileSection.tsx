// components/upload/ProfileSection.tsx
"use client";

import { DatasetProfile } from "@/types/dataset";
import { Layers, Columns, AlertCircle, Copy } from "lucide-react";

export default function ProfileSection({ profile }: { profile: DatasetProfile }) {
  const metrics = [
    { label: "Total Rows", value: profile.rowCount, icon: Layers, color: "text-indigo-400 bg-indigo-500/10" },
    { label: "Columns", value: profile.columnCount, icon: Columns, color: "text-blue-400 bg-blue-500/10" },
    { label: "Missing Values", value: profile.missingValues || 0, icon: AlertCircle, color: "text-amber-400 bg-amber-500/10" },
    { label: "Duplicate Rows", value: profile.duplicateRows || 0, icon: Copy, color: "text-rose-400 bg-rose-500/10" },
  ];

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 backdrop-blur-xl h-full shadow-2xl">
      <h3 className="text-sm font-medium tracking-wider text-zinc-400 uppercase mb-6 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
        Dataset Profile
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col justify-between hover:border-white/15 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-zinc-500 font-medium group-hover:text-zinc-400 transition-colors">{m.label}</span>
              <div className={`p-2 rounded-xl ${m.color}`}>
                <m.icon className="w-4 h-4" />
              </div>
            </div>
            <span className="text-3xl font-bold tracking-tight text-white bg-clip-text">
              {m.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}