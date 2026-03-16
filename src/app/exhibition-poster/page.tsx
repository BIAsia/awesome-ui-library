'use client';

import React, { useState, useRef, useEffect } from 'react';

interface ShapePosition {
  x: number;
  y: number;
  rotation: number;
}

interface ShapeState {
  [key: string]: ShapePosition;
}

interface Velocity {
  x: number;
  y: number;
}

const ExhibitionPoster = () => {
  const [shapePositions, setShapePositions] = useState<ShapeState>({
    starburst1: { x: 0, y: 0, rotation: 0 },
    starburst2: { x: 0, y: 0, rotation: 0 },
    speechBubble: { x: 0, y: 0, rotation: 0 },
    cloudBubble: { x: 0, y: 0, rotation: 0 },
    squiggle: { x: 0, y: 0, rotation: 0 },
    rectangle: { x: 0, y: 0, rotation: 0 },
  });

  const [draggingShape, setDraggingShape] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [zIndices, setZIndices] = useState({
    starburst1: 1,
    starburst2: 1,
    speechBubble: 1,
    cloudBubble: 1,
    squiggle: 1,
    rectangle: 1,
  });

  const velocityRef = useRef<{ [key: string]: Velocity }>({});
  const lastPosRef = useRef<{ [key: string]: { x: number; y: number } }>({});
  const animationFrameRef = useRef<number>();
  const posterRef = useRef<HTMLDivElement>(null);

  // Initialize velocities
  useEffect(() => {
    Object.keys(shapePositions).forEach((key) => {
      velocityRef.current[key] = { x: 0, y: 0 };
      lastPosRef.current[key] = { x: 0, y: 0 };
    });
  }, []);

  // Apply momentum/inertia
  useEffect(() => {
    const applyMomentum = () => {
      if (draggingShape) {
        animationFrameRef.current = requestAnimationFrame(applyMomentum);
        return;
      }

      let hasMovement = false;

      setShapePositions((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((key) => {
          const vel = velocityRef.current[key];
          if (Math.abs(vel.x) > 0.1 || Math.abs(vel.y) > 0.1) {
            updated[key] = {
              ...updated[key],
              x: updated[key].x + vel.x,
              y: updated[key].y + vel.y,
            };
            vel.x *= 0.92;
            vel.y *= 0.92;
            hasMovement = true;
          }
        });
        return updated;
      });

      if (hasMovement) {
        animationFrameRef.current = requestAnimationFrame(applyMomentum);
      }
    };

    animationFrameRef.current = requestAnimationFrame(applyMomentum);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [draggingShape]);

  const handleMouseDown = (shapeId: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (!posterRef.current) return;

    const rect = posterRef.current.getBoundingClientRect();
    const currentPos = shapePositions[shapeId];
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setDragOffset({
      x: mouseX - currentPos.x,
      y: mouseY - currentPos.y,
    });

    setDraggingShape(shapeId);

    // Bring to front
    setZIndices((prev) => {
      const maxZ = Math.max(...Object.values(prev));
      return { ...prev, [shapeId]: maxZ + 1 };
    });

    // Reset velocity on drag start
    velocityRef.current[shapeId] = { x: 0, y: 0 };
    lastPosRef.current[shapeId] = { x: currentPos.x, y: currentPos.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingShape || !posterRef.current) return;

    const rect = posterRef.current.getBoundingClientRect();
    const newX = e.clientX - rect.left - dragOffset.x;
    const newY = e.clientY - rect.top - dragOffset.y;

    setShapePositions((prev) => ({
      ...prev,
      [draggingShape]: {
        ...prev[draggingShape],
        x: newX,
        y: newY,
      },
    }));

    // Calculate velocity
    const lastPos = lastPosRef.current[draggingShape];
    velocityRef.current[draggingShape] = {
      x: newX - lastPos.x,
      y: newY - lastPos.y,
    };
    lastPosRef.current[draggingShape] = { x: newX, y: newY };
  };

  const handleMouseUp = () => {
    setDraggingShape(null);
  };

  return (
    <div className="min-h-screen bg-white text-red-600 flex items-center justify-center p-4">
      <div
        ref={posterRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative w-full max-w-4xl aspect-video bg-white rounded-lg overflow-hidden"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(248,187,208,0.05) 0%, transparent 50%)' }}
      >
        {/* Red diagonal scribble lines with animation */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ mixBlendMode: 'multiply' }}
        >
          <defs>
            <style>{`
              @keyframes drawLine {
                from {
                  stroke-dashoffset: 500;
                }
                to {
                  stroke-dashoffset: 0;
                }
              }
              .animated-line {
                animation: drawLine 2s ease-out forwards;
              }
            `}</style>
          </defs>
          <path
            d="M -50 100 L 300 -50"
            stroke="#E53935"
            strokeWidth="3"
            fill="none"
            strokeDasharray="500"
            className="animated-line"
            style={{ animationDelay: '0s' }}
          />
          <path
            d="M 600 50 L 850 400"
            stroke="#E53935"
            strokeWidth="2.5"
            fill="none"
            strokeDasharray="500"
            className="animated-line"
            style={{ animationDelay: '0.2s' }}
          />
          <path
            d="M 100 500 L 400 150"
            stroke="#E53935"
            strokeWidth="3"
            fill="none"
            strokeDasharray="500"
            className="animated-line"
            style={{ animationDelay: '0.4s' }}
          />
          <path
            d="M 700 600 L 950 200"
            stroke="#E53935"
            strokeWidth="2"
            fill="none"
            strokeDasharray="500"
            className="animated-line"
            style={{ animationDelay: '0.6s' }}
          />
        </svg>

        {/* Artist Names - Large Bold Uppercase */}
        <div className="absolute top-8 left-6 group cursor-default">
          <h1 className="text-4xl md:text-5xl font-black text-red-600 whitespace-nowrap transition-all duration-300 group-hover:scale-110 group-hover:underline decoration-pink-300 decoration-4">
            JULIE DOUCET
          </h1>
        </div>

        <div className="absolute top-12 right-6 group cursor-default">
          <h1 className="text-4xl md:text-5xl font-black text-red-600 whitespace-nowrap transition-all duration-300 group-hover:scale-110 group-hover:underline decoration-pink-300 decoration-4">
            EMIL FERRIS
          </h1>
        </div>

        <div className="absolute top-1/3 left-4 group cursor-default">
          <h1 className="text-4xl md:text-5xl font-black text-red-600 whitespace-nowrap transition-all duration-300 group-hover:scale-110 group-hover:underline decoration-pink-300 decoration-4">
            CLAIRE BRETÉCHER
          </h1>
        </div>

        <div className="absolute top-1/3 right-4 group cursor-default">
          <h1 className="text-4xl md:text-5xl font-black text-red-600 whitespace-nowrap transition-all duration-300 group-hover:scale-110 group-hover:underline decoration-pink-300 decoration-4">
            MIRION MALLE
          </h1>
        </div>

        <div className="absolute bottom-8 left-6 group cursor-default">
          <h1 className="text-4xl md:text-5xl font-black text-red-600 whitespace-nowrap transition-all duration-300 group-hover:scale-110 group-hover:underline decoration-pink-300 decoration-4">
            LÉONIE BISCHOFF
          </h1>
        </div>

        <div className="absolute bottom-10 right-6 group cursor-default">
          <h1 className="text-4xl md:text-5xl font-black text-red-600 whitespace-nowrap transition-all duration-300 group-hover:scale-110 group-hover:underline decoration-pink-300 decoration-4">
            REBECCA DAUTREMER
          </h1>
        </div>

        {/* Draggable Pink Shapes */}

        {/* Large Starburst */}
        <div
          onMouseDown={(e) => handleMouseDown('starburst1', e)}
          className={`absolute cursor-grab active:cursor-grabbing transition-shadow duration-200 ${
            draggingShape === 'starburst1' ? 'drop-shadow-2xl' : 'drop-shadow-md'
          }`}
          style={{
            transform: `translate(${shapePositions.starburst1.x}px, ${shapePositions.starburst1.y}px) rotate(${shapePositions.starburst1.rotation}deg) scale(1.05)`,
            animation: draggingShape !== 'starburst1' ? 'float 3s ease-in-out infinite' : 'none',
            zIndex: zIndices.starburst1,
            left: '10%',
            top: '35%',
          }}
        >
          <svg viewBox="0 0 100 100" width="100" height="100" className="pointer-events-none">
            <defs>
              <style>{`
                @keyframes float {
                  0%, 100% { transform: scale(1); }
                  50% { transform: scale(1.08); }
                }
              `}</style>
            </defs>
            {/* 8-pointed star starburst */}
            <g fill="#F8BBD0">
              <polygon points="50,10 55,40 90,50 55,60 50,90 45,60 10,50 45,40" />
              <circle cx="50" cy="50" r="20" fill="#F8BBD0" opacity="0.8" />
            </g>
          </svg>
        </div>

        {/* Smaller Starburst */}
        <div
          onMouseDown={(e) => handleMouseDown('starburst2', e)}
          className={`absolute cursor-grab active:cursor-grabbing transition-shadow duration-200 ${
            draggingShape === 'starburst2' ? 'drop-shadow-2xl' : 'drop-shadow-md'
          }`}
          style={{
            transform: `translate(${shapePositions.starburst2.x}px, ${shapePositions.starburst2.y}px) rotate(${shapePositions.starburst2.rotation}deg) scale(1.05)`,
            animation: draggingShape !== 'starburst2' ? 'float 4s ease-in-out infinite 0.5s' : 'none',
            zIndex: zIndices.starburst2,
            right: '15%',
            bottom: '20%',
          }}
        >
          <svg viewBox="0 0 80 80" width="80" height="80" className="pointer-events-none">
            <g fill="#F8BBD0">
              <polygon points="40,8 44,32 72,40 44,48 40,72 36,48 8,40 36,32" />
              <circle cx="40" cy="40" r="15" fill="#F8BBD0" opacity="0.7" />
            </g>
          </svg>
        </div>

        {/* Speech Bubble */}
        <div
          onMouseDown={(e) => handleMouseDown('speechBubble', e)}
          className={`absolute cursor-grab active:cursor-grabbing transition-shadow duration-200 ${
            draggingShape === 'speechBubble' ? 'drop-shadow-2xl' : 'drop-shadow-md'
          }`}
          style={{
            transform: `translate(${shapePositions.speechBubble.x}px, ${shapePositions.speechBubble.y}px) rotate(${shapePositions.speechBubble.rotation}deg) scale(1.05)`,
            animation: draggingShape !== 'speechBubble' ? 'float 3.5s ease-in-out infinite 0.2s' : 'none',
            zIndex: zIndices.speechBubble,
            left: '65%',
            top: '15%',
          }}
        >
          <svg viewBox="0 0 120 90" width="120" height="90" className="pointer-events-none">
            <ellipse cx="60" cy="40" rx="55" ry="35" fill="#F8BBD0" />
            {/* Tail */}
            <polygon points="30,70 20,90 40,75" fill="#F8BBD0" />
          </svg>
        </div>

        {/* Cloud/Thought Bubble */}
        <div
          onMouseDown={(e) => handleMouseDown('cloudBubble', e)}
          className={`absolute cursor-grab active:cursor-grabbing transition-shadow duration-200 ${
            draggingShape === 'cloudBubble' ? 'drop-shadow-2xl' : 'drop-shadow-md'
          }`}
          style={{
            transform: `translate(${shapePositions.cloudBubble.x}px, ${shapePositions.cloudBubble.y}px) rotate(${shapePositions.cloudBubble.rotation}deg) scale(1.05)`,
            animation: draggingShape !== 'cloudBubble' ? 'float 4.2s ease-in-out infinite 0.8s' : 'none',
            zIndex: zIndices.cloudBubble,
            right: '8%',
            top: '50%',
          }}
        >
          <svg viewBox="0 0 130 80" width="130" height="80" className="pointer-events-none">
            <path
              d="M 20 50 Q 10 30 30 20 Q 40 5 60 10 Q 75 0 85 15 Q 100 5 110 20 Q 120 30 115 50 Q 120 60 100 70 Q 70 75 40 70 Q 15 70 20 50"
              fill="#F8BBD0"
            />
            {/* Small circles for thought bubbles */}
            <circle cx="15" cy="65" r="5" fill="#F8BBD0" opacity="0.6" />
            <circle cx="8" cy="72" r="3" fill="#F8BBD0" opacity="0.5" />
          </svg>
        </div>

        {/* Scribble/Squiggle */}
        <div
          onMouseDown={(e) => handleMouseDown('squiggle', e)}
          className={`absolute cursor-grab active:cursor-grabbing transition-shadow duration-200 ${
            draggingShape === 'squiggle' ? 'drop-shadow-2xl' : 'drop-shadow-md'
          }`}
          style={{
            transform: `translate(${shapePositions.squiggle.x}px, ${shapePositions.squiggle.y}px) rotate(${shapePositions.squiggle.rotation}deg) scale(1.05)`,
            animation: draggingShape !== 'squiggle' ? 'float 3.8s ease-in-out infinite 1.1s' : 'none',
            zIndex: zIndices.squiggle,
            left: '20%',
            bottom: '15%',
          }}
        >
          <svg viewBox="0 0 100 50" width="100" height="50" className="pointer-events-none">
            <path
              d="M 0 25 Q 10 10 20 25 T 40 25 T 60 25 T 80 25 T 100 25"
              stroke="#F8BBD0"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 5 35 Q 15 20 25 35 T 45 35 T 65 35 T 85 35 T 100 35"
              stroke="#F8BBD0"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              opacity="0.7"
            />
          </svg>
        </div>

        {/* Rectangle with rough edges */}
        <div
          onMouseDown={(e) => handleMouseDown('rectangle', e)}
          className={`absolute cursor-grab active:cursor-grabbing transition-shadow duration-200 ${
            draggingShape === 'rectangle' ? 'drop-shadow-2xl' : 'drop-shadow-md'
          }`}
          style={{
            transform: `translate(${shapePositions.rectangle.x}px, ${shapePositions.rectangle.y}px) rotate(${shapePositions.rectangle.rotation}deg) scale(1.05)`,
            animation: draggingShape !== 'rectangle' ? 'float 3.3s ease-in-out infinite 0.3s' : 'none',
            zIndex: zIndices.rectangle,
            right: '25%',
            top: '65%',
          }}
        >
          <svg viewBox="0 0 110 70" width="110" height="70" className="pointer-events-none">
            <path
              d="M 5 10 L 100 8 L 105 60 L 8 65 Z"
              fill="#F8BBD0"
              stroke="#F8BBD0"
              strokeWidth="1"
            />
            {/* Rough edge effect */}
            <circle cx="10" cy="12" r="3" fill="#F8BBD0" opacity="0.6" />
            <circle cx="95" cy="15" r="2.5" fill="#F8BBD0" opacity="0.6" />
            <circle cx="102" cy="55" r="2" fill="#F8BBD0" opacity="0.6" />
          </svg>
        </div>

        {/* Small decorative dots and dashes */}
        <div className="absolute pointer-events-none" style={{ left: '5%', top: '20%' }}>
          <svg viewBox="0 0 40 40" width="40" height="40">
            <circle cx="10" cy="10" r="3" fill="#F8BBD0" />
            <circle cx="30" cy="15" r="2" fill="#F8BBD0" opacity="0.7" />
            <line x1="5" y1="30" x2="20" y2="30" stroke="#F8BBD0" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <div className="absolute pointer-events-none" style={{ right: '12%', bottom: '30%' }}>
          <svg viewBox="0 0 40 40" width="40" height="40">
            <circle cx="20" cy="10" r="2.5" fill="#F8BBD0" opacity="0.8" />
            <circle cx="10" cy="25" r="2" fill="#F8BBD0" opacity="0.6" />
            <line x1="15" y1="5" x2="25" y2="5" stroke="#F8BBD0" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          </svg>
        </div>

        {/* Text blocks - centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-8 text-center">
          <p className="text-sm md:text-base text-red-600 font-medium max-w-lg leading-relaxed mb-6">
            Les femmes et la bande dessinée, un lien présent pourtant oublié. Redonnons-leur la visibilité qu'elles méritent.
          </p>

          <p className="text-xs md:text-sm text-red-600 font-semibold max-w-lg mb-4">
            Exposition au Musée d'arts de Nantes en collaboration avec la Maison Fumetti
          </p>

          <p className="text-xs text-red-600 max-w-lg mb-4 opacity-90">
            Ici, les femmes bédéistes du 13 mai au 26 août 2022
          </p>

          <p className="text-xs text-red-600 max-w-lg opacity-80 italic">
            L'exposition a pour but d'explorer l'histoire de la bande dessinée sous un nouvel angle, en mettant en lumière le travail des femmes dessinatrices.
          </p>
        </div>

        {/* Instructions hint */}
        <div className="absolute bottom-3 left-4 text-xs text-red-600 opacity-60">
          💫 Drag the pink shapes
        </div>
      </div>
    </div>
  );
};

export default ExhibitionPoster;
