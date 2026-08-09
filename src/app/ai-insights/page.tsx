"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { 
  Sparkles, 
  Cpu, 
  AlertTriangle,
  TrendingUp,
  Send,
  MessageSquareText,
  Loader2,
  Bot
} from "lucide-react";

type InsightItem = {
  id: number | string;
  title: string;
  category: string;
  type: "warning" | "trend" | "insight";
  description: string;
  impact: string;
  time: string;
};

const initialInsights: InsightItem[] = [
  {
    id: 1,
    title: "Unusual Dropout Spike on Question 7",
    category: "Anomaly Detection",
    type: "warning",
    description: "42% of respondents abandon the survey at Question 7 (Income Bracket). Consider making this optional or switching to multi-choice ranges to boost completion by ~14%.",
    impact: "+14% Potential Completion",
    time: "2 hours ago"
  },
  {
    id: 2,
    title: "Mobile User Engagement Surge",
    category: "Demographic Trend",
    type: "trend",
    description: "Respondents completing surveys on iOS mobile devices exhibit a 28% higher response speed with 94% accuracy score compared to desktop equivalents.",
    impact: "High Speed Vector",
    time: "5 hours ago"
  },
  {
    id: 3,
    title: "Optimal Delivery Window Discovered",
    category: "Optimization",
    type: "insight",
    description: "Surveys dispatched on Tuesday between 10:00 AM - 11:30 AM local time achieve 3.2x higher open rates compared to weekend dispatches.",
    impact: "3.2x Open Rate",
    time: "1 day ago"
  }
];

export default function AIInsightsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [insights, setInsights] = useState<InsightItem[]>(initialInsights);
  const [isLoading, setIsLoading] = useState(false);

  useGSAP(() => {
    gsap.fromTo(".ai-node",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" }
    );
  }, { scope: containerRef });

  // Handle AI Query Submission
  const handleAskAI = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim() || isLoading) return;

    setIsLoading(true);

    // Simulate AI synthesis & neural generation response delay
    setTimeout(() => {
      const generatedInsight: InsightItem = {
        id: Date.now(),
        title: `AI Analysis: "${query.slice(0, 35)}..."`,
        category: "Custom Intelligence Query",
        type: "insight",
        description: `Based on current cross-table statistical profiling: Analysis for '${query}' indicates a 88.4% confidence match across demographic clusters. Response variance remains tightly bounded within ±2.4%.`,
        impact: "High Precision Vector",
        time: "Just now"
      };

      setInsights([generatedInsight, ...insights]);
      setQuery("");
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div ref={containerRef} className="space-y-8 p-1 relative z-10">
      
      {/* Header */}
      <div className="ai-node flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">
            <Cpu className="w-3.5 h-3.5 text-fuchsia-400" /> Neural Analytics Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
            Cognitive AI Insights
          </h1>
          <p className="text-sm text-zinc-500 font-light mt-1">
            Real-time pattern recognition, anomaly flags, and predictive survey optimizations
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 text-xs font-medium text-fuchsia-400 self-start sm:self-center">
          <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-ping" />
          Neural Copilot Active
        </div>
      </div>

      {/* AI Prompt Input Bar Form */}
      <form 
        onSubmit={handleAskAI}
        className="ai-node bg-white/[0.01] border border-white/10 rounded-2xl p-4 backdrop-blur-xl shadow-2xl flex items-center gap-3 focus-within:border-fuchsia-500/50 transition-all"
      >
        <MessageSquareText className="w-5 h-5 text-fuchsia-400 ml-2 shrink-0" />
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask StatSphere AI anything about your survey dataset... (e.g., 'What correlates with low completion rates?')" 
          className="bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none w-full"
          disabled={isLoading}
        />
        <button 
          type="submit"
          disabled={!query.trim() || isLoading}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold text-xs flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-40 cursor-pointer shrink-0"
        >
          {isLoading ? (
            <>
              Analyzing <Loader2 className="w-3.5 h-3.5 animate-spin" />
            </>
          ) : (
            <>
              Ask AI <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>

      {/* Insights Stream */}
      <div className="space-y-4">
        {insights.map((item) => (
          <div 
            key={item.id} 
            className="ai-node bg-white/[0.01] border border-white/5 rounded-3xl p-6 backdrop-blur-xl hover:border-white/15 transition-all duration-300 group relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-2xl border ${
                item.type === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                item.type === 'trend' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' :
                'bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-400'
              }`}>
                {item.type === 'warning' ? <AlertTriangle className="w-5 h-5" /> :
                 item.type === 'trend' ? <TrendingUp className="w-5 h-5" /> :
                 item.category === 'Custom Intelligence Query' ? <Bot className="w-5 h-5" /> :
                 <Sparkles className="w-5 h-5" />}
              </div>

              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{item.category}</span>
                  <span className="text-[10px] text-zinc-600">• {item.time}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-fuchsia-300 transition-colors">{item.title}</h3>
                <p className="text-xs text-zinc-400 font-light max-w-3xl leading-relaxed">{item.description}</p>
              </div>
            </div>

            <div className="self-start md:self-center px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white whitespace-nowrap">
              {item.impact}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}