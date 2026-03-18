"use client";

import Link from "next/link";
import { useState, useRef, MouseEvent, ReactNode } from "react";

interface GlowLinkProps {
  href: string;
  children: ReactNode;
  label?: string;
}

export default function GlowLink({ href, children, label }: GlowLinkProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    setIsHovering(true); // Encendemos el estado
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const force = 8;
    const deltaX = (centerX - e.clientX) / (rect.width / 2);
    const deltaY = (centerY - e.clientY) / (rect.height / 2);

    setPosition({ x: deltaX * force, y: deltaY * force });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group flex flex-col items-center gap-6 outline-none text-gray-500"
      style={{ color: "inherit", textDecoration: "none" }}
    >
      <div className="flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-110 group-hover:drop-shadow-[0_0_90px_rgba(153,170,255,1)] group-hover:text-[#99aaff]">
        
        {/* 2. Inyectamos la clase dinámica: rápido (75ms) si hay hover, suave (500ms) al salir */}
        <div
          className={`ease-out transition-transform ${
            isHovering ? "duration-200" : "duration-500"
          }`}
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        >
          {children}
        </div>
        
      </div>

      {label && (
        <span className="text-lg tracking-widest text-gray-500 group-hover:text-white transition-colors duration-300">
          {label}
        </span>
      )}
    </Link>
  );
}