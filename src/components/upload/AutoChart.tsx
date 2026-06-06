"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Label,
} from "recharts";
import { BarChart2, AreaChart as AreaIcon, TrendingUp, ScatterChart as ScatterIcon, PieChart as PieIcon, SlidersHorizontal } from "lucide-react";

type AutoChartProps = {
  data: Record<string, any>[];
  column: string; // Used as the initial fallback default dimension
};

type ChartType = "area" | "bar" | "line" | "scatter" | "pie";

const COLORS = ["#6366f1", "#a855f7", "#ec4899", "#f43f5e", "#e11d48", "#f59e0b", "#10b981", "#06b6d4", "#3b82f6"];

export default function AutoChart({ data, column }: AutoChartProps) {
  // Extract all unique key names available in the dataset rows
  const allColumns = useMemo(() => (data.length > 0 ? Object.keys(data[0]) : []), [data]);

  // States to let users dynamically map custom vector parameters
  const [xAxisKey, setXAxisKey] = useState<string>(column);
  const [yAxisKey, setYAxisKey] = useState<string>(column);
  const [chartType, setChartType] = useState<ChartType>("area");

  // Determine if we are analyzing a single column profile or cross-correlating 2 parameters
  const isUnivariate = xAxisKey === yAxisKey;

  // 1. Process dataset based on mode selection with robust increasing numerical sorting
  const processedData = useMemo(() => {
    if (data.length === 0) return [];

    // Mode A: Single parameter distribution mapping (Histogram/Distribution logic)
    if (isUnivariate) {
      const values = data
        .map((row) => Number(row[xAxisKey]))
        .filter((val) => !isNaN(val));

      if (values.length === 0) return [];

      const min = Math.min(...values);
      const max = Math.max(...values);
      const range = max - min;
      
      const binCount = Math.min(Math.max(Math.ceil(Math.log2(values.length) + 1), 7), 12);
      const binWidth = Math.ceil(range / binCount) || 1;

      const bins = Array.from({ length: binCount }, (_, i) => {
        const start = min + i * binWidth;
        const end = start + binWidth - 1;
        return {
          displayLabel: start === end ? `${start}` : `${start}-${end}`,
          minBound: start,
          maxBound: end,
          "Frequency Count": 0,
        };
      });

      values.forEach((val) => {
        const matchedBin = bins.find((b) => val >= b.minBound && val <= b.maxBound);
        if (matchedBin) {
          matchedBin["Frequency Count"]++;
        } else if (val >= bins[bins.length - 1].maxBound) {
          bins[bins.length - 1]["Frequency Count"]++;
        }
      });

      return bins.filter(b => b["Frequency Count"] > 0 || min === 0);
    }

    // Mode B: Bivariate direct key parameter correlation mapping with absolute ascending sequence order
    const cleanMapped = data
      .map((row) => ({
        xNum: Number(row[xAxisKey]),
        yNum: Number(row[yAxisKey]),
      }))
      // Filter rows containing unparseable empty strings or missing numbers
      .filter((item) => !isNaN(item.xNum) && !isNaN(item.yNum));

    // Aggregate duplicate X values via standard Map (e.g. Average out Y results for matching X instances)
    const aggregatedMap = new Map<number, { sum: number; count: number }>();
    cleanMapped.forEach((item) => {
      const existing = aggregatedMap.get(item.xNum);
      if (existing) {
        existing.sum += item.yNum;
        existing.count += 1;
      } else {
        aggregatedMap.set(item.xNum, { sum: item.yNum, count: 1 });
      }
    });

    // Reconstruct structural map items into clean array layouts, sorted sequentially
    return Array.from(aggregatedMap.entries())
      .map(([xVal, metrics]) => ({
        displayLabel: String(xVal),
        xValue: xVal,
        yValue: Number((metrics.sum / metrics.count).toFixed(3)), // Average value rounded elegantly
      }))
      // CRITICAL FIX: Forces horizontal parameters to sort cleanly in ascending numerical order
      .sort((a, b) => a.xValue - b.xValue)
      .slice(0, 100); // Caps layout rendering pipeline bounds for optimal interface frame response
  }, [data, xAxisKey, yAxisKey, isUnivariate]);

  // Compute the exact chart value mapping target key dynamically
  const activeMetricKey = isUnivariate ? "Frequency Count" : "yValue";

  // Premium Custom Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-950/95 border border-white/10 backdrop-blur-xl px-4 py-3 rounded-xl shadow-2xl z-50">
          <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold mb-1">
            {isUnivariate ? `Interval Range: ${label}` : `${xAxisKey}: ${label}`}
          </p>
          <p className="text-sm font-medium text-zinc-200">
            {isUnivariate ? "Total Rows: " : `${yAxisKey}: `}
            <span className="text-white font-bold text-indigo-400">
              {payload[0].value.toLocaleString()}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white/[0.01] border border-white/5 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
      
      {/* Dynamic Header Controls */}
      <div className="flex flex-col gap-6 mb-10 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
              Custom Analytics Studio
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white capitalize">
              {isUnivariate 
                ? `${xAxisKey.replace(/([A-Z])/g, " $1").trim()} Distribution`
                : `${xAxisKey.replace(/([A-Z])/g, " $1")} vs ${yAxisKey.replace(/([A-Z])/g, " $1")}`
              }
            </h3>
          </div>

          {/* Type Navigation Tab Pill */}
          <div className="inline-flex flex-wrap p-1 bg-white/5 border border-white/10 rounded-2xl self-start">
            {([
              { id: "area", label: "Area", icon: AreaIcon },
              { id: "bar", label: "Bar", icon: BarChart2 },
              { id: "line", label: "Line", icon: TrendingUp },
              { id: "scatter", label: "Scatter", icon: ScatterIcon },
              { id: "pie", label: "Pie Map", icon: PieIcon },
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setChartType(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                  chartType === tab.id
                    ? "bg-white text-black shadow-xl font-semibold"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* AXIS AXLE CONTROLLERS: Custom Parameter Dropdown Pickers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">X-Axis Parameter</label>
            <select
              value={xAxisKey}
              onChange={(e) => setXAxisKey(e.target.value)}
              className="w-full bg-zinc-900/80 border border-white/10 text-zinc-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500/50 cursor-pointer transition-colors backdrop-blur-md appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
            >
              {allColumns.map((col) => (
                <option key={col} value={col} className="bg-zinc-950 text-white">{col}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Y-Axis Parameter (Metric Value)</label>
            <select
              value={yAxisKey}
              onChange={(e) => setYAxisKey(e.target.value)}
              className="w-full bg-zinc-900/80 border border-white/10 text-zinc-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500/50 cursor-pointer transition-colors backdrop-blur-md appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
            >
              <option value={xAxisKey} className="bg-zinc-950 text-indigo-400 font-medium">✨ Automatically Calculate Distribution Density</option>
              {allColumns.map((col) => (
                col !== xAxisKey && <option key={col} value={col} className="bg-zinc-950 text-white">{col}</option>
              ))}
            </select>
          </div>
        </div>

      </div>

      {/* Primary Canvas Container Window */}
      <div className="h-96 w-full relative z-10 pr-4">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "area" ? (
            <AreaChart data={processedData} margin={{ top: 10, right: 10, left: 20, bottom: 25 }}>
              <defs>
                <linearGradient id="areaGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
              <XAxis dataKey={isUnivariate ? "displayLabel" : "xValue"} stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} dy={10}>
                <Label value={xAxisKey} offset={-15} position="insideBottom" fill="rgba(255,255,255,0.4)" fontSize={12} fontWeight={500} />
              </XAxis>
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} dx={-5}>
                <Label value={isUnivariate ? "Frequency (Row Count)" : yAxisKey} angle={-90} position="insideLeft" offset={-15} fill="rgba(255,255,255,0.4)" fontSize={12} fontWeight={500} />
              </YAxis>
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey={activeMetricKey} stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#areaGlow)" />
            </AreaChart>
          ) : chartType === "bar" ? (
            <BarChart data={processedData} margin={{ top: 10, right: 10, left: 20, bottom: 25 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
              <XAxis dataKey={isUnivariate ? "displayLabel" : "xValue"} stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} dy={10}>
                <Label value={xAxisKey} offset={-15} position="insideBottom" fill="rgba(255,255,255,0.4)" fontSize={12} fontWeight={500} />
              </XAxis>
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} dx={-5}>
                <Label value={isUnivariate ? "Frequency (Row Count)" : yAxisKey} angle={-90} position="insideLeft" offset={-15} fill="rgba(255,255,255,0.4)" fontSize={12} fontWeight={500} />
              </YAxis>
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey={activeMetricKey} fill="url(#barGradient)" radius={[6, 6, 0, 0]} maxBarSize={45} />
            </BarChart>
          ) : chartType === "line" ? (
            <LineChart data={processedData} margin={{ top: 10, right: 10, left: 20, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
              <XAxis dataKey={isUnivariate ? "displayLabel" : "xValue"} stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} dy={10}>
                <Label value={xAxisKey} offset={-15} position="insideBottom" fill="rgba(255,255,255,0.4)" fontSize={12} fontWeight={500} />
              </XAxis>
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} dx={-5}>
                <Label value={isUnivariate ? "Frequency (Row Count)" : yAxisKey} angle={-90} position="insideLeft" offset={-15} fill="rgba(255,255,255,0.4)" fontSize={12} fontWeight={500} />
              </YAxis>
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey={activeMetricKey} stroke="#f43f5e" strokeWidth={3} dot={{ fill: '#f43f5e', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#fff', stroke: '#f43f5e' }} />
            </LineChart>
          ) : chartType === "scatter" ? (
            <ScatterChart margin={{ top: 10, right: 20, left: 20, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
              <XAxis type="number" dataKey="xValue" name={xAxisKey} stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} dy={10}>
                <Label value={xAxisKey} offset={-15} position="insideBottom" fill="rgba(255,255,255,0.4)" fontSize={12} fontWeight={500} />
              </XAxis>
              <YAxis type="number" dataKey="yValue" name={yAxisKey} stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} dx={-5}>
                <Label value={yAxisKey} angle={-90} position="insideLeft" offset={-15} fill="rgba(255,255,255,0.4)" fontSize={12} fontWeight={500} />
              </YAxis>
              <Tooltip content={<CustomTooltip />} />
              <Scatter name={xAxisKey} data={processedData} fill="#06b6d4" shape="circle" />
            </ScatterChart>
          ) : (
            <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 20 }}>
              <Pie
                data={processedData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={4}
                dataKey={activeMetricKey}
                nameKey="displayLabel"
              >
                {processedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(5,5,5,0.5)" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}