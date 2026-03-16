"use client";

import { useState, useRef, useEffect } from "react";

interface ProjectCard {
  id: string;
  title: string;
  gradient: string;
  offset: number;
  width: string;
  height: string;
}

const projects: ProjectCard[] = [
  { id: "superpower", title: "Superpower", gradient: "linear-gradient(135deg, #1a1a1a 0%, #404040 100%)", offset: 0, width: "w-80", height: "h-96" },
  { id: "girlfriends", title: "Girlfriends", gradient: "linear-gradient(135deg, #2d1b3d 0%, #5a3366 100%)", offset: 60, width: "w-72", height: "h-80" },
  { id: "character-ai", title: "Character AI", gradient: "linear-gradient(135deg, #1a3a4a 0%, #2d6a7d 100%)", offset: 20, width: "w-80", height: "h-96" },
  { id: "bastion-bees", title: "Bastion Bees", gradient: "linear-gradient(135deg, #3d2b1a 0%, #6b4423 100%)", offset: 80, width: "w-72", height: "h-80" },
  { id: "eliza-dolittle", title: "Eliza Dolittle", gradient: "linear-gradient(135deg, #2d1a3a 0%, #553366 100%)", offset: 40, width: "w-80", height: "h-96" },
  { id: "waverly", title: "Waverly", gradient: "linear-gradient(135deg, #1a2d3a 0%, #2d5577 100%)", offset: 70, width: "w-72", height: "h-80" },
  { id: "timmons", title: "Timmons", gradient: "linear-gradient(135deg, #3a2d1a 0%, #6b5533 100%)", offset: 30, width: "w-80", height: "h-96" },
  { id: "poga", title: "POGA", gradient: "linear-gradient(135deg, #1a3a2d 0%, #2d6b5a 100%)", offset: 50, width: "w-72", height: "h-80" },
];

export default function GridOverstimulatedPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f5f3ef] flex flex-col">
      {/* Header Section */}
      <div className="px-8 lg:px-16 py-12 flex items-start justify-between gap-8 border-b border-gray-300">
        {/* Left: Logo */}
        <div className="flex-shrink-0 pt-2">
          <h1 className="text-2xl font-bold tracking-tight text-black">
            Over-Stimulated<span className="text-lg align-super">®</span>
          </h1>
        </div>

        {/* Center: Description */}
        <div className="flex-1 max-w-md">
          <p className="font-serif text-sm lg:text-base text-gray-700 leading-relaxed">
            <span className="italic text-gray-800">L'appel du vide</span>
            {" "}– the call of the void. Creativity without limits, pushing boundaries in visual storytelling and immersive experiences.
          </p>
        </div>

        {/* Right: Navigation */}
        <nav className="flex-shrink-0 flex flex-col gap-3 text-right pt-1">
          <a href="#" className="text-sm font-medium text-black hover:text-gray-600 transition">
            WORK +
          </a>
          <a href="#" className="text-sm font-medium text-black hover:text-gray-600 transition">
            JOURNAL
          </a>
          <a href="#" className="text-sm font-medium text-black hover:text-gray-600 transition">
            ABOUT
          </a>
          <a href="#" className="text-sm font-medium text-black hover:text-gray-600 transition">
            CONTACT
          </a>
        </nav>
      </div>

      {/* Projects Grid Section */}
      <div className="flex-1 flex flex-col px-8 lg:px-16 py-16">
        <h2 className="text-xs tracking-widest uppercase text-gray-600 mb-8">Featured Projects</h2>

        {/* Scroll Container */}
        <div className="relative flex-1 overflow-hidden group">
          {/* Scroll Indicators */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#f5f3ef] to-transparent z-20 flex items-center justify-start pl-4 opacity-0 group-hover:opacity-100 transition"
            >
              <span className="text-gray-600 text-lg font-light">←</span>
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#f5f3ef] to-transparent z-20 flex items-center justify-end pr-4 opacity-0 group-hover:opacity-100 transition"
            >
              <span className="text-gray-600 text-lg font-light">→</span>
            </button>
          )}

          {/* Scrollable Projects */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto no-scrollbar pb-4"
            style={{ scrollBehavior: "smooth" }}
          >
            <style>{`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>

            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 lg:px-16 py-8 border-t border-gray-300 text-center text-xs text-gray-600">
        <p>© 2024 Over-Stimulated Creative Agency. All rights reserved.</p>
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: ProjectCard;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const baseOffset = project.offset;
  const cardOffset = (index % 3) * 25;
  const totalOffset = baseOffset + cardOffset;

  return (
    <div
      className="flex-shrink-0 relative group cursor-pointer transition-transform hover:scale-105 duration-300"
      style={{
        transform: `translateY(${totalOffset}px)`,
      }}
    >
      {/* Card Container */}
      <div className={`${project.width} ${project.height} rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300`}>
        {/* Image Gradient Placeholder */}
        <div
          className="w-full h-full"
          style={{
            background: project.gradient,
          }}
        />

        {/* Overlay with project info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
          <div className="self-end">
            <div className="w-8 h-8 border-2 border-white/60 rounded-sm flex items-center justify-center text-white/60 text-xs font-light">
              ✕
            </div>
          </div>
          <div>
            <p className="text-white text-xs tracking-widest mb-1">○</p>
            <h3 className="text-white text-sm font-medium">{project.title}</h3>
          </div>
        </div>
      </div>

      {/* Title Badge (visible by default) */}
      <div className="absolute -bottom-8 left-0 right-0 px-1">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-xs">○</span>
          <span className="text-xs font-medium text-gray-700">{project.title}</span>
        </div>
      </div>
    </div>
  );
}
