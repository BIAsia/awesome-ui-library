"use client";

import { Image, Video, Presentation, Copy, RefreshCw, ChevronDown, Sparkles, Zap, TrendingUp } from "lucide-react";

const navLinks = ["Home", "Use Cases", "Prompts", "Agents", "Integrations", "Blog"];

const contentCards = [
  { title: "Logo design", color: "bg-orange-100", accent: "bg-orange-400" },
  { title: "Illustration", color: "bg-red-50", accent: "bg-red-400" },
  { title: "Announcement", color: "bg-green-50", accent: "bg-green-600" },
  { title: "Image generation", color: "bg-amber-100", accent: "bg-amber-500" },
  { title: "Video generation", color: "bg-rose-50", accent: "bg-rose-400" },
  { title: "Text to speech", color: "bg-amber-50", accent: "bg-amber-600" },
  { title: "Task management", color: "bg-pink-50", accent: "bg-pink-300" },
];

export default function AgentXPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M4 14L14 4L24 14L14 24L4 14Z" fill="black" />
            <path d="M8 14L14 8L20 14" stroke="white" strokeWidth="1.5" />
          </svg>
        </div>
        <nav className="hidden md:flex items-center gap-1 bg-white rounded-full px-2 py-1.5 shadow-sm border border-gray-100">
          {navLinks.map((link) => (
            <button
              key={link}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                link === "Home"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {link}
            </button>
          ))}
        </nav>
        <button className="bg-black text-white text-sm px-5 py-2 rounded-full hover:bg-gray-800 transition-colors">
          Get Started
        </button>
      </header>

      {/* Hero Section */}
      <main className="max-w-[1400px] mx-auto px-8 pt-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div className="pt-8">
            {/* Powered by badges */}
            <div className="flex items-center gap-2 mb-8">
              <span className="text-xs text-gray-400 font-medium tracking-wide">Powered by</span>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Sparkles size={10} className="text-white" />
                </div>
                <div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center">
                  <Zap size={10} className="text-white" />
                </div>
                <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                  <TrendingUp size={10} className="text-white" />
                </div>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-[3.5rem] leading-[1.1] font-bold text-gray-900 mb-10 tracking-tight">
              Create engaging
              <br />
              content quickly &
              <br />
              expand rapidly.
            </h1>

            {/* Input Field */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
              <input
                type="text"
                placeholder="Assign a task or ask anything..."
                className="w-full text-sm text-gray-400 outline-none mb-4 px-1"
              />
              <div className="flex items-center gap-2 flex-wrap">
                <ActionButton icon={<Sparkles size={14} />} label="AI" />
                <ActionButton icon={<Image size={14} />} label="Image" />
                <ActionButton icon={<Video size={14} />} label="Video" />
                <ActionButton icon={<Presentation size={14} />} label="Slides" />
                <ActionButton icon={<Copy size={14} />} label="Clone" />
                <ActionButton icon={<RefreshCw size={14} />} label="Sync" />
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-400 mt-6 leading-relaxed max-w-md">
              With AgentX speeds up your business onboarding, takes care of the boring
              manual tasks, and helps boost your revenue.
            </p>

            {/* Stats */}
            <div className="flex gap-12 mt-8">
              <StatItem value="10.6x" label="Faster onboarding" />
              <StatItem value="37%" label="Cost reduction" />
              <StatItem value="4.8x" label="Revenue efficiency" />
            </div>
          </div>

          {/* Right Column - Content Grid */}
          <div className="pt-4">
            <div className="grid grid-cols-3 gap-3">
              {/* Row 1 */}
              <ContentCard title="Logo design" className="bg-orange-50">
                <div className="flex gap-1.5 mt-auto">
                  <div className="w-8 h-8 rounded-lg bg-orange-300" />
                  <div className="w-8 h-8 rounded-lg bg-orange-400" />
                  <div className="w-8 h-8 rounded-lg bg-amber-300" />
                </div>
              </ContentCard>
              <ContentCard title="Illustration" className="bg-red-50">
                <div className="mt-auto rounded-lg overflow-hidden h-16 bg-gradient-to-br from-red-200 via-orange-200 to-amber-200" />
              </ContentCard>
              <ContentCard title="Announcement" className="bg-green-50">
                <div className="mt-auto flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-600" />
                  <div className="space-y-1">
                    <div className="h-1.5 w-16 bg-green-200 rounded" />
                    <div className="h-1.5 w-12 bg-green-200 rounded" />
                  </div>
                </div>
              </ContentCard>

              {/* Row 2 */}
              <ContentCard title="Image generation" className="bg-amber-50">
                <div className="mt-auto rounded-lg overflow-hidden h-16">
                  <div className="w-full h-full bg-gradient-to-tr from-amber-300 via-orange-300 to-red-300 rounded-lg" />
                </div>
              </ContentCard>
              <ContentCard title="Video generation" className="bg-rose-50" span2>
                <div className="mt-auto flex gap-2">
                  <div className="flex-1 h-20 rounded-lg bg-gradient-to-br from-amber-200 to-orange-300" />
                  <div className="flex-1 h-20 rounded-lg bg-gradient-to-br from-rose-200 to-red-300" />
                </div>
              </ContentCard>

              {/* Row 3 */}
              <ContentCard title="Text to speech" className="bg-amber-50">
                <div className="mt-auto flex items-end gap-0.5 h-10">
                  {[3, 5, 2, 6, 4, 7, 3, 5, 2, 6, 4, 3, 5, 7, 2, 4].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-amber-400 rounded-full"
                      style={{ height: `${h * 4}px` }}
                    />
                  ))}
                </div>
              </ContentCard>
              <ContentCard title="Task management" className="bg-pink-50">
                <div className="mt-auto space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded border-2 border-pink-300" />
                    <div className="h-1.5 flex-1 bg-pink-200 rounded" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded border-2 border-pink-300 bg-pink-300" />
                    <div className="h-1.5 flex-1 bg-pink-200 rounded" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded border-2 border-pink-300" />
                    <div className="h-1.5 w-2/3 bg-pink-200 rounded" />
                  </div>
                </div>
              </ContentCard>
              <div /> {/* Empty cell for alignment */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ActionButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-500 hover:bg-gray-50 transition-colors">
      {icon}
      {label}
    </button>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-400 mt-0.5">{label}</div>
    </div>
  );
}

function ContentCard({
  title,
  className,
  children,
  span2,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
  span2?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-4 flex flex-col min-h-[140px] ${className} ${
        span2 ? "col-span-2" : ""
      }`}
    >
      <span className="text-[11px] font-medium text-gray-500 mb-2">{title}</span>
      {children}
    </div>
  );
}
