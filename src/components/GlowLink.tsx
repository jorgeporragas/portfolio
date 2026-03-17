"use client";

import Link from "next/link";
import { useState, useRef, MouseEvent, ReactNode } from "react";

interface GlowLinkProps {
  href: string;
  children: ReactNode; // Cambiamos Icon por children
  label?: string;
}

export default function GlowLink({ href, children, label }: GlowLinkProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const force = 15;
    const deltaX = (centerX - e.clientX) / (rect.width / 2);
    const deltaY = (centerY - e.clientY) / (rect.height / 2);

    setPosition({ x: deltaX * force, y: deltaY * force });
  };

  const handleMouseLeave = () => {
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
      <div className="flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-110 group-hover:drop-shadow-[0_0_80px_rgba(153,170,255,0.7)] group-hover:text-[#99aaff]">
        
        <div
          className="transition-transform duration-150 ease-out"
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        >
          {/* Aquí renderizamos lo que sea que le pasemos adentro al componente */}
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