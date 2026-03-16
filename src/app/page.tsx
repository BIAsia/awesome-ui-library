import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Awesome UI Library
        </h1>
        <p className="text-gray-500 mb-12">
          Reverse-engineered UI designs for quick reference and reuse.
        </p>
        <div className="grid gap-6">
          <Link
            href="/agentx"
            className="block p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              AgentX — AI Content Platform
            </h2>
            <p className="text-gray-500 text-sm">
              Landing page with hero section, content grid, and warm color palette.
            </p>
          </Link>
          <Link
            href="/vision-board"
            className="block p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Vision Board — Project Dashboard
            </h2>
            <p className="text-gray-500 text-sm">
              Fit / Build / Launch dashboard with vision cards and clean layout.
            </p>
          </Link>
          <Link
            href="/photo-albums"
            className="block p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Photo Albums — Glassmorphic Folders
            </h2>
            <p className="text-gray-500 text-sm">
              macOS-style photo album folders with stickers and hover animations.
            </p>
          </Link>
          <Link
            href="/pink-folders"
            className="block p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Pink Folders — Creative Resource Hub
            </h2>
            <p className="text-gray-500 text-sm">
              Orbital folder layout with parallax mouse tracking and bold typography.
            </p>
          </Link>
          <Link
            href="/monthly-folders"
            className="block p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Monthly Folders — Half-Year Review
            </h2>
            <p className="text-gray-500 text-sm">
              Colorful pastel folders with peeking items and staggered entrance animations.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
