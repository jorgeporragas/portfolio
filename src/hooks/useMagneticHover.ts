// src/hooks/useMagneticHover.ts
import { useState, useRef, MouseEvent } from "react";

// Generic over the element type so each caller gets a correctly typed ref for its element.
export function useMagneticHover<T extends HTMLElement>(force: number = 9) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef<T>(null);

  const handleMouseMove = (e: MouseEvent) => {
    setIsHovering(true);
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (centerX - e.clientX) / (rect.width / 2);
    const deltaY = (centerY - e.clientY) / (rect.height / 2);

    setPosition({ x: deltaX * force, y: deltaY * force });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setPosition({ x: 0, y: 0 });
  };

  return { position, isHovering, ref, handleMouseMove, handleMouseLeave };
}