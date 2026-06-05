import MetricCard from "@/components/dashboard/MetricCard";
import SurveyTrendChart from "@/components/dashboard/SurveyTrendChart";
import AIInsights from "@/components/dashboard/AIInsights";


export default function DashboardPage() {
  return (
    <main className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        StatSphere Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-4">

        <MetricCard
          title="Total Surveys"
          value="12,450"
        />

        <MetricCard
          title="Responses"
          value="11,230"
        />

        <MetricCard
          title="Pending"
          value="1,220"
        />

        <MetricCard
          title="Completion Rate"
          value="90%"
        />

      </div>

      <SurveyTrendChart />

      <AIInsights />

    </main>
  );
}