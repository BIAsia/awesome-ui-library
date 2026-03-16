'use client';

import { useState, useRef } from 'react';

interface Photo {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  gradient: string;
  width: number;
  height: number;
  zIndex: number;
}

export default function SchneebergerGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: 1,
      x: 200,
      y: 120,
      rotation: -12,
      scale: 1,
      gradient: 'from-slate-900 via-slate-800 to-slate-700',
      width: 280,
      height: 380,
      zIndex: 1,
    },
    {
      id: 2,
      x: 550,
      y: 80,
      rotation: 8,
      scale: 1,
      gradient: 'from-gray-900 via-slate-800 to-gray-700',
      width: 240,
      height: 320,
      zIndex: 2,
    },
    {
      id: 3,
      x: 850,
      y: 200,
      rotation: -18,
      scale: 1,
      gradient: 'from-slate-800 via-gray-900 to-slate-900',
      width: 300,
      height: 400,
      zIndex: 3,
    },
    {
      id: 4,
      x: 350,
      y: 380,
      rotation: 15,
      scale: 1,
      gradient: 'from-gray-800 via-slate-900 to-gray-800',
      width: 260,
      height: 350,
      zIndex: 4,
    },
    {
      id: 5,
      x: 750,
      y: 420,
      rotation: -8,
      scale: 1,
      gradient: 'from-slate-900 via-gray-800 to-slate-800',
      width: 220,
      height: 300,
      zIndex: 5,
    },
    {
      id: 6,
      x: 1050,
      y: 500,
      rotation: 12,
      scale: 1,
      gradient: 'from-gray-900 via-slate-700 to-gray-900',
      width: 240,
      height: 320,
      zIndex: 6,
    },
    {
      id: 7,
      x: 150,
      y: 550,
      rotation: -5,
      scale: 1,
      gradient: 'from-slate-800 via-gray-800 to-slate-700',
      width: 200,
      height: 280,
      zIndex: 7,
    },
    {
      id: 8,
      x: 600,
      y: 280,
      rotation: 20,
      scale: 1,
      gradient: 'from-gray-800 via-slate-900 to-gray-700',
      width: 270,
      height: 360,
      zIndex: 8,
    },
  ]);

  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dragStartPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    photoId: number
  ) => {
    if (!containerRef.current) return;

    const photo = photos.find((p) => p.id === photoId);
    if (!photo) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    dragStartPos.current = {
      x: mouseX - photo.x,
      y: mouseY - photo.y,
    };

    setDraggingId(photoId);
    setDragOffset({ x: 0, y: 0 });

    // Bring to front
    setPhotos((prev) =>
      prev.map((p) =>
        p.id === photoId
          ? { ...p, zIndex: Math.max(...prev.map((pp) => pp.zIndex)) + 1 }
          : p
      )
    );
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!draggingId || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    const photo = photos.find((p) => p.id === draggingId);
    if (!photo) return;

    const newX = mouseX - dragStartPos.current.x;
    const newY = mouseY - dragStartPos.current.y;

    setPhotos((prev) =>
      prev.map((p) =>
        p.id === draggingId
          ? {
              ...p,
              x: newX,
              y: newY,
            }
          : p
      )
    );
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Left side text block */}
      <div className="absolute top-24 left-12 max-w-xs z-50">
        <div className="font-serif italic text-lg leading-relaxed text-gray-900">
          <p className="mb-8">Good luck trying to be prettier than me.</p>
          <p className="text-sm font-normal not-italic tracking-wide text-gray-700">
            Lukas Schneeberger
            <br />
            2012
          </p>
        </div>
      </div>

      {/* Scattered photos */}
      {photos.map((photo) => (
        <div
          key={photo.id}
          className={`absolute ${
            draggingId === photo.id ? 'cursor-grabbing' : 'cursor-grab'
          } transition-shadow hover:shadow-2xl`}
          style={{
            left: `${photo.x}px`,
            top: `${photo.y}px`,
            width: `${photo.width}px`,
            height: `${photo.height}px`,
            transform: `rotate(${photo.rotation}deg)`,
            zIndex: photo.zIndex,
            userSelect: 'none',
          }}
          onMouseDown={(e) => handleMouseDown(e, photo.id)}
        >
          {/* Photo background with gradient */}
          <div
            className={`w-full h-full bg-gradient-to-br ${photo.gradient} rounded-sm shadow-xl`}
            style={{
              boxShadow:
                '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Subtle texture overlay */}
            <div className="absolute inset-0 opacity-30 bg-noise rounded-sm" />

            {/* Photo frame border */}
            <div className="absolute inset-0 border-8 border-gray-100 rounded-sm pointer-events-none" />

            {/* Subtle light leak effect on some photos */}
            {photo.id % 3 === 0 && (
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-yellow-900/20 to-transparent rounded-full blur-2xl" />
            )}
          </div>
        </div>
      ))}

      {/* Bottom left navigation */}
      <div className="absolute bottom-12 left-12 text-gray-900 z-50">
        <div className="space-y-2 font-serif text-sm">
          <p className="hover:opacity-60 transition-opacity cursor-pointer">
            Order
          </p>
          <p className="underline hover:opacity-60 transition-opacity cursor-pointer">
            My Chaos
          </p>
        </div>
      </div>

      {/* Bottom right navigation */}
      <div className="absolute bottom-12 right-12 text-gray-900 z-50">
        <div className="space-y-2 font-serif text-sm">
          <p className="hover:opacity-60 transition-opacity cursor-pointer">
            About
          </p>
          <p className="hover:opacity-60 transition-opacity cursor-pointer">
            Imprint
          </p>
        </div>
      </div>

      {/* Subtle instruction indicator when hovering over photos */}
      <div className="absolute top-6 right-12 text-gray-500 text-xs font-light pointer-events-none">
        Drag to rearrange
      </div>
    </div>
  );
}
