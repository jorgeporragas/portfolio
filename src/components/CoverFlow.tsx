"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SpotifyIcon, AppleMusicIcon, TidalIcon } from "./BrandIcons";
import { useMagneticHover } from "@/hooks/useMagneticHover";

export interface AudioProject {
  id: string;
  title: string;
  artist: string;
  description: string;
  coverImage: string;
  links?: { spotify?: string; apple?: string; tidal?: string }; // <-- Reemplazamos platformUrl
  tags: string[];
}

// --------------------------------------------------------
// 1. SUB-COMPONENTE: El Disco Individual
// --------------------------------------------------------
function CoverItem({ 
  project, index, activeIndex, setActiveIndex, isMenuOpen, setIsMenuOpen
}: { 
  project: AudioProject; index: number; activeIndex: number; setActiveIndex: (idx: number) => void; isMenuOpen: boolean; setIsMenuOpen: (val: boolean) => void;
}) {
  const { position, ref, handleMouseMove, handleMouseLeave } = useMagneticHover(9);

  const offset = index - activeIndex;
  const isActive = offset === 0;

  const handleDiskClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!isActive) {
      setActiveIndex(index);
      setIsMenuOpen(false); 
    } else {
      setIsMenuOpen(!isMenuOpen);
    }
  };
// Menu radial con enlaces a plataformas (solo para el proyecto activo)
  const availableButtons = [
    { id: 'spotify', icon: <SpotifyIcon size={36} />, x: -210, y: -110, delay: 0, url: project.links?.spotify },
    { id: 'apple', icon: <AppleMusicIcon size={36} />, x: -250, y: 0, delay: 0.05, url: project.links?.apple },
    { id: 'tidal', icon: <TidalIcon size={36} />, x: -210, y: 110, delay: 0.1, url: project.links?.tidal },
  ].filter(btn => btn.url !== undefined);

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
      whileHover={{ 
        scale: isMenuOpen ? (isActive ? 1 : 0.75) : (isActive ? 1.05 : 0.8) 
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      // Importante: quitamos overflow-hidden de aquí si lo tuviera, para que el texto y menú puedan salir
      className="absolute w-64 h-64 md:w-80 md:h-80 rounded-xl flex items-center justify-center"
    >
      
      {/* EL MENÚ RADIAL (A la Izquierda) */}
      <AnimatePresence>
        {isMenuOpen && isActive && availableButtons.map((btn) => (
          <motion.a
            key={btn.id}
            href={btn.url}
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
            // Hacemos que crezca un poco más al hacer hover ya que no tiene fondo
            whileHover={{ scale: 1.2 }} 
            whileTap={{ scale: 0.9 }}    
            className="absolute z-[-1] text-white/70 hover:text-white drop-shadow-lg hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] transition-colors cursor-pointer"
          >
            {btn.icon}
          </motion.a>
        ))}
      </AnimatePresence>

      {/* LA INFORMACIÓN DEL PROYECTO (A la Derecha) */}
      <AnimatePresence>
        {isMenuOpen && isActive && (
          <motion.div
            initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -20, filter: "blur(4px)", transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute left-full top-1/2 -translate-y-1/2 ml-8 md:ml-16 w-[280px] md:w-[350px] text-left cursor-default"
          >
            <h2 className="text-4xl font-medium text-white mb-2 leading-tight drop-shadow-md">
              {project.title}
            </h2>
            <p className="text-[#99aaff] tracking-widest text-sm uppercase mb-6 drop-shadow-sm">
              {project.artist}
            </p>
            <p className="text-gray-300 text-sm leading-relaxed mb-8">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1 text-xs tracking-wider text-gray-400 bg-white/10 border border-white/20 rounded-full backdrop-blur-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EL DISCO */}
      <div
        onClick={handleDiskClick}
        onMouseMove={isActive && !isMenuOpen ? handleMouseMove : undefined} 
        onMouseLeave={handleMouseLeave}
        className={`w-full h-full rounded-xl overflow-hidden cursor-pointer transition-all duration-150 ease-out z-10 ${
          isActive 
            ? (isMenuOpen 
                ? "shadow-[0_0_40px_rgba(153,170,255,0.2)]" 
                : "shadow-[0_0_40px_rgba(153,170,255,0.2)] hover:shadow-[0_0_60px_rgba(153,170,255,0.4)]")
            : (isMenuOpen 
                ? "" 
                : "hover:shadow-[0_0_30px_rgba(153,170,255,0.4)]")
        }`}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        <div 
          // 3. LA SOLUCIÓN DE LA IMAGEN: Usamos style puro para forzar la geometría
          className="w-full h-full flex items-center justify-center border border-white/10 transition-colors relative"
          style={{ 
            backgroundImage: project.coverImage.includes('url') ? project.coverImage : 'none',
            backgroundColor: !project.coverImage.includes('url') ? project.coverImage : 'transparent',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
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
    <div className="w-full flex flex-col items-center justify-center relative min-h-[60vh]">
      
      {/* FONDO OSCURO (BACKDROP) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)} 
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[60]"
          />
        )}
      </AnimatePresence>

      {/* ESCENARIO 3D */}
      <div 
        className={`relative w-full max-w-5xl h-[400px] flex justify-center items-center transition-all ${isMenuOpen ? "z-[70]" : "z-10"}`}
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

    </div>
  );
}