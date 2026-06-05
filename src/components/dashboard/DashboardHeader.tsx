export default function DashboardHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-4xl font-bold">
          StatSphere Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          AI-Powered Survey Intelligence Platform
        </p>
      </div>

      <div className="text-right">
        <p className="text-sm text-gray-500">
          Last Updated
        </p>

        <p className="font-medium">
          Today
        </p>
      </div>
    </div>
  );
}