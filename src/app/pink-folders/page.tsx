"use client";

import { useState, useEffect, useRef } from "react";

const folders = [
  { label: "пресеты\nlightroom", angle: -60 },
  { label: "книги", angle: -120 },
  { label: "промты\nmidjourney", angle: -20 },
  { label: "3D элементы", angle: -170 },
  { label: "текстуры", angle: 20 },
  { label: "стикеры", angle: 160 },
  { label: "шрифты", angle: 60 },
  { label: "шаблоны\nfigma", angle: 120 },
];

function PinkFolder({
  size = 80,
  hovered = false,
}: {
  size?: number;
  hovered?: boolean;
}) {
  const scale = hovered ? 1.15 : 1;
  const rotate = hovered ? -5 : 0;
  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 120 90"
      fill="none"
      style={{
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        filter: hovered
          ? "drop-shadow(0 12px 24px rgba(255,150,200,0.4))"
          : "drop-shadow(0 4px 8px rgba(255,150,200,0.2))",
      }}
    >
      {/* Back flap */}
      <path
        d="M4 18C4 12 8 8 14 8H40L48 2H106C112 2 116 6 116 12V72C116 78 112 82 106 82H14C8 82 4 78 4 72V18Z"
        fill="#FFB6D9"
      />
      {/* Front face */}
      <rect x="2" y="28" width="116" height="58" rx="10" fill="#FFC8E4" />
      {/* Tab */}
      <rect x="2" y="28" width="116" height="8" rx="4" fill="#FFD4EC" />
    </svg>
  );
}

export default function PinkFoldersPage() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const radius = 280;

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center overflow-hidden"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Avatar */}
      <div className="absolute top-8 flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden border-2 border-white shadow-sm">
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400" />
        </div>
        <span className="text-sm font-semibold text-gray-800 italic">
          mariinavo.
        </span>
      </div>

      {/* Center area with folders orbiting */}
      <div className="relative w-[700px] h-[700px] flex items-center justify-center">
        {/* Folders */}
        {folders.map((folder, idx) => {
          const angleRad = (folder.angle * Math.PI) / 180;
          const parallaxX = mousePos.x * 15;
          const parallaxY = mousePos.y * 15;
          const x = Math.cos(angleRad) * radius + parallaxX * (idx % 2 === 0 ? 1 : -1);
          const y = Math.sin(angleRad) * radius * 0.7 + parallaxY * (idx % 2 === 0 ? -1 : 1);

          return (
            <div
              key={idx}
              className="absolute flex flex-col items-center gap-2 cursor-pointer"
              style={{
                left: `calc(50% + ${x}px - 50px)`,
                top: `calc(50% + ${y}px - 40px)`,
                transition: "all 0.3s ease-out",
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <PinkFolder size={90} hovered={hoveredIdx === idx} />
              <span
                className="text-[13px] text-gray-600 text-center leading-tight whitespace-pre-line transition-colors duration-300"
                style={{
                  color: hoveredIdx === idx ? "#e91e8c" : "#666",
                  fontWeight: hoveredIdx === idx ? 600 : 400,
                }}
              >
                {folder.label}
              </span>
            </div>
          );
        })}

        {/* Center text */}
        <div
          className="relative z-10 text-center select-none"
          style={{
            transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px)`,
            transition: "transform 0.2s ease-out",
          }}
        >
          <h1
            className="text-[72px] font-black leading-[0.95] tracking-tight text-gray-900"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            WHAT IS
            <br />
            READY?
            <br />
            SET.
            <br />
            CREATE!
          </h1>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-center text-gray-500 text-sm">
        <p>подробнее о платформе</p>
        <p>
          в tg-канале по ссылке{" "}
          <span className="inline-block animate-bounce">↓</span>
        </p>
      </div>
    </div>
  );
}
