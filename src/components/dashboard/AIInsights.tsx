import InsightCard from "@/components/dashboard/InsightCard";
import { insights } from "@/data/mockInsights";

export default function AIInsights() {
  return (
    <section className="border rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-6">
        AI Insights
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight) => (
          <InsightCard
            key={insight.title}
            title={insight.title}
            description={insight.description}
          />
        ))}
      </div>
    </section>
  );
}