import { DatasetProfile } from "@/types/dataset";

type RecommendationSectionProps = {
  profile: DatasetProfile;
};

export default function RecommendationSection({
  profile,
}: RecommendationSectionProps) {
  return (
    <div className="mt-8 border rounded-xl p-6">

      <h3 className="text-xl font-semibold mb-4">
        Recommended Analytics
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {profile.recommendedCharts.map(
          (chart) => (
            <div
              key={chart}
              className="border rounded-lg p-4"
            >
              📊 {chart}
            </div>
          )
        )}

      </div>

    </div>
  );
}