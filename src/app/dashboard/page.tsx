import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MetricCard from "@/components/dashboard/MetricCard";
import SurveyTrendChart from "@/components/dashboard/SurveyTrendChart";
import AIInsights from "@/components/dashboard/AIInsights";

import { metrics } from "@/data/mockMetrics";

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            change={metric.change}
          />
        ))}

      </div>

      <SurveyTrendChart />

      <AIInsights />
    </>
  );
}