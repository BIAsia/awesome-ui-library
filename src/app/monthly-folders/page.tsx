"use client";

import { useState, useEffect } from "react";

const months = [
  {
    name: "January",
    color: "#FFE0B2",
    darkColor: "#FFB74D",
    items: [
      { type: "rect", color: "#e53935", x: 10, y: -25, w: 40, h: 50, rotate: -8, label: "Ai" },
      { type: "rect", color: "#1565C0", x: 45, y: -20, w: 50, h: 35, rotate: 5, label: "" },
      { type: "rect", color: "#F48FB1", x: 30, y: -35, w: 35, h: 25, rotate: -3, label: "" },
    ],
  },
  {
    name: "February",
    color: "#B2DFDB",
    darkColor: "#80CBC4",
    items: [
      { type: "rect", color: "#7B1FA2", x: 15, y: -28, w: 45, h: 55, rotate: -5, label: "" },
      { type: "rect", color: "#26A69A", x: 50, y: -22, w: 30, h: 40, rotate: 8, label: "X" },
      { type: "rect", color: "#FFB74D", x: 35, y: -32, w: 35, h: 28, rotate: -2, label: "" },
    ],
  },
  {
    name: "March",
    color: "#FFCCBC",
    darkColor: "#FF8A65",
    items: [
      { type: "rect", color: "#1E88E5", x: 12, y: -30, w: 42, h: 38, rotate: -6, label: "" },
      { type: "circle", color: "#F44336", x: 55, y: -18, w: 28, h: 28, rotate: 0, label: "⏰" },
      { type: "rect", color: "#43A047", x: 40, y: -35, w: 30, h: 40, rotate: 4, label: "" },
    ],
  },
  {
    name: "April",
    color: "#FFF9C4",
    darkColor: "#FFF176",
    items: [
      { type: "rect", color: "#1565C0", x: 10, y: -30, w: 55, h: 45, rotate: -4, label: "" },
      { type: "rect", color: "#E91E63", x: 48, y: -25, w: 35, h: 40, rotate: 6, label: "" },
      { type: "rect", color: "#FFA726", x: 30, y: -35, w: 30, h: 30, rotate: -8, label: "" },
    ],
  },
  {
    name: "May",
    color: "#E1BEE7",
    darkColor: "#CE93D8",
    items: [
      { type: "rect", color: "#311B92", x: 15, y: -30, w: 50, h: 50, rotate: -3, label: "Ae" },
      { type: "rect", color: "#455A64", x: 45, y: -22, w: 35, h: 38, rotate: 7, label: "" },
      { type: "rect", color: "#78909C", x: 28, y: -35, w: 32, h: 25, rotate: -5, label: "" },
    ],
  },
  {
    name: "June",
    color: "#BBDEFB",
    darkColor: "#90CAF9",
    items: [
      { type: "rect", color: "#FF5722", x: 10, y: -28, w: 45, h: 35, rotate: -6, label: "Ai" },
      { type: "rect", color: "#0277BD", x: 50, y: -22, w: 38, h: 42, rotate: 4, label: "in" },
      { type: "rect", color: "#E91E63", x: 32, y: -35, w: 30, h: 28, rotate: -3, label: "" },
    ],
  },
];

const todos = [
  "Enhancing my personal branding",
  "Gently preparing myself for college life",
  "Creating visual designs for committee projects",
];

