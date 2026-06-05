import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">

      <h1 className="text-6xl font-bold">
        StatSphere AI
      </h1>

      <p className="text-xl text-gray-500">
        AI Powered Official Statistics Platform
      </p>

      <Link
        href="/dashboard"
        className="px-6 py-3 rounded-xl bg-black text-white"
      >
        Launch Dashboard
      </Link>

    </main>
  );
}