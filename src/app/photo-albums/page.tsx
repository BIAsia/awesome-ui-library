"use client";

import { useState } from "react";

const albums = [
  {
    name: "Japan 2024",
    count: 83,
    color: "from-rose-100/80 to-orange-50/80",
    stickers: ["🇯🇵", "⛩️"],
    photos: [
      "linear-gradient(135deg, #2d1b69 0%, #ff6b35 50%, #1a0533 100%)",
      "linear-gradient(135deg, #ff4444 30%, #cc0000 100%)",
      "linear-gradient(135deg, #ffb347 0%, #ff6b6b 100%)",
    ],
  },
  {
    name: "Paris 2024",
    count: 62,
    color: "from-blue-100/80 to-indigo-50/80",
    stickers: ["🗼", "🇫🇷"],
    photos: [
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    ],
  },
  {
    name: "Amsterdam 2024",
    count: 68,
    color: "from-amber-100/80 to-green-50/80",
    stickers: ["🌷", "🇳🇱"],
    photos: [
      "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
    ],
  },
  {
    name: "Other photos",
    count: 247,
    color: "from-gray-100/80 to-slate-50/80",
    stickers: ["📷", "🎬"],
    photos: [
      "linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)",
      "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)",
      "linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)",
    ],
  },
];

export default function PhotoAlbumsPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8">
      <div className="grid grid-cols-2 gap-10 max-w-[680px]">
        {albums.map((album, idx) => (
          <div
            key={album.name}
            className="flex flex-col items-center gap-3 cursor-pointer group"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Folder Container */}
            <div
              className="relative w-[280px] h-[200px] transition-transform duration-500 ease-out"
              style={{
                transform: hoveredIndex === idx ? "translateY(-8px) scale(1.03)" : "translateY(0) scale(1)",
              }}
            >
              {/* Photos sticking out */}
              {album.photos.map((bg, pIdx) => {
                const rotations = [-12, 5, -3];
                const offsets = [
                  { top: -20, left: 20 },
                  { top: -25, left: 100 },
                  { top: -15, left: 170 },
                ];
                const hoverOffsets = [
                  { top: -40, left: 10 },
                  { top: -50, left: 95 },
                  { top: -35, left: 175 },
                ];
                const isHovered = hoveredIndex === idx;
                const off = isHovered ? hoverOffsets[pIdx] : offsets[pIdx];

                return (
                  <div
                    key={pIdx}
                    className="absolute rounded-lg shadow-lg"
                    style={{
                      width: 80,
                      height: 60,
                      background: bg,
                      top: off.top,
                      left: off.left,
                      transform: `rotate(${rotations[pIdx]}deg)`,
                      transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      zIndex: pIdx,
                    }}
                  />
                );
              })}

              {/* Folder back */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-[150px] rounded-2xl bg-gradient-to-b ${album.color} backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)]`}
                style={{
                  clipPath: "polygon(0 20%, 30% 20%, 35% 0, 100% 0, 100% 100%, 0 100%)",
                }}
              />

              {/* Folder front */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-[120px] rounded-2xl bg-gradient-to-b ${album.color} backdrop-blur-2xl border border-white/70 shadow-[0_4px_20px_rgba(0,0,0,0.06)]`}
                style={{
                  background: `linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)`,
                }}
              />

              {/* Stickers */}
              <div
                className="absolute bottom-6 left-6 text-3xl transition-transform duration-500"
                style={{
                  transform: hoveredIndex === idx ? "rotate(-10deg) scale(1.2)" : "rotate(0deg) scale(1)",
                }}
              >
                {album.stickers[0]}
              </div>
              <div
                className="absolute bottom-6 right-6 text-3xl transition-transform duration-500"
                style={{
                  transform: hoveredIndex === idx ? "rotate(10deg) scale(1.2)" : "rotate(0deg) scale(1)",
                }}
              >
                {album.stickers[1]}
              </div>
            </div>

            {/* Label */}
            <div className="text-center">
              <p className="text-[15px] font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                {album.name}
              </p>
              <p className="text-[13px] text-gray-400 mt-0.5 group-hover:text-gray-500 transition-colors">
                {album.count} photos
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
