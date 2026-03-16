'use client';

import { useState, useRef, useEffect } from 'react';

type DragState = {
  id: string;
  x: number;
  y: number;
  startX: number;
  startY: number;
};

type CategoryItem = {
  name: string;
  pageNumber: number;
};

type CategoryColumn = {
  number: number;
  items: CategoryItem[];
  illustration: 'books' | 'pencil' | 'keys' | 'compass' | 'scissors' | 'clock';
};

const CATEGORIES: CategoryColumn[] = [
  {
    number: 1,
    illustration: 'books',
    items: [
      { name: 'Edito', pageNumber: 1 },
      { name: 'Polycopié', pageNumber: 2 },
      { name: 'The Library', pageNumber: 3 },
      { name: 'The Categories', pageNumber: 4 },
      { name: 'Le Mythe', pageNumber: 5 },
      { name: 'Joker', pageNumber: 6 },
      { name: 'Words', pageNumber: 7 },
    ],
  },
  {
    number: 2,
    illustration: 'pencil',
    items: [
      { name: 'The Tools', pageNumber: 8 },
      { name: 'From Text to Display', pageNumber: 9 },
      { name: 'Object', pageNumber: 10 },
      { name: 'Objects in the Mirror', pageNumber: 11 },
    ],
  },
  {
    number: 3,
    illustration: 'keys',
    items: [
      { name: 'Mythologies', pageNumber: 12 },
      { name: 'Orga', pageNumber: 13 },
      { name: 'A chapter by figure', pageNumber: 14 },
      { name: 'La Pochette', pageNumber: 15 },
      { name: "L'Agenda", pageNumber: 16 },
      { name: 'Le Plastique', pageNumber: 17 },
      { name: 'The Keys', pageNumber: 18 },
      { name: 'Keyboard Park', pageNumber: 19 },
    ],
  },
  {
    number: 4,
    illustration: 'compass',
    items: [
      { name: 'The Cutting Board', pageNumber: 20 },
      { name: 'Black Trombone - Gainsbourg', pageNumber: 21 },
      { name: 'Le Taille Crayon', pageNumber: 22 },
      { name: 'Johanna Noack', pageNumber: 23 },
      { name: 'The Categories', pageNumber: 24 },
    ],
  },
  {
    number: 5,
    illustration: 'scissors',
    items: [
      { name: 'Aces to Aces', pageNumber: 25 },
      { name: 'Matières et Mikado', pageNumber: 26 },
      { name: 'Black Details', pageNumber: 27 },
      { name: 'Dactylo', pageNumber: 28 },
      { name: '[blank]', pageNumber: 29 },
    ],
  },
  {
    number: 6,
    illustration: 'clock',
    items: [
      { name: 'Chocolat 85%', pageNumber: 30 },
      { name: 'The colors of Category', pageNumber: 31 },
      { name: 'I Talk to the Wind', pageNumber: 32 },
      { name: 'Esthétique - G.F Hegel', pageNumber: 33 },
      { name: 'About Money', pageNumber: 34 },
      { name: 'Golden Hours - B.Eno', pageNumber: 35 },
      { name: 'Draft Morning', pageNumber: 36 },
      { name: 'International Accents', pageNumber: 37 },
      { name: 'V and J Routine', pageNumber: 38 },
      { name: 'Le Normographe', pageNumber: 39 },
      { name: 'Index', pageNumber: 40 },
    ],
  },
];

// SVG Illustrations
const BookStack = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16">
    <rect x="15" y="20" width="20" height="50" fill="#8B7355" />
    <rect x="20" y="18" width="20" height="50" fill="#A0826D" />
    <rect x="25" y="16" width="20" height="50" fill="#B89968" />
    <line x1="15" y1="25" x2="35" y2="25" stroke="#F5F0E8" strokeWidth="1" />
    <line x1="20" y1="23" x2="40" y2="23" stroke="#F5F0E8" strokeWidth="1" />
    <line x1="25" y1="21" x2="45" y2="21" stroke="#F5F0E8" strokeWidth="1" />
  </svg>
);

const Pencil = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16">
    <rect x="35" y="10" width="30" height="65" fill="#F4D03F" />
    <polygon points="50,80 40,75 60,75" fill="#8B4513" />
    <rect x="45" y="20" width="10" height="50" fill="#2C3E50" />
    <circle cx="50" cy="15" r="4" fill="#D4A017" />
  </svg>
);

