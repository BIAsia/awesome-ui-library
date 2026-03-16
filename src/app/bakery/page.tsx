"use client";

import { useState, useRef, useEffect } from "react";

interface FoodItem {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  isDragging: boolean;
  rotation: number;
  type: "bread" | "sliced-bread" | "canele" | "jam-1" | "jam-2";
}

export default function BakeryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([
    { id: "bread", x: 180, y: 320, vx: 0, vy: 0, isDragging: false, rotation: 5, type: "bread" },
    { id: "sliced", x: 420, y: 380, vx: 0, vy: 0, isDragging: false, rotation: -8, type: "sliced-bread" },
    { id: "canele", x: 280, y: 200, vx: 0, vy: 0, isDragging: false, rotation: 12, type: "canele" },
    { id: "jam-1", x: 600, y: 480, vx: 0, vy: 0, isDragging: false, rotation: 0, type: "jam-1" },
    { id: "jam-2", x: 700, y: 520, vx: 0, vy: 0, isDragging: false, rotation: 3, type: "jam-2" },
  ]);

  const dragStateRef = useRef<{
    itemId: string;
    lastX: number;
    lastY: number;
  } | null>(null);

  const rafRef = useRef<number>();

  // Drag handlers
  const handlePointerDown = (itemId: string, e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragStateRef.current = {
      itemId,
      lastX: e.clientX,
      lastY: e.clientY,
    };

    setFoodItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, isDragging: true } : item
      )
    );
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStateRef.current) return;

    const { itemId, lastX, lastY } = dragStateRef.current;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;

    dragStateRef.current.lastX = e.clientX;
    dragStateRef.current.lastY = e.clientY;

    setFoodItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const rotation = Math.atan2(dy, dx) * (180 / Math.PI);
          return {
            ...item,
            x: item.x + dx,
            y: item.y + dy,
            vx: dx,
            vy: dy,
            rotation,
          };
        }
        return item;
      })
    );
  };

  const handlePointerUp = () => {
    if (!dragStateRef.current) return;

    const { itemId } = dragStateRef.current;
    dragStateRef.current = null;

    setFoodItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, isDragging: false } : item
      )
    );
  };

  // Momentum animation loop
  useEffect(() => {
    const animate = () => {
      setFoodItems((prev) =>
        prev.map((item) => {
          if (item.isDragging || (Math.abs(item.vx) < 0.01 && Math.abs(item.vy) < 0.01)) {
            return item;
          }

          const dampingFactor = 0.92;
          const newVx = item.vx * dampingFactor;
          const newVy = item.vy * dampingFactor;
          const newX = Math.max(0, Math.min(window.innerWidth - 60, item.x + newVx));
          const newY = Math.max(0, Math.min(window.innerHeight - 60, item.y + newVy));

          return {
            ...item,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
          };
        })
      );

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-white overflow-x-hidden cursor-grab active:cursor-grabbing"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Header */}
      <div className="pt-16 pb-8 text-center">
        <div className="mb-6 flex items-center justify-center gap-2">
          <span className="text-xs tracking-widest text-gray-600 font-light">Holiday Package</span>
          <div className="text-sm text-gray-400">◆</div>
        </div>

        {/* Main Typography Section with entrance animation */}
        <div
          className="max-w-4xl mx-auto px-8 animate-fade-in"
          style={{
            animation: "fadeIn 0.8s ease-out 0.2s both",
          }}
        >
          <style>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>

          <div className="space-y-4">
            {/* First Line */}
            <div className="flex flex-wrap justify-center items-baseline gap-2 md:gap-3">
              <span className="text-3xl md:text-5xl font-bold font-serif text-black">Early</span>
              <span className="text-3xl md:text-5xl font-bold font-serif text-black">Breakfast</span>
              <span className="text-2xl md:text-4xl italic text-gray-700" style={{ fontFamily: "Georgia, serif" }}>
                Special
              </span>
              <span className="text-2xl md:text-3xl font-serif text-gray-600">at</span>
            </div>

            {/* Second Line */}
            <div className="flex flex-wrap justify-center items-baseline gap-2 md:gap-3">
              <span className="text-2xl md:text-4xl font-bold font-serif text-black">Beau</span>
              <span className="text-lg md:text-2xl text-gray-500">◆</span>
              <span className="text-2xl md:text-4xl font-serif text-black">Daily*</span>
              <span className="text-xs md:text-sm text-gray-500 font-light">Kem Chicks PIK Golf</span>
              <sup className="text-xs md:text-base text-gray-500">2</sup>
            </div>

            {/* Third Line */}
            <div className="flex flex-wrap justify-center items-baseline gap-2 md:gap-3 pt-2">
              <span className="text-xl md:text-3xl font-bold font-serif text-black">Every</span>
              <span className="text-xl md:text-3xl font-bold font-serif text-black">Weekend</span>
              <span className="text-lg md:text-2xl font-light text-gray-600">and</span>
            </div>

            {/* Fourth Line */}
            <div className="flex flex-wrap justify-center items-baseline gap-2 md:gap-3">
              <span className="text-xl md:text-3xl font-bold font-serif text-black">Every</span>
              <span className="text-xl md:text-3xl font-bold font-serif text-black">Public</span>
              <span className="text-xl md:text-3xl font-bold font-serif text-black">Holiday</span>
            </div>

            {/* Fifth Line */}
            <div className="flex flex-wrap justify-center items-baseline gap-2 md:gap-3 pt-2">
              <span className="text-4xl md:text-6xl font-bold font-serif text-black">6 AM</span>
              <span className="text-2xl md:text-3xl font-bold font-serif text-black">Sharp.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-8 my-12">
        <div className="border-t border-gray-200" />
      </div>

      {/* Bottom Section */}
      <div className="max-w-4xl mx-auto px-8 pb-16 grid md:grid-cols-2 gap-12">
        {/* Left: Jam Jars */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="relative h-20 bg-red-300 rounded-lg opacity-80 flex items-center justify-center">
              <span className="text-xs font-semibold text-white">Strawberry Jam</span>
            </div>
            <div className="relative h-20 bg-green-400 rounded-lg opacity-80 flex items-center justify-center">
              <span className="text-xs font-semibold text-white">Pandan Kaya</span>
            </div>
          </div>
        </div>

        {/* Right: Text */}
        <div className="flex items-center">
          <div className="space-y-2">
            <div className="text-2xl md:text-3xl font-bold font-serif text-black">For The</div>
            <div className="text-3xl md:text-4xl font-bold font-serif text-black">Early Riser</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-8 text-xs md:text-sm font-serif text-gray-600">
        <span>Available at → </span>
        <span className="font-semibold">Beau ◆ Daily</span>
        <span> → </span>
        <span className="font-semibold">Kem Chicks PIK Golf 2</span>
      </div>

      {/* Floating Food Items */}
      {foodItems.map((item) => {
        const shadowClass = item.isDragging ? "shadow-2xl" : "shadow-lg";
        const zIndex = item.isDragging ? 50 : 10;

        return (
          <div
            key={item.id}
            className={`absolute ${shadowClass} transition-shadow cursor-grab active:cursor-grabbing`}
            style={{
              transform: `translate(${item.x}px, ${item.y}px) rotate(${item.rotation}deg)`,
              zIndex,
              opacity: 0.9,
            }}
            onPointerDown={(e) => handlePointerDown(item.id, e)}
          >
            <FoodShape type={item.type} />
          </div>
        );
      })}
    </div>
  );
}

function FoodShape({ type }: { type: string }) {
  switch (type) {
    case "bread":
      return (
        <div className="relative w-20 h-24 bg-amber-700 rounded-b-2xl opacity-85 flex items-center justify-center">
          <div className="absolute top-2 left-2 right-2 h-1 bg-amber-900 rounded-full opacity-60" />
          <div className="absolute top-5 left-2 right-2 h-1 bg-amber-900 rounded-full opacity-60" />
        </div>
      );

    case "sliced-bread":
      return (
        <div className="relative w-24 h-20 bg-yellow-100 rounded-lg opacity-85 flex items-center gap-0.5 p-1">
          <div className="flex-1 h-full bg-yellow-200 rounded border border-yellow-300" />
          <div className="flex-1 h-full bg-yellow-200 rounded border border-yellow-300" />
          <div className="flex-1 h-full bg-yellow-200 rounded border border-yellow-300" />
        </div>
      );

    case "canele":
      return (
        <div className="relative w-6 h-10 bg-amber-900 rounded-full opacity-85">
          <div className="absolute inset-0 rounded-full" style={{
            background: "radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 70%)",
          }} />
        </div>
      );

    case "jam-1":
      return (
        <div className="relative w-16 h-20 bg-red-400 rounded-b-2xl border-2 border-red-500 opacity-85 flex items-center justify-center">
          <div className="absolute -top-2 left-2 right-2 h-3 bg-gray-200 rounded-t-lg" />
          <span className="text-xs text-white font-bold">JAM</span>
        </div>
      );

    case "jam-2":
      return (
        <div className="relative w-16 h-20 bg-green-500 rounded-b-2xl border-2 border-green-600 opacity-85 flex items-center justify-center">
          <div className="absolute -top-2 left-2 right-2 h-3 bg-gray-200 rounded-t-lg" />
          <span className="text-xs text-white font-bold">JAM</span>
        </div>
      );

    default:
      return null;
  }
}
