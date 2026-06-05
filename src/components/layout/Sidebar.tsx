import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r p-6">

      <h2 className="text-2xl font-bold mb-8">
        StatSphere AI
      </h2>

      <nav className="flex flex-col gap-4">

        <Link
          href="/dashboard"
          className="hover:text-blue-500 transition-colors"
        >
          Dashboard
        </Link>

        <Link
          href="/analytics"
          className="hover:text-blue-500 transition-colors"
        >
          Analytics
        </Link>

        <Link
          href="/upload"
          className="hover:text-blue-500 transition-colors"
        >
          Upload
        </Link>

        <Link
          href="/ai-insights"
          className="hover:text-blue-500 transition-colors"
        >
          AI Insights
        </Link>

        <Link
          href="/settings"
          className="hover:text-blue-500 transition-colors"
        >
          Settings
        </Link>

      </nav>

    </aside>
  );
}