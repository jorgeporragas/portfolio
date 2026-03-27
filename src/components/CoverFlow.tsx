"use client";

import { useState, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SpotifyIcon, AppleMusicIcon, TidalIcon } from "./BrandIcons";
import { useMagneticHover } from "@/hooks/useMagneticHover";
import { useIsMobile } from "@/hooks/useIsMobile";

export interface AudioProject {
  id: string;
  title: string;
  artist: string;
  description: string;
  coverImage: string;
  links?: { spotify?: string; apple?: string; tidal?: string };
  tags: string[];
}

// --------------------------------------------------------
// 1. EL DISCO (Perspectiva 3D)
// --------------------------------------------------------
function CoverItem({ 
  project, index, activeIndex, setActiveIndex, isMenuOpen, setIsMenuOpen 
}: { 
  project: AudioProject; 
  index: number; 
  activeIndex: number;
  setActiveIndex: (idx: number) => void;
  isMenuOpen: boolean; 
  setIsMenuOpen: (val: boolean) => void;
}) {
  const { position, ref, handleMouseMove, handleMouseLeave } = useMagneticHover(9);
  const isMobile = useIsMobile();
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

  return (
    <motion.div
      ref={ref}
      drag={isMenuOpen && isActive ? false : "x"}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.5}
      onDragEnd={(e, { offset }) => {
        const threshold = 30;
        if (offset.x < -threshold && activeIndex < 10) setActiveIndex(activeIndex + 1);
        else if (offset.x > threshold && activeIndex > 0) setActiveIndex(activeIndex - 1);
        setIsMenuOpen(false);
      }}
      animate={{
        x: offset * 160,
        y: isMobile && isMenuOpen && isActive ? -20 : 0,
        z: !isMobile && isMenuOpen && isActive ? -300 : 0, 
        rotateY: isActive ? 0 : offset > 0 ? -40 : 40,
        scale: isActive ? (isMenuOpen ? (isMobile ? 0.9 : 0.6) : 1) : 0.75,
        opacity: Math.abs(offset) > 2 ? 0 : isActive ? (isMenuOpen ? 0.3 : 1) : (isMenuOpen ? 0.05 : 0.4),
        zIndex: 10 - Math.abs(offset),
      }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="absolute w-[70vw] h-[70vw] max-w-[320px] max-h-[320px] md:w-80 md:h-80 rounded-xl flex items-center justify-center"
    >
      <div
        onClick={handleDiskClick}
        onMouseMove={isActive && !isMenuOpen && !isMobile ? handleMouseMove : undefined}
        onMouseLeave={handleMouseLeave}
        className={`w-full h-full rounded-xl overflow-hidden cursor-pointer transition-all duration-150 z-10 ${
          isActive && !isMenuOpen ? "shadow-[0_0_40px_rgba(153,170,255,0.2)]" : ""
        }`}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        <div 
          className="w-full h-full border border-white/10 relative"
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
// 2. EL OVERLAY (Información y Controles)
// --------------------------------------------------------
function ProjectOverlay({ 
  project, 
  isMenuOpen, 
  setIsMenuOpen 
}: { 
  project: AudioProject; 
  isMenuOpen: boolean;
  setIsMenuOpen: (val: boolean) => void;
}) {
  const isMobile = useIsMobile();
  
  // MODIFICACIÓN: Bajamos los botones ligeramente (y: -145, mobileY: -135)
  const buttons = [
    { id: 'spotify', icon: <SpotifyIcon size={isMobile ? 48 : 42} />, x: -120, y: -145, mobileX: -90, mobileY: -135, url: project.links?.spotify },
    { id: 'apple', icon: <AppleMusicIcon size={isMobile ? 64 : 58} />, x: 0, y: -145, mobileX: 0, mobileY: -135, url: project.links?.apple },
    { id: 'tidal', icon: <TidalIcon size={isMobile ? 72 : 64} />, x: 120, y: -145, mobileX: 90, mobileY: -135, url: project.links?.tidal },
  ].filter(b => b.url);

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <div className="fixed inset-0 pointer-events-none z-[100]">
          
          <div className="absolute inset-0 flex items-center justify-center">
            {buttons.map((btn, i) => (
              <motion.a
                key={btn.id}
                href={btn.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()} 
                className="absolute pointer-events-auto text-white/70 hover:text-white drop-shadow-2xl"
                initial={{ opacity: 0, y: -80, scale: 0.8 }}
                animate={{ 
                  opacity: 1, scale: 1, 
                  x: isMobile ? btn.mobileX : btn.x, 
                  y: isMobile ? btn.mobileY : btn.y 
                }}
                exit={{ opacity: 0, scale: 0.8, y: -80 }}
                transition={{ type: "spring", stiffness: 200, damping: 22, delay: i * 0.05 }}
              >
                {btn.icon}
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 40, x: "-50%" }}
            onClick={() => setIsMenuOpen(false)} 
            // MODIFICACIÓN: Subimos el texto un poco más (top-[49%] en móvil, top-[46%] en escritorio)
            className="absolute top-[49%] md:top-[46%] left-1/2 w-[95vw] md:w-[400px] max-h-[40vh] overflow-y-auto text-center pointer-events-auto px-6 cursor-default pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [-webkit-mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]"
          >
            <h2 className="text-4xl md:text-5xl font-medium text-white mb-2 leading-tight">
              {project.title}
            </h2>
            <p className="text-[#99aaff] text-lg uppercase tracking-[0.2em] mb-6">
              {project.artist}
            </p>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8">
              {project.description}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {project.tags.map(t => (
                <span key={t} className="px-4 py-1.5 text-xs text-gray-400 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// --------------------------------------------------------
// 3. COMPONENTE PRINCIPAL
// --------------------------------------------------------
export default function CoverFlow({ projects }: { projects: AudioProject[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full flex flex-col items-center justify-center relative min-h-[60vh]">
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[60]" 
          />
        )}
      </AnimatePresence>

      <div className="relative w-full h-[450px] flex justify-center items-center" style={{ perspective: 1200 }}>
        {projects.map((p, i) => (
          <CoverItem 
            key={p.id} project={p} index={i} 
            activeIndex={activeIndex} setActiveIndex={setActiveIndex} 
            isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} 
          />
        ))}
      </div>

      <ProjectOverlay 
        project={projects[activeIndex]} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />

    </div>
  );
}