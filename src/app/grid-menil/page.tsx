'use client';

import React, { useState } from 'react';

interface Exhibition {
  id: string;
  title: string;
  dateRange: string;
  location: string;
  gradient: string;
}

const exhibitions: Exhibition[] = [
  {
    id: '1',
    title: 'Allora & Calzadilla: Specters of Noon',
    dateRange: 'Sep 26, 2020 – Jun 20, 2021',
    location: 'Main Building',
    gradient: 'from-yellow-300 via-yellow-200 to-yellow-100',
  },
  {
    id: '2',
    title: 'Modern and Contemporary at the Menil',
    dateRange: 'Mar 24 – Nov 19, 2021',
    location: 'Main Building',
    gradient: 'from-red-400 via-red-300 to-orange-200',
  },
  {
    id: '3',
    title: 'Dan Flavin Installation',
    dateRange: 'Sep 26, 2020 – Jul 3, 2021',
    location: 'Richmond Hall',
    gradient: 'from-slate-100 via-gray-50 to-white',
  },
  {
    id: '4',
    title: 'Dream Monuments: Drawing in the 1960s and 1970s',
    dateRange: 'May 21 – Sep 19, 2021',
    location: 'Menil Drawing Institute',
    gradient: 'from-amber-100 via-orange-100 to-yellow-50',
  },
  {
    id: '5',
    title: 'Photography and Vision',
    dateRange: 'Jan 15 – Dec 10, 2021',
    location: 'Glassell School',
    gradient: 'from-purple-200 via-pink-100 to-red-100',
  },
  {
    id: '6',
    title: 'Minimalist Forms in Space',
    dateRange: 'Feb 1 – Aug 30, 2021',
    location: 'Main Building',
    gradient: 'from-blue-100 via-cyan-50 to-slate-50',
  },
];

export default function GridMenilPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-full px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Museum Name */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-serif font-light tracking-wide text-gray-900">
                The Menil Collection
              </h1>
            </div>

            {/* Center Navigation Links */}
            <div className="hidden md:flex items-center space-x-12 flex-1 justify-center">
              <a
                href="#"
                className="text-sm font-sans font-normal text-gray-700 hover:text-gray-900 transition-colors"
              >
                Exhibitions
              </a>
              <a
                href="#"
                className="text-sm font-sans font-normal text-gray-700 hover:text-gray-900 transition-colors"
              >
                Visit
              </a>
              <a
                href="#"
                className="text-sm font-sans font-normal text-gray-700 hover:text-gray-900 transition-colors"
              >
                Events
              </a>
              <a
                href="#"
                className="text-sm font-sans font-normal text-gray-700 hover:text-gray-900 transition-colors"
              >
                Collection
              </a>
            </div>

            {/* Search */}
            <div className="flex-shrink-0">
              <button className="text-sm font-sans font-normal text-gray-700 hover:text-gray-900 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="bg-gray-100 min-h-[calc(100vh-80px)]">
        <div className="px-8 py-12">
          {/* On View Label */}
          <div className="mb-8">
            <label className="text-sm font-sans font-normal text-gray-600 uppercase tracking-wide">
              On View
            </label>
          </div>

          {/* Horizontal Scrolling Exhibition Cards */}
          <div
            className="overflow-x-auto pb-4"
            style={{
              scrollBehavior: 'smooth',
            }}
          >
            <div className="flex gap-8 min-w-min pr-8">
              {exhibitions.map((exhibition) => (
                <div
                  key={exhibition.id}
                  className="flex-shrink-0 w-80 cursor-pointer group"
                  onMouseEnter={() => setHoveredId(exhibition.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Exhibition Card */}
                  <div className="transition-transform duration-300 ease-out">
                    {/* Image */}
                    <div
                      className={`w-full aspect-square rounded-sm overflow-hidden mb-6 transition-opacity duration-300 ${
                        hoveredId === exhibition.id ? 'opacity-95' : 'opacity-100'
                      }`}
                      style={{
                        background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                      }}
                    >
                      <div
                        className={`w-full h-full bg-gradient-to-br ${exhibition.gradient}`}
                        style={{
                          backgroundSize: '100% 100%',
                        }}
                      />
                    </div>

                    {/* Text Content */}
                    <div className="space-y-3">
                      {/* Title */}
                      <h3 className="text-base font-sans font-normal text-gray-900 leading-tight">
                        {exhibition.title}
                      </h3>

                      {/* Date Range */}
                      <p className="text-xs font-sans font-light text-gray-600 tracking-wide">
                        {exhibition.dateRange}
                      </p>

                      {/* Location */}
                      <p className="text-xs font-sans font-light text-gray-500 uppercase tracking-wide">
                        {exhibition.location}
                      </p>
                    </div>

                    {/* Hover Underline */}
                    {hoveredId === exhibition.id && (
                      <div className="mt-4 h-px bg-gray-300 w-8" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