const Keys = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16">
    <rect x="20" y="35" width="50" height="8" fill="#D4A017" />
    <circle cx="35" cy="39" r="8" fill="#FFD700" stroke="#D4A017" strokeWidth="1.5" />
    <circle cx="55" cy="39" r="8" fill="#FFD700" stroke="#D4A017" strokeWidth="1.5" />
    <circle cx="75" cy="39" r="7" fill="#FFD700" stroke="#D4A017" strokeWidth="1.5" />
    <rect x="60" y="22" width="3" height="20" fill="#D4A017" />
  </svg>
);

const Compass = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16">
    <circle cx="50" cy="50" r="35" fill="none" stroke="#2C3E50" strokeWidth="2" />
    <circle cx="50" cy="50" r="30" fill="none" stroke="#95A5A6" strokeWidth="1" />
    <line x1="50" y1="20" x2="50" y2="80" stroke="#2C3E50" strokeWidth="1.5" />
    <line x1="20" y1="50" x2="80" y2="50" stroke="#2C3E50" strokeWidth="1.5" />
    <polygon points="50,25 45,35 55,35" fill="#E74C3C" />
    <polygon points="50,75 45,65 55,65" fill="#2C3E50" />
  </svg>
);

const Scissors = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16">
    <circle cx="30" cy="30" r="8" fill="none" stroke="#95A5A6" strokeWidth="2" />
    <circle cx="70" cy="30" r="8" fill="none" stroke="#95A5A6" strokeWidth="2" />
    <line x1="38" y1="30" x2="62" y2="30" stroke="#95A5A6" strokeWidth="2" />
    <line x1="50" y1="38" x2="35" y2="75" stroke="#95A5A6" strokeWidth="2" />
    <line x1="50" y1="38" x2="65" y2="75" stroke="#95A5A6" strokeWidth="2" />
    <circle cx="35" cy="78" r="3" fill="#95A5A6" />
    <circle cx="65" cy="78" r="3" fill="#95A5A6" />
  </svg>
);

const Clock = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16">
    <circle cx="50" cy="50" r="35" fill="#ECF0F1" stroke="#2C3E50" strokeWidth="2" />
    <circle cx="50" cy="50" r="3" fill="#2C3E50" />
    <line x1="50" y1="50" x2="50" y2="25" stroke="#2C3E50" strokeWidth="2.5" />
    <line x1="50" y1="50" x2="65" y2="50" stroke="#2C3E50" strokeWidth="2" />
    <circle cx="50" cy="18" r="2" fill="#2C3E50" />
    <circle cx="82" cy="50" r="2" fill="#2C3E50" />
    <circle cx="50" cy="82" r="2" fill="#2C3E50" />
    <circle cx="18" cy="50" r="2" fill="#2C3E50" />
  </svg>
);

const IllustrationComponent = ({ type }: { type: string }) => {
  switch (type) {
    case 'books':
      return <BookStack />;
    case 'pencil':
      return <Pencil />;
    case 'keys':
      return <Keys />;
    case 'compass':
      return <Compass />;
    case 'scissors':
      return <Scissors />;
    case 'clock':
      return <Clock />;
    default:
      return null;
  }
};

const DottedLeader = ({ length }: { length: number }) => {
  const dots = Math.floor(length / 3);
  return (
    <span className="flex-1 flex items-center">
      {Array.from({ length: Math.max(dots, 2) }).map((_, i) => (
        <span key={i} className="mx-0.5 text-gray-400">
          •
        </span>
      ))}
    </span>
  );
};

const DottedVerticalLine = ({ height = 200 }: { height?: number }) => {
  const dots = Math.floor(height / 8);
  return (
    <div className="flex flex-col items-center justify-between absolute left-1/2 transform -translate-x-1/2 pointer-events-none" style={{ height }}>
      {Array.from({ length: dots }).map((_, i) => (
        <div key={i} className="w-1 h-1 rounded-full bg-gray-300" />
      ))}
    </div>
  );
};

