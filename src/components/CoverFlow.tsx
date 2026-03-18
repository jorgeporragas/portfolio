"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";

export interface AudioProject {
  id: string;
  title: string;
  artist: string;
  description: string;
  coverImage: string;
  platformUrl?: string;
  tags: string[];
}

// --------------------------------------------------------
// 1. SUB-COMPONENTE: El "Cerebro" individual de cada disco
// --------------------------------------------------------
function CoverItem({ 
  project, 
  index, 
  activeIndex, 
  setActiveIndex 
}: { 
  project: AudioProject; 
  index: number; 
  activeIndex: number; 
  setActiveIndex: (idx: number) => void;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const offset = index - activeIndex;
  const isActive = offset === 0;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const force = 9;
    const deltaX = (centerX - e.clientX) / (rect.width / 2);
    const deltaY = (centerY - e.clientY) / (rect.height / 2);

    setPosition({ x: deltaX * force, y: deltaY * force });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onClick={() => setActiveIndex(index)}
      animate={{
        x: offset * 160,
        rotateY: isActive ? 0 : offset > 0 ? -40 : 40,
        scale: isActive ? 1 : 0.75,
        opacity: Math.abs(offset) > 2 ? 0 : isActive ? 1 : 0.4,
        zIndex: 10 - Math.abs(offset),
      }}
      whileHover={{ scale: isActive ? 1.05 : 0.8 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      // 1. Le quitamos el shadow y transition-shadow a este contenedor
      className="absolute w-64 h-64 md:w-80 md:h-80 rounded-xl cursor-pointer"
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        // 2. Le pasamos el shadow a este div interior, para que brille MIENTRAS se mueve
        className={`w-full h-full rounded-xl overflow-hidden transition-all duration-150 ease-out ${
          isActive 
            ? "shadow-[0_0_40px_rgba(153,170,255,0.2)] hover:shadow-[0_0_90px_rgba(153,170,255,1)]" 
            : "hover:shadow-[0_0_30px_rgba(153,170,255,0.4)]"
        }`}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        <div 
          className="w-full h-full flex items-center justify-center border border-white/10 transition-colors"
          style={{ backgroundColor: project.coverImage }}
        >
          {!isActive && <div className="absolute inset-0 bg-black/40" />}
        </div>
      </div>
    </motion.div>
  );
}

// --------------------------------------------------------
// 3. COMPONENTE PRINCIPAL: El Escenario
// --------------------------------------------------------
interface CoverFlowProps {
  projects: AudioProject[];
}

export default function CoverFlow({ projects }: CoverFlowProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Escenario 3D */}
      <div 
        className="relative w-full max-w-4xl h-[400px] flex justify-center items-center"
        style={{ perspective: 1000 }} 
      >
        {projects.map((project, index) => (
          <CoverItem 
            key={project.id}
            project={project}
            index={index}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        ))}
      </div>

      {/* Información del Disco Activo */}
      <motion.div 
        key={activeIndex} 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 text-center max-w-2xl flex flex-col items-center gap-4"
      >
        <div>
          <h2 className="text-3xl font-medium text-white mb-1">
            {projects[activeIndex].title}
          </h2>
          <p className="text-[#99aaff] tracking-widest text-sm uppercase">
            {projects[activeIndex].artist}
          </p>
        </div>
        
        <p className="text-gray-400 text-sm leading-relaxed">
          {projects[activeIndex].description}
        </p>

        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {projects[activeIndex].tags.map((tag, idx) => (
            <span 
              key={idx} 
              className="px-3 py-1 text-xs tracking-wider text-gray-400 bg-white/5 border border-white/10 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

    </div>
  );
}