function FolderSVG({
  color,
  darkColor,
  items,
  isHovered,
  cursorInside,
}: {
  color: string;
  darkColor: string;
  items: typeof months[0]["items"];
  isHovered: boolean;
  cursorInside: boolean;
}) {
  return (
    <svg
      width="200"
      height="160"
      viewBox="0 0 200 160"
      fill="none"
      style={{
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        filter: isHovered
          ? "drop-shadow(0 12px 20px rgba(0,0,0,0.12))"
          : "drop-shadow(0 4px 8px rgba(0,0,0,0.06))",
      }}
    >
      {/* Items peeking out */}
      {items.map((item, i) => {
        const hoverOffset = isHovered ? -12 - i * 5 : 0;
        return (
          <g
            key={i}
            style={{
              transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transitionDelay: `${i * 50}ms`,
            }}
          >
            {item.type === "circle" ? (
              <circle
                cx={item.x + item.w / 2}
                cy={60 + item.y + hoverOffset}
                r={item.w / 2}
                fill={item.color}
                transform={`rotate(${item.rotate} ${item.x + item.w / 2} ${60 + item.y + hoverOffset})`}
              />
            ) : (
              <rect
                x={item.x}
                y={60 + item.y + hoverOffset}
                width={item.w}
                height={item.h}
                rx={4}
                fill={item.color}
                transform={`rotate(${item.rotate} ${item.x + item.w / 2} ${60 + item.y + item.h / 2 + hoverOffset})`}
              />
            )}
            {item.label && (
              <text
                x={item.x + item.w / 2}
                y={60 + item.y + item.h / 2 + hoverOffset + 5}
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="bold"
                style={{ pointerEvents: "none" }}
              >
                {item.label}
              </text>
            )}
          </g>
        );
      })}

      {/* Folder body */}
      <path
        d={`M8 60 Q8 52 16 52 L68 52 L78 42 L184 42 Q192 42 192 50 L192 140 Q192 148 184 148 L16 148 Q8 148 8 140 Z`}
        fill={color}
      />

      {/* Folder flap (top edge highlight) */}
      <path
        d={`M8 65 Q8 57 16 57 L184 57 Q192 57 192 65 L192 72 L8 72 Z`}
        fill={darkColor}
        opacity={0.3}
      />

      {/* Cursor icon for May */}
      {cursorInside && (
        <g
          style={{
            animation: "cursorBob 2s ease-in-out infinite",
          }}
        >
          <path
            d="M130 110 L130 130 L137 125 L142 135 L146 133 L141 123 L149 122 Z"
            fill="white"
            stroke="#333"
            strokeWidth="1.5"
          />
        </g>
      )}
    </svg>
  );
}

export default function MonthlyFoldersPage() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setRevealed(true);
  }, []);

  return (
    <div
      className="min-h-screen bg-white flex flex-col items-center py-12 px-6"
      style={{ fontFamily: "'Georgia', serif" }}
    >
      <style>{`
        @keyframes cursorBob {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(3px, 3px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes checkIn {
          from { opacity: 0; transform: scale(0); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Title */}
      <h1
        className="text-3xl md:text-4xl text-center text-gray-800 mb-10 leading-snug"
        style={{
          animation: revealed ? "fadeInUp 0.8s ease-out" : "none",
          opacity: revealed ? 1 : 0,
        }}
      >
        Half-Year{" "}
        <span className="italic font-light">Tucked</span> Inside My
        Folder
      </h1>

      {/* Folder Grid */}
      <div className="grid grid-cols-3 gap-x-8 gap-y-6 max-w-[700px]">
        {months.map((month, idx) => (
          <div
            key={month.name}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              animation: revealed
                ? `fadeInUp 0.6s ease-out ${idx * 0.1}s both`
                : "none",
            }}
          >
            <FolderSVG
              color={month.color}
              darkColor={month.darkColor}
              items={month.items}
              isHovered={hoveredIdx === idx}
              cursorInside={month.name === "May"}
            />
            <span
              className="text-base transition-all duration-300"
              style={{
                fontWeight: hoveredIdx === idx ? 700 : 400,
                color: hoveredIdx === idx ? "#333" : "#666",
                fontStyle: "italic",
              }}
            >
              {month.name}
            </span>
          </div>
        ))}
      </div>

      {/* Todo List */}
      <div
        className="mt-12 max-w-[450px] w-full"
        style={{
          animation: revealed ? "fadeInUp 0.8s ease-out 0.7s both" : "none",
        }}
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">To Do List :</h2>
        <div className="flex flex-col gap-3">
          {todos.map((todo, idx) => (
            <div key={idx} className="flex items-center gap-3 group">
              <div
                className="w-4 h-4 rounded-sm bg-amber-400 flex-shrink-0 transition-transform duration-300 group-hover:scale-125"
                style={{
                  animation: revealed
                    ? `checkIn 0.4s ease-out ${0.9 + idx * 0.15}s both`
                    : "none",
                }}
              />
              <span className="text-[15px] text-gray-600 group-hover:text-gray-800 transition-colors">
                {todo}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4 italic">
          (Everything has been going well during the past half-year)
        </p>
      </div>

      {/* Footer */}
      <p className="mt-10 text-sm text-gray-400 italic">
        CasualFlourish&apos;s Cre<span className="not-italic font-semibold text-gray-500">a</span>tive Space
      </p>
    </div>
  );
}
