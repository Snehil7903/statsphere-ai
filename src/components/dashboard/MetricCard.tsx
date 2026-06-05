type MetricCardProps = {
  title: string;
  value: string;
  change: string;
};

export default function MetricCard({
  title,
  value,
  change,
}: MetricCardProps) {
  return (
    <div className="rounded-2xl border p-6 hover:border-blue-500 transition-all">

      <h3 className="text-gray-500">
        {title}
      </h3>

      <p className="text-3xl font-bold mt-3">
        {value}
      </p>

      <p className="mt-3 text-sm text-green-500 font-medium">
        {change} from last month
      </p>

    </div>
  );
}