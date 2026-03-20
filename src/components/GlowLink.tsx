"use client";

import Link from "next/link";
import { useState, useRef, MouseEvent, ReactNode } from "react";
import { useMagneticHover } from "@/hooks/useMagneticHover";

interface GlowLinkProps {
  href: string;
  children: ReactNode;
  label?: string;
  iconSize?: number;
}

export default function GlowLink({ href, children, label }: GlowLinkProps) {
  const { position, isHovering, ref, handleMouseMove, handleMouseLeave } = useMagneticHover(8);

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group flex flex-col items-center gap-6 outline-none text-gray-500"
      style={{ color: "inherit", textDecoration: "none" }}
    >
      {/* 3. El Glow sutil: Cambiamos 90px a 50px y opacidad 1 a 0.5 */}
      <div className="flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-110 group-hover:drop-shadow-[0_0_50px_rgba(153,170,255,0.5)] group-hover:text-[#99aaff]">
        
        <div
          className={`ease-out transition-transform ${
            isHovering ? "duration-150" : "duration-500"
          }`}
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        >
          {children}
        </div>
        
      </div>

      {label && (
        <span className="tracking-widest text-gray-500 group-hover:text-white transition-colors duration-300 text-[clamp(0.875rem,3vw,1.125rem)]">
          {label}
        </span>
      )}
    </Link>
  );
}