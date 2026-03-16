"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  Pencil,
  Search,
  Bell,
  Settings,
  ChevronDown,
  Info,
  Plus,
} from "lucide-react";

const phases = ["Fit", "Build", "Launch"];
const tabs = ["Vision", "Product Goals", "FBL Canvas"];

const visionCards = [
  {
    title: "Vision",
    subtitle: "Fill Out How Vision.",
    body: "",
  },
  {
    title: "Why?",
    subtitle: "Fill Out Why Summary.",
    body: "This Ambitious Venture Represents A Beacon Of Progress And Potential.",
  },
  {
    title: "What?",
    subtitle: "Fill Out What Summary.",
    body: "",
  },
  {
    title: "How",
    subtitle: "Fill Out How Summary.",
    body: "",
  },
  {
    title: "Mission",
    subtitle: "Fill Out Mission Summary.",
    body: "With A Focus On Sustainability And Renewable Energy, Project 001 Is Determined To Reshape Our Approach To Environmental Challenges.",
  },
  {
    title: "Values",
    subtitle: "Fill Out Values Summary.",
    body: "",
  },
];

export default function VisionBoardPage() {
  const [activePhase, setActivePhase] = useState("Fit");
  const [activeTab, setActiveTab] = useState("Vision");

  return (
    <div className="min-h-screen bg-[#f5f5f7] font-sans">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 right-0 h-[320px] bg-gradient-to-b from-blue-100/80 via-blue-50/40 to-transparent pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <header className="flex items-center justify-between py-5">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M8 8L16 4L24 8V18L16 28L8 18V8Z" fill="black" />
              <path d="M12 12L16 10L20 12V17L16 22L12 17V12Z" fill="white" />
            </svg>

            {/* User */}
            <button className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full pl-1.5 pr-3 py-1.5 border border-gray-200/50 shadow-sm">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-200 to-orange-300" />
              <span className="text-sm font-medium text-gray-800">Mr. Gibson</span>
              <ChevronDown size={14} className="text-gray-400" />
            </button>

            <button className="w-8 h-8 rounded-full border border-gray-200/50 bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
              <Info size={14} className="text-gray-400" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Project selector */}
            <button className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full pl-4 pr-1.5 py-1.5 border border-gray-200/50 shadow-sm">
              <span className="text-sm font-medium text-gray-800">Project 001</span>
              <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center">
                <ChevronDown size={14} className="text-white" />
              </div>
            </button>

            <button className="w-8 h-8 rounded-full border border-gray-200/50 bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
              <Settings size={14} className="text-gray-500" />
            </button>
            <button className="w-8 h-8 rounded-full border border-gray-200/50 bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
              <Search size={14} className="text-gray-500" />
            </button>
            <button className="w-8 h-8 rounded-full border border-gray-200/50 bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm relative">
              <Bell size={14} className="text-gray-500" />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-[#f5f5f7]" />
            </button>
          </div>
        </header>

        {/* Phase Tabs */}
        <div className="mt-4 mb-2">
          <div className="flex items-baseline gap-6">
            {phases.map((phase) => (
              <button
                key={phase}
                onClick={() => setActivePhase(phase)}
                className={`text-4xl font-bold transition-colors ${
                  activePhase === phase
                    ? "text-gray-900"
                    : "text-gray-300 hover:text-gray-400"
                }`}
              >
                {phase}
              </button>
            ))}
          </div>
        </div>

        {/* Sub tabs */}
        <div className="flex items-center gap-6 mt-2 mb-8 border-b border-transparent">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm pb-2 transition-colors ${
                activeTab === tab
                  ? "text-gray-900 font-medium border-b-2 border-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visionCards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl p-5 flex flex-col min-h-[220px] shadow-sm border border-gray-100/50"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{card.title}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{card.subtitle}</p>
                </div>
                <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                  <MoreHorizontal size={16} className="text-gray-400" />
                </button>
              </div>

              {/* Card Body */}
              <div className="flex-1 flex flex-col justify-end">
                {card.body ? (
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {card.body}
                  </p>
                ) : null}

                {/* Card Footer */}
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-xs text-gray-300">
                    {card.body ? "" : "Add Text..."}
                  </span>
                  <button className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <Pencil size={14} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer elements */}
        <div className="flex items-center justify-between mt-6 pb-8">
          <button className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm">
            <Info size={14} className="text-gray-400" />
          </button>
          <button className="flex items-center gap-2 bg-gray-900 text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-gray-700 transition-colors shadow-lg">
            Add area
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
