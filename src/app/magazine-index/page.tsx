'use client';

import { useRef, useState, useEffect } from 'react';

interface Article {
  id: string;
  number: string;
  title: React.ReactNode;
  tags: string[];
  imageColor: string;
  imageGradient: string;
  side: 'left' | 'right';
  x: number;
  y: number;
}

const articles: Article[] = [
  // LEFT PAGE
  {
    id: 'article-1',
    number: '12',
    title: (
      <>
        ALL MY <span className="italic font-light">FRIENDS</span>{' '}
        <span className="font-serif font-bold">DIED</span> OF{' '}
        <span className="font-bold">AIDS</span>
      </>
    ),
    tags: ['SOCIAL MEDIA', 'TEENAGERS'],
    imageColor: 'from-rose-300 to-pink-400',
    imageGradient: 'from-rose-200 to-red-300',
    side: 'left',
    x: 40,
    y: 60,
  },
  {
    id: 'article-2',
    number: '14',
    title: (
      <>
        HOW TO <span className="font-serif">RAISE</span> YOUR{' '}
        <span className="font-bold">KIDS</span> AND THEIR{' '}
        <span className="italic">FOLLOWERS</span>
      </>
    ),
    tags: ['OPINION'],
    imageColor: 'from-amber-200 to-yellow-300',
    imageGradient: 'from-yellow-100 to-orange-200',
    side: 'left',
    x: 280,
    y: 140,
  },
  {
    id: 'article-3',
    number: '28',
    title: (
      <>
        <span className="font-bold">THE WEED</span> THAT{' '}
        <span className="font-serif italic">WON</span> THE{' '}
        <span className="font-bold">WEST</span>
      </>
    ),
    tags: ['FASHION', 'ARTICLE'],
    imageColor: 'from-emerald-300 to-teal-400',
    imageGradient: 'from-green-200 to-emerald-300',
    side: 'left',
    x: 120,
    y: 280,
  },
  {
    id: 'article-4',
    number: '24',
    title: (
      <>
        <span className="font-serif">CROCS</span> CAN{' '}
        <span className="font-bold italic">SET</span> YOU{' '}
        <span className="font-bold">FREE</span>
      </>
    ),
    tags: ['OPINION', 'INTRO'],
    imageColor: 'from-cyan-300 to-blue-400',
    imageGradient: 'from-blue-200 to-cyan-300',
    side: 'left',
    x: 320,
    y: 340,
  },
  {
    id: 'article-5',
    number: '46',
    title: (
      <>
        WOULD YOU <span className="font-serif bold">LET</span> AI{' '}
        <span className="italic">CURE</span> <span className="font-bold">YOU?</span>
      </>
    ),
    tags: ['ART', 'ESSAY', 'ARCHITECTURE'],
    imageColor: 'from-indigo-300 to-purple-400',
    imageGradient: 'from-purple-200 to-indigo-300',
    side: 'left',
    x: 80,
    y: 420,
  },
  {
    id: 'article-6',
    number: '36',
    title: (
      <>
        <span className="font-bold">EXPLODING</span>{' '}
        <span className="font-serif italic">MONUMENTS</span>
      </>
    ),
    tags: ['PHOTOGRAPHS'],
    imageColor: 'from-fuchsia-300 to-pink-400',
    imageGradient: 'from-pink-200 to-rose-300',
    side: 'left',
    x: 260,
    y: 480,
  },

  // RIGHT PAGE
  {
    id: 'article-7',
    number: '58',
    title: (
      <>
        SIX <span className="font-serif">INTERIOR</span> DESIGN{' '}
        <span className="font-bold italic">RED</span>{' '}
        <span className="font-bold">FLAGS</span>
      </>
    ),
    tags: ['COLLECTION', 'HOLIDAYS'],
    imageColor: 'from-orange-300 to-red-400',
    imageGradient: 'from-orange-200 to-red-300',
    side: 'right',
    x: 680,
    y: 80,
  },
  {
    id: 'article-8',
    number: '72',
    title: (
      <>
        <span className="italic">HOLA</span>,{' '}
        <span className="font-bold">ADIÓS</span>, THE{' '}
        <span className="font-serif">AIRBNB</span> <span className="font-bold">ERA</span>
      </>
    ),
    tags: ['INTERVIEW', 'DOMESTIC'],
    imageColor: 'from-violet-300 to-purple-400',
    imageGradient: 'from-violet-200 to-purple-300',
    side: 'right',
    x: 520,
    y: 160,
  },
  {
    id: 'article-9',
    number: '90',
    title: (
      <>
        EVERY <span className="font-serif bold">TEMPLE</span> NEEDS ITS{' '}
        <span className="italic">SACRIFICES</span>
      </>
    ),
    tags: ['PHOTOGRAPHS', 'BODY'],
    imageColor: 'from-red-300 to-rose-400',
    imageGradient: 'from-red-200 to-pink-300',
    side: 'right',
    x: 750,
    y: 300,
  },
  {
    id: 'article-10',
    number: '64',
    title: (
      <>
        <span className="font-bold">LIFE</span> AS A{' '}
        <span className="font-serif italic">VICTIM</span> OF{' '}
        <span className="font-bold">REVENGE</span> <span className="italic">PORN</span>
      </>
    ),
    tags: ['OPINION', 'RELIGION', 'DRUGS'],
    imageColor: 'from-slate-400 to-gray-500',
    imageGradient: 'from-gray-300 to-slate-400',
    side: 'right',
    x: 560,
    y: 420,
  },
  {
    id: 'article-11',
    number: '94',
    title: (
      <>
        <span className="font-serif">THE</span>{' '}
        <span className="font-bold italic">BEAUTY</span> OR THE{' '}
        <span className="font-bold">BEAST?</span>
      </>
    ),
    tags: ['ARTICLE'],
    imageColor: 'from-lime-300 to-green-400',
    imageGradient: 'from-lime-200 to-green-300',
    side: 'right',
    x: 680,
    y: 500,
  },
  {
    id: 'article-12',
    number: '102',
    title: (
      <>
        <span className="font-bold">BERT</span> AND{' '}
        <span className="font-serif italic">EXTRA</span> HEAD BY{' '}
        <span className="font-bold">VERA</span> <span className="font-serif">BEKEMA</span>
      </>
    ),
    tags: ['ANIMALS', 'BIODIVERSITY'],
    imageColor: 'from-orange-400 to-yellow-500',
    imageGradient: 'from-yellow-300 to-orange-400',
    side: 'right',
    x: 520,
    y: 560,
  },
];

