type InsightCardProps = {
  title: string;
  description: string;
};

export default function InsightCard({
  title,
  description,
}: InsightCardProps) {
  return (
    <div className="rounded-xl border p-4">
      <h3 className="font-semibold mb-2">
        {title}
      </h3>

      <p className="text-sm text-gray-400">
        {description}
      </p>
    </div>
  );
}