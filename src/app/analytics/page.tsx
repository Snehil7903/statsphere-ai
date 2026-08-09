"use client";

import { useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { 
  BarChart3, 
  Filter, 
  Download, 
  SlidersHorizontal,
  PieChart as PieIcon,
  Check,
  ChevronDown
} from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";

const initialAnalyticsData = [
  { category: "Age 18-24", completion: 88, engagement: 92 },
  { category: "Age 25-34", completion: 94, engagement: 85 },
  { category: "Age 35-44", completion: 76, engagement: 78 },
  { category: "Age 45-54", completion: 82, engagement: 88 },
  { category: "Age 55+", completion: 68, engagement: 71 },
];

const segmentData = [
  { name: "Mobile Users", value: 58, color: "#6366f1" },
  { name: "Desktop Users", value: 32, color: "#a855f7" },
  { name: "Tablet Users", value: 10, color: "#ec4899" },
];

export default function AnalyticsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Interactive States
  const [filterMode, setFilterMode] = useState<"all" | "high" | "low">("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // GSAP Entrance Animations
  useGSAP(() => {
    gsap.fromTo(".analytics-node",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" }
    );
  }, { scope: containerRef });

  // 1. Dynamic Cohort Filtering Logic
  const filteredData = useMemo(() => {
    if (filterMode === "high") {
      return initialAnalyticsData.filter((item) => item.completion >= 85);
    }
    if (filterMode === "low") {
      return initialAnalyticsData.filter((item) => item.completion < 85);
    }
    return initialAnalyticsData;
  }, [filterMode]);

  // 2. Export Data Handler (Generates CSV download on the fly)
  const handleExportData = () => {
    const headers = ["Category", "Completion Rate (%)", "Engagement Score"];
    const rows = filteredData.map((row) => [row.category, row.completion, row.engagement]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map((e) => e.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `StatSphere_Cohort_Analytics_${filterMode}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div ref={containerRef} className="space-y-8 p-1 relative z-10">
      
      {/* Header Bar - FIXED: Elevated z-index stacking context (relative z-30) */}
      <div className="analytics-node flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/5 relative z-30">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
            Deep Analytics Studio
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
            Advanced Analytics
          </h1>
          <p className="text-sm text-zinc-500 font-light mt-1">
            Cross-segment demographic performance & survey engagement metrics
          </p>
        </div>

        {/* Interactive Action Controllers */}
        <div className="flex items-center gap-3 relative">
          
          {/* FILTER DROPDOWN MENU */}
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-xs font-medium text-zinc-300 hover:text-white transition-all backdrop-blur-md cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5 text-indigo-400" /> 
              <span>
                {filterMode === "all" ? "All Cohorts" : filterMode === "high" ? "High Completion (>85%)" : "Low Completion (<85%)"}
              </span>
              <ChevronDown className="w-3.5 h-3.5 opacity-50" />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-zinc-950/95 border border-white/10 shadow-2xl p-2 z-50 backdrop-blur-2xl">
                {[
                  { id: "all", label: "All Cohorts" },
                  { id: "high", label: "High Completion (>85%)" },
                  { id: "low", label: "Low Completion (<85%)" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setFilterMode(option.id as any);
                      setIsFilterOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-left hover:bg-white/10 transition-colors text-zinc-300 hover:text-white cursor-pointer"
                  >
                    <span>{option.label}</span>
                    {filterMode === option.id && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* EXPORT DATA BUTTON */}
          <button 
            onClick={handleExportData}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-semibold transition-all shadow-lg shadow-white/10 cursor-pointer active:scale-95"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>
      </div>

      {/* Analytics Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        
        {/* Demographic Breakdown Chart */}
        <div className="analytics-node lg:col-span-2 bg-white/[0.01] border border-white/5 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" /> Demographic Cohorts
              </div>
              <h3 className="text-2xl font-bold text-white">Completion vs Engagement</h3>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="indigoGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#4f46e5" />
                  </linearGradient>
                  <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#9333ea" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                <XAxis dataKey="category" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="completion" name="Completion Rate %" fill="url(#indigoGrad)" radius={[6, 6, 0, 0]} maxBarSize={35} />
                <Bar dataKey="engagement" name="Engagement Score" fill="url(#purpleGrad)" radius={[6, 6, 0, 0]} maxBarSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Segment Donut */}
        <div className="analytics-node bg-white/[0.01] border border-white/5 rounded-3xl p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">
              <PieIcon className="w-3.5 h-3.5 text-fuchsia-400" /> Platform Split
            </div>
            <h3 className="text-2xl font-bold text-white mb-6">Respondent Device</h3>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={segmentData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={5} dataKey="value">
                    {segmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(5,5,5,0.5)" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09090b', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/5">
            {segmentData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-zinc-400 font-medium">{item.name}</span>
                </div>
                <span className="text-white font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}