const CategoryItemComponent = ({
  item,
  itemId,
  dragState,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  isHovered,
  onHoverChange,
}: {
  item: CategoryItem;
  itemId: string;
  dragState: DragState | null;
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: (e: React.PointerEvent) => void;
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
}) => {
  const isDragging = dragState?.id === itemId;
  const offsetX = isDragging ? dragState!.x : 0;
  const offsetY = isDragging ? dragState!.y : 0;

  return (
    <div
      className={`
        flex items-center gap-2 py-1 px-2 rounded cursor-grab transition-colors duration-150
        ${isHovered ? 'bg-amber-100 bg-opacity-40' : 'hover:bg-amber-50 hover:bg-opacity-20'}
        ${isDragging ? 'cursor-grabbing shadow-md' : ''}
      `}
      style={{
        transform: `translate(${offsetX}px, ${offsetY}px)`,
        transition: isDragging ? 'none' : 'transform 0.1s ease-out',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      <span className="text-xs font-serif text-gray-700 whitespace-nowrap">{item.name}</span>
      <DottedLeader length={40} />
      <span className="text-xs font-serif text-gray-500 font-semibold ml-1 flex-shrink-0 w-8 text-right">
        {item.pageNumber}
      </span>
    </div>
  );
};

export default function CategorySpecimen() {
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [hoveredColumnNumber, setHoveredColumnNumber] = useState<number | null>(null);

  const handlePointerDown = (e: React.PointerEvent, itemId: string) => {
    e.preventDefault();
    setDragState({
      id: itemId,
      x: 0,
      y: 0,
      startX: e.clientX,
      startY: e.clientY,
    });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState) return;

    const deltaX = e.clientX - dragState.startX;
    const deltaY = e.clientY - dragState.startY;

    setDragState((prev) =>
      prev
        ? {
            ...prev,
            x: deltaX,
            y: deltaY,
          }
        : null
    );
  };

  const handlePointerUp = () => {
    setDragState(null);
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-16">
          <h1 className="text-3xl font-serif text-gray-900">Table of Contents</h1>
          <h2 className="text-3xl font-serif text-gray-900">Category Specimen</h2>
        </div>

        {/* Grid of Columns */}
        <div className="grid grid-cols-6 gap-6 relative">
          {CATEGORIES.map((category, colIndex) => (
            <div
              key={category.number}
              className={`
                relative transition-all duration-200
                ${hoveredColumnNumber === category.number ? 'opacity-100' : 'opacity-100'}
              `}
              onMouseEnter={() => setHoveredColumnNumber(category.number)}
              onMouseLeave={() => setHoveredColumnNumber(null)}
            >
              {/* Subtle column highlight on hover */}
              <div
                className={`
                  absolute inset-0 rounded-lg transition-opacity duration-200 pointer-events-none
                  ${hoveredColumnNumber === category.number ? 'bg-amber-50 opacity-30' : 'opacity-0'}
                `}
              />

              {/* Column content */}
              <div className="relative z-10">
                {/* Category Number */}
                <div className="text-center mb-8">
                  <div className="text-6xl font-serif font-black text-gray-900 leading-none">
                    {category.number}
                  </div>
                </div>

                {/* Dotted vertical line - background */}
                <div className="mb-8">
                  <DottedVerticalLine height={300} />
                </div>

                {/* Illustration with float animation */}
                <div className="flex justify-center mb-8 animate-pulse" style={{
                  animation: 'float 3s ease-in-out infinite',
                }}>
                  <div className="relative">
                    <IllustrationComponent type={category.illustration} />
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-1">
                  {category.items.map((item, itemIndex) => {
                    const itemId = `${category.number}-${itemIndex}`;
                    const isHovered = hoveredItemId === itemId;

                    return (
                      <CategoryItemComponent
                        key={itemId}
                        item={item}
                        itemId={itemId}
                        dragState={dragState}
                        onPointerDown={(e) => handlePointerDown(e, itemId)}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        isHovered={isHovered}
                        onHoverChange={(hovered) =>
                          setHoveredItemId(hovered ? itemId : null)
                        }
                      />
                    );
                  })}
                </div>
              </div>

              {/* Vertical separator (subtle dotted line between columns) */}
              {colIndex < CATEGORIES.length - 1 && (
                <div className="absolute right-0 top-0 bottom-0 w-px">
                  <div className="h-full flex flex-col items-center justify-between opacity-20 pointer-events-none">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} className="w-0.5 h-0.5 rounded-full bg-gray-400" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Float animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </div>
  );
}
