"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MetricCard from "@/components/dashboard/MetricCard";
import SurveyTrendChart from "@/components/dashboard/SurveyTrendChart";
import AIInsights from "@/components/dashboard/AIInsights";

import { metrics } from "@/data/mockMetrics";

export default function DashboardPage() {
  const workspaceRef = useRef<HTMLDivElement>(null);

  // Bulletproof entrance stagger orchestra using direct .to() mapping
  useGSAP(() => {
    // Select all child elements tagged with our target class within this workspace ref scope
    const items = gsap.utils.toArray(".dash-card-node");
    
    if (items.length > 0) {
      gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
        delay: 0.1, // Small structural buffer to let components parse fully before animation starts
        clearProps: "transform" // Safely clears out translate styles so resizing won't warp layout
      });
    }
  }, { scope: workspaceRef });

  return (
    <div ref={workspaceRef} className="space-y-8 p-1 relative z-10">
      
      {/* Header Area Block */}
      <div className="dash-card-node opacity-0 translate-y-6">
        <DashboardHeader />
      </div>

      {/* Top Level Metrics Row Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {metrics.map((metric, idx) => (
          <div 
            key={metric.title} 
            className="dash-card-node opacity-0 translate-y-6" // Hardcoded initial states prevent layout flashing
          >
            <MetricCard
              title={metric.title}
              value={metric.value}
              change={metric.change}
              index={idx}
            />
          </div>
        ))}
      </div>

      {/* Central Trend Window Section */}
      <div className="dash-card-node opacity-0 translate-y-6">
        <SurveyTrendChart />
      </div>

      {/* Deep Cognitive Insights Section */}
      <div className="dash-card-node opacity-0 translate-y-6">
        <AIInsights />
      </div>

    </div>
  );
}