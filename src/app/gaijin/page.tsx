"use client";

import { useState, useRef, useEffect } from "react";
import { usePhysicsDrag } from "@/hooks/usePhysicsDrag";

interface MemorabiliaPiece {
  id: string;
  location: string;
  pageNumber: number;
  color: string;
  pattern: string;
  initialX: number;
  initialY: number;
  width: number;
  height: number;
}

const memorabilia: MemorabiliaPiece[] = [
  {
    id: "okinawa",
    location: "OKINAWA",
    pageNumber: 12,
    color: "from-yellow-300 to-yellow-400",
    pattern: "diagonal-lines",
    initialX: 100,
    initialY: 80,
    width: 90,
    height: 120,
  },
  {
    id: "kyushu",
    location: "KYUSHU",
    pageNumber: 3,
    color: "from-amber-100 to-amber-200",
    pattern: "dots",
    initialX: 350,
    initialY: 320,
    width: 100,
    height: 70,
  },
  {
    id: "osaka",
    location: "OSAKA",
    pageNumber: 18,
    color: "from-pink-300 to-pink-400",
    pattern: "none",
    initialX: 600,
    initialY: 120,
    width: 75,
    height: 95,
  },
  {
    id: "mtfuji",
    location: "MT.FUJI",
    pageNumber: 6,
    color: "from-yellow-100 to-orange-200",
    pattern: "wavy",
    initialX: 200,
    initialY: 380,
    width: 110,
    height: 85,
  },
  {
    id: "naoshima",
    location: "NAOSHIMA",
    pageNumber: 22,
    color: "from-blue-400 to-blue-500",
    pattern: "text",
    initialX: 550,
    initialY: 280,
    width: 95,
    height: 110,
  },
  {
    id: "tokyo",
    location: "TOKYO",
    pageNumber: 16,
    color: "from-red-400 to-red-500",
    pattern: "dots",
    initialX: 450,
    initialY: 80,
    width: 80,
    height: 80,
  },
  {
    id: "yakushima",
    location: "YAKUSHIMA",
    pageNumber: 41,
    color: "from-green-400 to-green-500",
    pattern: "stamp",
    initialX: 280,
    initialY: 240,
    width: 70,
    height: 75,
  },
  {
    id: "kyoto",
    location: "KYOTO",
    pageNumber: 16,
    color: "from-pink-200 to-pink-300",
    pattern: "none",
    initialX: 650,
    initialY: 380,
    width: 85,
    height: 130,
  },
];

function MemorabiliaPiece({
  piece,
}: {
  piece: MemorabiliaPiece;
}) {
  const { x, y, isDragging, zIndex, rotation, handlers } = usePhysicsDrag(
    piece.initialX,
    piece.initialY
  );

  const getBackgroundStyle = () => {
    const base = `bg-gradient-to-br ${piece.color}`;
    switch (piece.pattern) {
      case "diagonal-lines":
        return `${base} relative`;
      case "dots":
        return `${base} relative`;
      case "wavy":
        return `${base} relative`;
      case "stamp":
        return `${base} relative`;
      default:
        return base;
    }
  };

  const PatternOverlay = () => {
    switch (piece.pattern) {
      case "diagonal-lines":
        return (
          <div className="absolute inset-0 opacity-20">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-black"
                style={{
                  width: "141%",
                  top: `${i * 15}px`,
                  left: "-20%",
                  transform: "rotate(-45deg)",
                  transformOrigin: "center",
                }}
              />
            ))}
          </div>
        );
      case "dots":
        return (
          <div className="absolute inset-0 opacity-30">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-black"
                style={{
                  width: `${Math.random() * 6 + 3}px`,
                  height: `${Math.random() * 6 + 3}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        );
      case "wavy":
        return (
          <div className="absolute inset-0 opacity-25">
            {[...Array(4)].map((_, i) => (
              <svg
                key={i}
                className="absolute w-full h-full"
                viewBox="0 0 100 100"
              >
                <path
                  d={`M 0 ${30 + i * 15} Q 25 ${25 + i * 15} 50 ${30 + i * 15} T 100 ${30 + i * 15}`}
                  fill="none"
                  stroke="black"
                  strokeWidth="1"
                />
              </svg>
            ))}
          </div>
        );
      case "stamp":
        return (
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <div className="border-4 border-black rounded-md px-2 py-1 font-bold text-xs rotate-12">
              56
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      {...handlers}
      className={`absolute transition-all duration-100 ${
        isDragging ? "shadow-2xl cursor-grabbing" : "cursor-grab shadow-lg"
      }`}
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
        zIndex,
        width: `${piece.width}px`,
        height: `${piece.height}px`,
      }}
    >
      <div
        className={`w-full h-full rounded-lg ${getBackgroundStyle()} overflow-hidden border-2 border-black/20`}
      >
        <PatternOverlay />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
          <div className="text-xs font-bold text-black/70">{piece.location}</div>
          <div className="text-2xl font-bold text-black/40 leading-none mt-1">
            {piece.pageNumber}
          </div>
        </div>
      </div>
    </div>
  );
}

function GaijinTitle() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePos({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const parallaxX = (mousePos.x - 0.5) * 20;
  const parallaxY = (mousePos.y - 0.5) * 20;

  return (
    <div
      ref={titleRef}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      <div
        style={{
          transform: `translate(${parallaxX}px, ${parallaxY}px)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        <h1 className="text-9xl md:text-[320px] font-black text-black leading-none whitespace-nowrap select-none">
          gaijin
        </h1>
      </div>
    </div>
  );
}

export default function GaijinPage() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Black border and outer frame */}
      <div className="w-full max-w-6xl aspect-video bg-black">
        {/* White double-page spread */}
        <div className="w-full h-full bg-white relative shadow-2xl flex">
          {/* Left page */}
          <div className="flex-1 relative border-r-4 border-gray-300">
            {/* Spine shadow */}
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-r from-transparent to-black/10" />
          </div>

          {/* Right page */}
          <div className="flex-1 relative flex flex-col">
            {/* Spine shadow */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-r from-black/10 to-transparent" />
          </div>

          {/* Gaijin title - behind everything */}
          <GaijinTitle />

          {/* Memorabilia items - in front of title */}
          <div className="absolute inset-0 pointer-events-none">
            {memorabilia.map((piece) => (
              <div key={piece.id} className="pointer-events-auto">
                <MemorabiliaPiece piece={piece} />
              </div>
            ))}
          </div>

          {/* Explanatory text - bottom right */}
          <div className="absolute bottom-8 right-8 max-w-xs bg-white/95 backdrop-blur-sm p-5 rounded-lg border border-gray-200 z-20">
            <p className="text-xs leading-relaxed text-gray-700">
              <span className="font-bold">Gaijin</span> (外人) literally means
              "outside person" in Japanese. It describes foreigners or those
              perceived as outsiders. This double-page spread celebrates the
              experience of traveling through Japan as a gaijin—discovering
              hidden gems, collecting memories, and becoming part of the
              landscape.
            </p>
          </div>

          {/* Subtle fold shadow in center */}
          <div
            className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-r from-black/5 to-transparent pointer-events-none"
            style={{ transform: "translateX(-50%)" }}
          />
        </div>
      </div>

      {/* Instructions at bottom */}
      <div className="absolute bottom-4 text-center text-gray-400 text-xs">
        <p>Drag and drop the memorabilia items to rearrange them</p>
      </div>
    </main>
  );
}
