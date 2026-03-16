"use client";

import { useState, useRef, useCallback } from "react";

let globalZIndex = 1;

interface UsPhysicsDragReturn {
  x: number;
  y: number;
  isDragging: boolean;
  zIndex: number;
  rotation: number;
  handlers: {
    onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  };
}

export function usePhysicsDrag(
  initialX: number = 0,
  initialY: number = 0
): UsPhysicsDragReturn {
  const [x, setX] = useState(initialX);
  const [y, setY] = useState(initialY);
  const [isDragging, setIsDragging] = useState(false);
  const [zIndex, setZIndex] = useState(1);
  const [rotation, setRotation] = useState(0);

  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const currentX = useRef(initialX);
  const currentY = useRef(initialY);
  const velocityX = useRef(0);
  const velocityY = useRef(0);
  const momentumFrameId = useRef<number | null>(null);
  const lastPointerX = useRef(0);
  const lastPointerY = useRef(0);

  const applyMomentum = useCallback(() => {
    if (momentumFrameId.current !== null) {
      cancelAnimationFrame(momentumFrameId.current);
    }

    const frame = () => {
      const damping = 0.92;
      velocityX.current *= damping;
      velocityY.current *= damping;

      // Stop momentum when velocity is very small
      if (
        Math.abs(velocityX.current) < 0.5 &&
        Math.abs(velocityY.current) < 0.5
      ) {
        setRotation(0);
        return;
      }

      currentX.current += velocityX.current;
      currentY.current += velocityY.current;

      setX(currentX.current);
      setY(currentY.current);

      // Apply slight rotation based on horizontal velocity
      const maxRotation = 8;
      const rotationAmount = Math.max(
        -maxRotation,
        Math.min(maxRotation, velocityX.current * 0.5)
      );
      setRotation(rotationAmount);

      momentumFrameId.current = requestAnimationFrame(frame);
    };

    momentumFrameId.current = requestAnimationFrame(frame);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      setIsDragging(true);
      setZIndex(++globalZIndex);

      dragStartX.current = e.clientX;
      dragStartY.current = e.clientY;
      lastPointerX.current = e.clientX;
      lastPointerY.current = e.clientY;

      velocityX.current = 0;
      velocityY.current = 0;

      if (momentumFrameId.current !== null) {
        cancelAnimationFrame(momentumFrameId.current);
        momentumFrameId.current = null;
      }

      const handlePointerMove = (moveEvent: PointerEvent) => {
        const deltaX = moveEvent.clientX - dragStartX.current;
        const deltaY = moveEvent.clientY - dragStartY.current;

        // Calculate velocity
        velocityX.current = moveEvent.clientX - lastPointerX.current;
        velocityY.current = moveEvent.clientY - lastPointerY.current;

        lastPointerX.current = moveEvent.clientX;
        lastPointerY.current = moveEvent.clientY;

        currentX.current = initialX + deltaX;
        currentY.current = initialY + deltaY;

        setX(currentX.current);
        setY(currentY.current);

        // Apply rotation during drag
        const maxRotation = 8;
        const rotationAmount = Math.max(
          -maxRotation,
          Math.min(maxRotation, velocityX.current * 0.5)
        );
        setRotation(rotationAmount);
      };

      const handlePointerUp = () => {
        setIsDragging(false);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);

        applyMomentum();
      };

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    },
    [initialX, initialY, applyMomentum]
  );

  return {
    x,
    y,
    isDragging,
    zIndex,
    rotation,
    handlers: {
      onPointerDown: handlePointerDown,
    },
  };
}
