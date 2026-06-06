// components/upload/ColumnAnalysis.tsx
"use client";

import { DatasetProfile } from "@/types/dataset";
import { Binary, CaseSensitive } from "lucide-react";

export default function ColumnAnalysis({ profile }: { profile: DatasetProfile }) {
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
      <h3 className="text-sm font-medium tracking-wider text-zinc-400 uppercase mb-8 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
        Column Feature Topology
      </h3>

      <div className="space-y-8">
        {/* Numeric Attributes */}
        {profile.numericColumns?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
              <Binary className="w-4 h-4 text-indigo-400" />
              Numeric Dimensions ({profile.numericColumns.length})
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.numericColumns.map((col: string, idx: number) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-indigo-500/5 border border-indigo-500/10 text-indigo-300 hover:border-indigo-500/30 hover:bg-indigo-500/10 transition-all cursor-default flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-indigo-400" />
                  {col}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Categorical Attributes */}
        {profile.categoricalColumns?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
              <CaseSensitive className="w-4 h-4 text-fuchsia-400" />
              Categorical Properties ({profile.categoricalColumns.length})
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.categoricalColumns.map((col: string, idx: number) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-fuchsia-500/5 border border-fuchsia-500/10 text-fuchsia-300 hover:border-fuchsia-500/30 hover:bg-fuchsia-500/10 transition-all cursor-default flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-fuchsia-400" />
                  {col}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}