"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { TrendingUp, CalendarDays } from "lucide-react";

// Mock collection timeline data metrics
const trendData = [
  { month: "Jan", values: 1200 },
  { month: "Feb", values: 1900 },
  { month: "Mar", values: 2500 },
  { month: "Apr", values: 3100 },
  { month: "May", values: 4200 },
  { month: "Jun", values: 5300 },
];

export default function SurveyTrendChart() {
  
  // Custom tooltips matching our glassmorphism theme perfectly
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-950/95 border border-white/10 backdrop-blur-xl px-4 py-3 rounded-xl shadow-2xl z-50">
          <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-0.5">Collection Yield</p>
          <p className="text-sm font-bold text-indigo-400">
            Responses: <span className="text-white font-black">{payload[0].value.toLocaleString()}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white/[0.01] border border-white/5 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
      
      {/* Visual Title Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
            Performance Tracking
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-white">
            Survey Collection Trend
          </h3>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-400 font-medium self-start sm:self-center">
          <CalendarDays className="w-3.5 h-3.5 text-zinc-500" />
          H1 Timeline Profile
        </div>
      </div>

      {/* Main Graph Canvas Wrapper Window */}
      <div className="h-80 w-full relative z-10 pr-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
            <defs>
              {/* Vibrant neon stroke shadow gradient glow overlay field */}
              <linearGradient id="trendGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
            <Area 
              type="monotone" 
              dataKey="values" 
              stroke="#3b82f6" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#trendGlow)"
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#fff', stroke: '#3b82f6' }} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}