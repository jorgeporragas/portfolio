"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Headphones, Radio, PlayCircle } from "lucide-react";

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
// 1. SUB-COMPONENTE: El Disco Individual
// --------------------------------------------------------
function CoverItem({ 
  project, 
  index, 
  activeIndex, 
  setActiveIndex,
  isMenuOpen,
  setIsMenuOpen
}: { 
  project: AudioProject; 
  index: number; 
  activeIndex: number; 
  setActiveIndex: (idx: number) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (val: boolean) => void;
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

  const handleDiskClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (!isActive) {
      setActiveIndex(index);
      setIsMenuOpen(false); 
    } else {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const radialButtons = [
    { id: 'spotify', icon: <Headphones size={20} />, x: 210, y: -110, delay: 0 },
    { id: 'apple', icon: <Radio size={20} />, x: 250, y: 0, delay: 0.05 },
    { id: 'tidal', icon: <PlayCircle size={20} />, x: 210, y: 110, delay: 0.1 },
  ];

  return (
    <motion.div
      ref={ref}
      animate={{
        x: offset * 160,
        rotateY: isActive ? 0 : offset > 0 ? -40 : 40,
        scale: isActive ? 1 : 0.75,
        opacity: Math.abs(offset) > 2 ? 0 : isActive ? 1 : (isMenuOpen ? 0.1 : 0.4),
        zIndex: 10 - Math.abs(offset),
      }}
      // MAGIA 1: Si el menú está abierto, bloqueamos el hover del disco a 'scale: 1'
      whileHover={{ 
        scale: isMenuOpen 
          ? (isActive ? 1 : 0.75) // Si está en Focus Mode, conservan su tamaño base estricto
          : (isActive ? 1.05 : 0.8) // Si está normal, reaccionan al mouse
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="absolute w-64 h-64 md:w-80 md:h-80 rounded-xl flex items-center justify-center"
    >
      
      {/* EL MENÚ RADIAL */}
      <AnimatePresence>
        {isMenuOpen && isActive && radialButtons.map((btn) => (
          <motion.a
            key={btn.id}
            href={project.platformUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} 
            initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
            animate={{ opacity: 1, scale: 1, x: btn.x, y: btn.y }}
            exit={{ 
              opacity: 0, scale: 0.5, x: 0, y: 0,
              transition: { type: "spring", stiffness: 150, damping: 20 }
            }}
            transition={{ type: "spring", stiffness: 120, damping: 12, delay: btn.delay }}
            // MAGIA 2: Le damos vida independiente a los botones
            whileHover={{ scale: 1.15 }} // Crecen un 15% al pasar el mouse
            whileTap={{ scale: 0.9 }}    // Se hunden un poco al hacerles clic
            className="absolute z-[-1] w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl hover:bg-[#99aaff]/20 hover:border-[#99aaff]/50 transition-colors cursor-pointer"
          >
            {btn.icon}
          </motion.a>
        ))}
      </AnimatePresence>

      {/* EL DISCO */}
      <div
        onClick={handleDiskClick}
        onMouseMove={isActive && !isMenuOpen ? handleMouseMove : undefined} 
        onMouseLeave={handleMouseLeave}
        className={`w-full h-full rounded-xl overflow-hidden cursor-pointer transition-all duration-150 ease-out ${
          isActive 
            ? (isMenuOpen 
                ? "shadow-[0_0_40px_rgba(153,170,255,0.2)]" 
                : "shadow-[0_0_40px_rgba(153,170,255,0.2)] hover:shadow-[0_0_90px_rgba(153,170,255,1)]")
            : (isMenuOpen 
                ? "" 
                : "hover:shadow-[0_0_30px_rgba(153,170,255,0.4)]")
        }`}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        <div 
          className="w-full h-full flex items-center justify-center border border-white/10 transition-colors relative"
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full flex flex-col items-center relative">
      
      {/* FONDO OSCURO (BACKDROP) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)} 
            // MAGIA 3: Cambiamos backdrop-blur-sm (4px) por un sutil [2px]
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[60]"
          />
        )}
      </AnimatePresence>

      {/* ESCENARIO 3D */}
      <div 
        className={`relative w-full max-w-4xl h-[400px] flex justify-center items-center transition-all ${isMenuOpen ? "z-[70]" : "z-10"}`}
        style={{ perspective: 1000 }} 
      >
        {projects.map((project, index) => (
          <CoverItem 
            key={project.id}
            project={project}
            index={index}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        ))}
      </div>

      {/* Información del Disco Activo */}
      <motion.div 
        key={activeIndex} 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 text-center max-w-2xl flex flex-col items-center gap-4 relative z-10"
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