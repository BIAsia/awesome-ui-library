"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const projects = [
  {
    href: "/agentx",
    title: "AgentX",
    subtitle: "AI Content Platform",
    desc: "Landing page with hero section, content grid, and warm color palette.",
    image: "/references/agentx.jpeg",
  },
  {
    href: "/vision-board",
    title: "Vision Board",
    subtitle: "Project Dashboard",
    desc: "Fit / Build / Launch dashboard with vision cards and clean layout.",
    image: "/references/vision-board.jpeg",
  },
  {
    href: "/photo-albums",
    title: "Photo Albums",
    subtitle: "Glassmorphic Folders",
    desc: "macOS-style photo album folders with stickers and hover animations.",
    image: "/references/photo-albums.jpeg",
  },
  {
    href: "/pink-folders",
    title: "Pink Folders",
    subtitle: "Creative Resource Hub",
    desc: "Orbital folder layout with parallax mouse tracking and drag physics.",
    image: "/references/pink-folders.jpeg",
  },
  {
    href: "/monthly-folders",
    title: "Monthly Folders",
    subtitle: "Half-Year Review",
    desc: "Colorful pastel folders with peeking items and staggered entrance animations.",
    image: "/references/monthly-folders.jpeg",
  },
  {
    href: "/category-specimen",
    title: "Category Specimen",
    subtitle: "Editorial TOC",
    desc: "Print-style table of contents with 6 columns and draggable stationery.",
    image: "/references/category-specimen.jpeg",
  },
  {
    href: "/gaijin",
    title: "Gaijin",
    subtitle: "Japanese Travel Zine",
    desc: "Double-page spread with massive typography and draggable memorabilia.",
    image: "/references/gaijin.jpeg",
  },
  {
    href: "/magazine-index",
    title: "Magazine Index",
    subtitle: "Scattered Articles",
    desc: "Editorial contents page with mixed typography and draggable thumbnails.",
    image: "/references/magazine-index.jpeg",
  },
  {
    href: "/homegoods",
    title: "Homegoods",
    subtitle: "Marquee Typography",
    desc: "Luxury brand hero with auto-scrolling serif text and draggable products.",
    image: "/references/homegoods.jpeg",
  },
  {
    href: "/bakery",
    title: "Bakery",
    subtitle: "Breakfast Promo",
    desc: "Editorial food promo with mixed typography and draggable food stickers.",
    image: "/references/bakery.jpeg",
  },
  {
    href: "/exhibition-poster",
    title: "Exhibition Poster",
    subtitle: "Comic Artists",
    desc: "Playful poster with red typography, draggable pink shapes, and SVG animations.",
    image: "/references/exhibition-poster.jpeg",
  },
];

export default function Home() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [previewVisible, setPreviewVisible] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Preload all images on mount
  useEffect(() => {
    projects.forEach((project, idx) => {
      const img = new window.Image();
      img.onload = () => {
        setLoadedImages((prev) => new Set(prev).add(idx));
      };
      img.src = project.image;
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleEnter = (idx: number) => {
    setHoveredIdx(idx);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setPreviewVisible(true), 60);
  };

  const handleLeave = () => {
    setPreviewVisible(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setHoveredIdx(null), 200);
  };

  const isCurrentLoaded = hoveredIdx !== null && loadedImages.has(hoveredIdx);

  return (
    <main className="min-h-screen bg-[#fafafa] relative overflow-hidden">
      {/* Floating preview image */}
      {hoveredIdx !== null && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: mousePos.x + 24,
            top: mousePos.y - 100,
            opacity: previewVisible ? 1 : 0,
            transform: previewVisible
              ? "scale(1) rotate(2deg)"
              : "scale(0.8) rotate(-3deg)",
            transition:
              "opacity 0.25s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <div className="w-[320px] h-[220px] rounded-xl overflow-hidden shadow-2xl border border-gray-200/50 bg-white relative">
            {/* Skeleton placeholder */}
            {!isCurrentLoaded && (
              <div className="absolute inset-0 bg-gray-100 animate-pulse" />
            )}
            {/* Prerendered images — all mounted, only active one visible */}
            {projects.map((project, idx) => (
              <img
                key={project.href}
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-150"
                style={{
                  opacity: hoveredIdx === idx && isCurrentLoaded ? 1 : 0,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight mb-3">
            Awesome UI Library
          </h1>
          <p className="text-lg text-gray-400">
            Reverse-engineered UI designs for quick reference and reuse.
          </p>
          <p className="text-sm text-gray-300 mt-1">
            {projects.length} designs · hover to preview · click to explore
          </p>
        </div>

        {/* Project List */}
        <div className="border-t border-gray-200">
          {projects.map((project, idx) => (
            <Link
              key={project.href}
              href={project.href}
              className="group block border-b border-gray-100 py-5 transition-colors hover:bg-white hover:border-gray-200"
              onMouseEnter={() => handleEnter(idx)}
              onMouseLeave={handleLeave}
            >
              <div className="flex items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-3 min-w-0">
                  <span className="text-xs font-mono text-gray-300 w-6 flex-shrink-0 tabular-nums">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-black transition-colors truncate">
                    {project.title}
                  </h2>
                  <span className="text-sm text-gray-300 group-hover:text-gray-400 transition-colors hidden sm:inline">
                    — {project.subtitle}
                  </span>
                </div>
                <span className="text-xs text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0">
                  →
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1 ml-9 group-hover:text-gray-500 transition-colors">
                {project.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
