import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r min-h-screen p-6">

      <h2 className="text-2xl font-bold mb-8">
        StatSphere AI
      </h2>

      <nav className="flex flex-col gap-4">

        <Link href="/dashboard">
          Dashboard
        </Link>

        <Link href="/analytics">
          Analytics
        </Link>

        <Link href="/upload">
          Upload
        </Link>

        <Link href="/ai-insights">
          AI Insights
        </Link>

        <Link href="/settings">
          Settings
        </Link>

      </nav>

    </aside>
  );
}