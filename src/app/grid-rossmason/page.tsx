'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const RossMasonPage = () => {
  const [viewMode, setViewMode] = useState<'carousel' | 'list'>('carousel');

  const clients = [
    {
      number: '02',
      name: 'Stella Artois',
      label: 'BRAND CAMPAIGN',
      gradient: 'from-amber-600 to-amber-800',
    },
    {
      number: '03',
      name: 'Logitech Quake',
      label: 'GAMING PRODUCT',
      gradient: 'from-gray-800 to-gray-900',
    },
    {
      number: '04',
      name: 'Louis Poulsen',
      label: 'LIGHTING DESIGN',
      gradient: 'from-yellow-300 to-orange-400',
    },
    {
      number: '05',
      name: 'Glossier',
      label: 'BEAUTY BRAND',
      gradient: 'from-pink-300 to-pink-500',
    },
    {
      number: '06',
      name: 'SONA',
      label: 'AUDIO PRODUCT',
      gradient: 'from-blue-600 to-purple-600',
    },
    {
      number: '07',
      name: 'SESE Botanics',
      label: 'SKINCARE BRAND',
      gradient: 'from-green-400 to-emerald-600',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden border-4 border-black">
      {/* Border frame effect */}
      <div className="fixed inset-0 pointer-events-none border-8 border-black" style={{ top: '8px', left: '8px', right: '8px', bottom: '8px' }} />

      {/* Top Navigation Bar */}
      <div className="relative z-10 border-b-2 border-black px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Left: Tagline */}
          <div className="text-sm font-medium tracking-tight">
            3D, Motion, Art direction
          </div>

          {/* Center: Navigation */}
          <div className="flex gap-8 text-sm font-medium">
            <button className="hover:underline transition">Index</button>
            <button className="hover:underline transition">Patreon</button>
            <button className="hover:underline transition">Store</button>
            <button className="hover:underline transition">About</button>
            <button className="hover:underline transition">Lab</button>
          </div>

          {/* Right: CTA */}
          <div>
            <button className="text-sm font-medium underline underline-offset-2 hover:opacity-75 transition">
              Send me a message
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col h-[calc(100vh-200px)]">
        {/* Client Grid Section */}
        <div className="flex-1 border-b-2 border-black overflow-hidden">
          <div className="flex items-center gap-12 px-8 py-12 h-full overflow-x-auto overflow-y-hidden scroll-smooth">
            {clients.map((client, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-4 flex-shrink-0"
                style={{ width: '280px' }}
              >
                {/* Client Number and Name */}
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold tabular-nums">{client.number}</span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base font-semibold tracking-tight">
                      {client.name}
                    </h3>
                    <p className="text-xs font-medium tracking-widest opacity-60">
                      {client.label}
                    </p>
                  </div>
                </div>

                {/* Thumbnail with Gradient */}
                <div
                  className="w-full aspect-square rounded-sm shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${getGradientColors(client.gradient)[0]}, ${getGradientColors(client.gradient)[1]})`,
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center opacity-20">
                    <div className="text-center">
                      <div className="text-4xl font-bold">{client.number}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Typography and Controls */}
        <div className="border-b-2 border-black">
          <div className="px-8 py-12 flex items-end justify-between gap-8 min-h-32">
            {/* Left: View Mode Toggle */}
            <div className="flex gap-4 text-sm font-medium">
              <button
                onClick={() => setViewMode('carousel')}
                className={`pb-1 ${
                  viewMode === 'carousel'
                    ? 'border-b-2 border-black'
                    : 'opacity-50 hover:opacity-75'
                } transition`}
              >
                Carousel
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`pb-1 ${
                  viewMode === 'list'
                    ? 'border-b-2 border-black'
                    : 'opacity-50 hover:opacity-75'
                } transition`}
              >
                List
              </button>
            </div>

            {/* Center: Massive Typography */}
            <div className="flex-1 flex items-baseline justify-center gap-1">
              <div
                className="font-black italic tracking-tighter"
                style={{
                  fontSize: 'clamp(3rem, 12vw, 14rem)',
                  lineHeight: '1',
                  fontStyle: 'normal',
                  fontWeight: 900,
                }}
              >
                ROSS
              </div>
              <div
                className="font-light italic tracking-tight"
                style={{
                  fontSize: 'clamp(3rem, 12vw, 14rem)',
                  lineHeight: '1',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  marginBottom: '0.05em',
                }}
              >
                mason
              </div>
            </div>

            {/* Right: Time and Location */}
            <div className="text-right text-sm font-medium">
              <div className="text-xs opacity-60 mb-2">LONDON, UK</div>
              <div className="text-lg font-bold tabular-nums">14:32</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer: Subtle background */}
      <div className="relative z-10 border-t-2 border-black px-8 py-4 bg-black bg-opacity-2">
        <div className="flex justify-between items-center text-xs opacity-50">
          <span>© 2024 Ross Mason</span>
          <span>Design & Motion</span>
        </div>
      </div>
    </div>
  );
};

function getGradientColors(
  gradient: string
): [string, string] {
  const gradientMap: Record<string, [string, string]> = {
    'from-amber-600 to-amber-800': ['#b45309', '#78350f'],
    'from-gray-800 to-gray-900': ['#1f2937', '#111827'],
    'from-yellow-300 to-orange-400': ['#fcd34d', '#fb923c'],
    'from-pink-300 to-pink-500': ['#f472b6', '#ec4899'],
    'from-blue-600 to-purple-600': ['#2563eb', '#7c3aed'],
    'from-green-400 to-emerald-600': ['#4ade80', '#059669'],
  };
  return gradientMap[gradient] || ['#f3f4f6', '#e5e7eb'];
}

export default RossMasonPage;