interface DraggingState {
  articleId: string;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

interface ArticlePosition {
  translateX: number;
  translateY: number;
  rotation: number;
}

export default function MagazineIndex() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<DraggingState | null>(null);
  const [positions, setPositions] = useState<Map<string, ArticlePosition>>(
    new Map()
  );
  const [zIndices, setZIndices] = useState<Map<string, number>>(new Map());
  const velocityRef = useRef<Map<string, { vx: number; vy: number }>>(
    new Map()
  );
  const animationRef = useRef<number | null>(null);
  const maxZIndexRef = useRef(10);

  // Initialize positions
  useEffect(() => {
    const initialPositions = new Map<string, ArticlePosition>();
    articles.forEach((article) => {
      initialPositions.set(article.id, {
        translateX: 0,
        translateY: 0,
        rotation: (Math.random() - 0.5) * 4,
      });
    });
    setPositions(initialPositions);

    const initialZIndices = new Map<string, number>();
    articles.forEach((article, index) => {
      initialZIndices.set(article.id, index);
    });
    setZIndices(initialZIndices);
  }, []);

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    articleId: string
  ) => {
    e.preventDefault();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

    maxZIndexRef.current += 1;
    setZIndices((prev) => new Map(prev).set(articleId, maxZIndexRef.current));

    setDragging({
      articleId,
      startX: e.clientX - rect.left,
      startY: e.clientY - rect.top,
      currentX: e.clientX - rect.left,
      currentY: e.clientY - rect.top,
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const deltaX = currentX - dragging.currentX;
    const deltaY = currentY - dragging.currentY;

    setDragging((prev) =>
      prev
        ? { ...prev, currentX, currentY }
        : null
    );

    setPositions((prev) => {
      const newPositions = new Map(prev);
      const current = newPositions.get(dragging.articleId);
      if (current) {
        newPositions.set(dragging.articleId, {
          ...current,
          translateX: current.translateX + deltaX,
          translateY: current.translateY + deltaY,
        });
      }
      return newPositions;
    });

    velocityRef.current.set(dragging.articleId, {
      vx: deltaX,
      vy: deltaY,
    });
  };

  const handlePointerUp = () => {
    if (!dragging) return;

    const velocity = velocityRef.current.get(dragging.articleId) || {
      vx: 0,
      vy: 0,
    };

    let vx = velocity.vx;
    let vy = velocity.vy;
    const damping = 0.92;

    const animate = () => {
      if (Math.abs(vx) < 0.1 && Math.abs(vy) < 0.1) {
        setDragging(null);
        animationRef.current = null;
        return;
      }

      vx *= damping;
      vy *= damping;

      setPositions((prev) => {
        const newPositions = new Map(prev);
        const current = newPositions.get(dragging.articleId);
        if (current) {
          newPositions.set(dragging.articleId, {
            ...current,
            translateX: current.translateX + vx,
            translateY: current.translateY + vy,
          });
        }
        return newPositions;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-yellow-50 to-amber-50 p-8 flex items-center justify-center overflow-hidden">
      {/* Page Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-6xl aspect-[1.4/1] rounded-lg shadow-2xl overflow-hidden"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{
          background:
            'linear-gradient(to right, #f5f1ed 0%, #f5f1ed 47%, #e8e4df 48%, #e8e4df 49%, #f5f1ed 50%, #f5f1ed 100%)',
        }}
      >
        {/* Center Spine */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300 transform -translate-x-1/2 z-20 shadow-md" />

        {/* Left Page Background */}
        <div className="absolute left-0 top-0 w-1/2 h-full opacity-30">
          <div className="w-full h-full border-r-2 border-gray-200" />
        </div>

        {/* Right Page Background */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-30">
          <div className="w-full h-full border-l-2 border-gray-200" />
        </div>

        {/* Articles */}
        {articles.map((article) => {
          const position = positions.get(article.id) || {
            translateX: 0,
            translateY: 0,
            rotation: 0,
          };
          const zIndex = zIndices.get(article.id) || 1;

          return (
            <div
              key={article.id}
              className="absolute group cursor-grab active:cursor-grabbing"
              style={{
                left: `${article.x}px`,
                top: `${article.y}px`,
                transform: `translate(${position.translateX}px, ${position.translateY}px) rotate(${position.rotation}deg)`,
                zIndex,
                touchAction: 'none',
              }}
              onPointerDown={(e) => handlePointerDown(e, article.id)}
              onPointerMove={(e) => e.stopPropagation()}
            >
              {/* Article Card */}
              <div className="bg-white rounded-sm shadow-lg p-3 w-64 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex gap-3">
                  {/* Left: Article Number & Thumbnail */}
                  <div className="flex flex-col gap-2">
                    {/* Article Number */}
                    <div
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg group-hover:shadow-lg group-hover:scale-110 transition-all duration-200"
                      style={{
                        animation:
                          'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                      }}
                    >
                      {article.number}
                    </div>

                    {/* Thumbnail Image */}
                    <div
                      className={`w-16 h-16 rounded-sm bg-gradient-to-br ${article.imageGradient} shadow-md hover:shadow-lg transition-shadow cursor-move`}
                    />
                  </div>

                  {/* Right: Content */}
                  <div className="flex-1">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-bold px-2 py-1 border border-gray-400 rounded-full text-gray-700 hover:bg-gray-900 hover:text-white hover:scale-105 transition-all duration-150 cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Headline */}
                    <h2 className="text-sm font-bold leading-tight text-gray-900 tracking-tight">
                      {article.title}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CSS for pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7);
          }
          50% {
            opacity: 0.8;
          }
          75% {
            box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
          }
        }
      `}</style>
    </div>
  );
}
