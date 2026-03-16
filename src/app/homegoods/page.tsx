"use client";

import { useState, useRef, useEffect } from "react";

interface Product {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  isDragging: boolean;
  rotation: number;
  type: "bubble" | "coral" | "candle" | "tray" | "tile" | "snuffer";
}

const marqueeText = "Homegoods for a Perfect Space. Artisan Made. All Natural.";

export default function HomegoodsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([
    { id: "bubble", x: 120, y: 180, vx: 0, vy: 0, isDragging: false, rotation: 0, type: "bubble" },
    { id: "coral", x: 200, y: 320, vx: 0, vy: 0, isDragging: false, rotation: 15, type: "coral" },
    { id: "candle", x: 350, y: 250, vx: 0, vy: 0, isDragging: false, rotation: 0, type: "candle" },
    { id: "tray", x: 600, y: 150, vx: 0, vy: 0, isDragging: false, rotation: -10, type: "tray" },
    { id: "tile", x: 500, y: 400, vx: 0, vy: 0, isDragging: false, rotation: 5, type: "tile" },
    { id: "snuffer", x: 700, y: 280, vx: 0, vy: 0, isDragging: false, rotation: 20, type: "snuffer" },
  ]);

  const [hoveredMarquee, setHoveredMarquee] = useState(false);
  const dragStateRef = useRef<{
    productId: string;
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  } | null>(null);
  const rafRef = useRef<number>();

  // Drag handlers
  const handlePointerDown = (productId: string, e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragStateRef.current = {
      productId,
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      lastY: e.clientY,
    };

    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, isDragging: true } : p
      )
    );
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStateRef.current) return;

    const { productId, lastX, lastY } = dragStateRef.current;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;

    dragStateRef.current.lastX = e.clientX;
    dragStateRef.current.lastY = e.clientY;

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const rotation = Math.atan2(dy, dx) * (180 / Math.PI);
          return {
            ...p,
            x: p.x + dx,
            y: p.y + dy,
            vx: dx,
            vy: dy,
            rotation,
          };
        }
        return p;
      })
    );
  };

  const handlePointerUp = () => {
    if (!dragStateRef.current) return;

    const { productId } = dragStateRef.current;
    dragStateRef.current = null;

    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, isDragging: false } : p
      )
    );
  };

  // Momentum animation loop
  useEffect(() => {
    const animate = () => {
      setProducts((prev) =>
        prev.map((p) => {
          if (p.isDragging || (Math.abs(p.vx) < 0.01 && Math.abs(p.vy) < 0.01)) {
            return p;
          }

          const dampingFactor = 0.92;
          const newVx = p.vx * dampingFactor;
          const newVy = p.vy * dampingFactor;
          const newX = Math.max(0, Math.min(window.innerWidth - 80, p.x + newVx));
          const newY = Math.max(0, Math.min(window.innerHeight - 80, p.y + newVy));

          return {
            ...p,
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
      className="relative w-full h-screen bg-white overflow-hidden cursor-grab active:cursor-grabbing"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Marquee Container */}
      <div
        className="absolute inset-0 flex flex-col justify-center pointer-events-none"
        onMouseEnter={() => setHoveredMarquee(true)}
        onMouseLeave={() => setHoveredMarquee(false)}
      >
        {Array.from({ length: 8 }).map((_, rowIdx) => {
          const isEvenRow = rowIdx % 2 === 0;
          const direction = isEvenRow ? "left" : "right";
          const duration = hoveredMarquee ? "0s" : "40s";

          return (
            <div
              key={rowIdx}
              className="relative h-20 flex items-center overflow-hidden"
              style={{
                animation: hoveredMarquee ? "none" : `marquee-${direction} ${duration} linear infinite`,
              }}
            >
              <style>{`
                @keyframes marquee-left {
                  from { transform: translateX(0); }
                  to { transform: translateX(-100%); }
                }
                @keyframes marquee-right {
                  from { transform: translateX(-100%); }
                  to { transform: translateX(0); }
                }
              `}</style>

              <div className="whitespace-nowrap flex">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span
                    key={i}
                    className="text-5xl font-serif text-black px-12 leading-tight"
                    style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}
                  >
                    {marqueeText}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Products */}
      {products.map((product) => {
        const shadowClass = product.isDragging ? "shadow-2xl" : "shadow-lg";
        const zIndex = product.isDragging ? 50 : 10;

        return (
          <div
            key={product.id}
            className={`absolute ${shadowClass} transition-shadow cursor-grab active:cursor-grabbing`}
            style={{
              transform: `translate(${product.x}px, ${product.y}px) rotate(${product.rotation}deg)`,
              zIndex,
              opacity: 0.85,
            }}
            onPointerDown={(e) => handlePointerDown(product.id, e)}
          >
            <ProductShape type={product.type} />
          </div>
        );
      })}

      {/* Labels */}
      <div className="absolute top-8 left-8 text-xs text-gray-400 font-light pointer-events-none">
        2023
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 font-light pointer-events-none">
        Brand Development & Packaging
      </div>
    </div>
  );
}

function ProductShape({ type }: { type: string }) {
  switch (type) {
    case "bubble":
      return (
        <div className="relative w-32 h-32">
          <div className="absolute top-0 left-0 w-16 h-16 bg-yellow-100 rounded-full opacity-80" />
          <div className="absolute top-8 left-12 w-20 h-20 bg-amber-100 rounded-full opacity-70" />
          <div className="absolute top-16 left-4 w-24 h-24 bg-yellow-50 rounded-full opacity-60" />
        </div>
      );

    case "coral":
      return (
        <div className="w-28 h-32 bg-red-400 rounded-3xl opacity-80" style={{
          clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
        }} />
      );

    case "candle":
      return (
        <div className="relative w-20 h-32 bg-gray-300 rounded-lg opacity-80 flex items-center justify-center">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-yellow-200 rounded-t-full" />
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gray-400 rounded-full opacity-50" />
        </div>
      );

    case "tray":
      return (
        <div className="w-28 h-20 bg-yellow-100 rounded-3xl opacity-80 shadow-md flex items-center justify-center">
          <div className="w-20 h-12 border-2 border-yellow-200 rounded-2xl" />
        </div>
      );

    case "tile":
      return (
        <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg opacity-80 border border-gray-400" />
      );

    case "snuffer":
      return (
        <div className="relative w-6 h-32 bg-gray-600 rounded-t-full opacity-80">
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-gray-700 rounded-full" />
        </div>
      );

    default:
      return null;
  }
}
