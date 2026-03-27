"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { p } from "framer-motion/client";

const devProjects = [
  {
    id: "meedee",
    title: "meedee",
    description: "A dedicated mobile application designed to streamline the management of music projects, sessions, and audio assets.",
    tags: ["Figma","Swift", "SwiftUI", "iOS"],
    images: ["/images/projects/meedee.png"], 
    projectUrl: "https://github.com/jorgeporragas/meedee"
  },
  {
    id: "portfolio",
    title: "Interactive Portfolio",
    description: "A highly interactive, responsive personal website featuring a custom 3D CoverFlow engine, glassmorphism UI overlays, and complex fluid layouts.",
    tags: ["Next.js", "React", "Framer Motion", "Tailwind CSS"],
    images: ["/images/projects/portfolio.png"],
    projectUrl: "https://github.com/jorgeporragas/portfolio"
  },
];

// --------------------------------------------------------
// SUB-COMPONENTE: El Visualizador Modal (Hermano Mayor)
// --------------------------------------------------------
function Lightbox({ 
  project, 
  onClose 
}: { 
  project: typeof devProjects[0]; 
  onClose: () => void 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // NUEVO: Controla la dirección de la animación

  const paginate = (newDirection: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) return project.images.length - 1;
      if (next >= project.images.length) return 0;
      return next;
    });
  };

  const currentMedia = project.images[currentIndex];
  const isColor = currentMedia?.startsWith('#');

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 500 : -500,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 md:top-10 md:right-10 p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all z-50"
      >
        <X size={32} strokeWidth={1.5} />
      </button>

      {/* Contenedor principal */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative w-full max-w-5xl h-[70vh] md:h-[80vh] flex items-center justify-center group overflow-hidden"
      >
        {/* AnimatePresence permite animar la salida de la imagen anterior */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            // FÍSICAS DE SWIPE 
            drag={project.images.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset }) => {
              const threshold = 50;
              if (offset.x < -threshold) paginate(1); // Swipe izquierda -> Siguiente
              else if (offset.x > threshold) paginate(-1); // Swipe derecha -> Anterior
            }}
            className="absolute w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            {isColor ? (
              <div className="w-full h-full rounded-2xl shadow-2xl" style={{ backgroundColor: currentMedia }} />
            ) : (
              <img 
                src={currentMedia} 
                alt={`${project.title} screenshot ${currentIndex + 1}`} 
                // draggable={false} evita que el navegador intente "arrastrar para guardar" la imagen nativamente, arruinando el swipe de Framer Motion.
                draggable={false}
                className="max-w-full max-h-full object-contain rounded-xl drop-shadow-2xl" 
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Controles de Navegación */}
        {project.images.length > 1 && (
          <>
            <button onClick={(e) => paginate(-1, e)} className="absolute left-4 md:-left-12 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-black/50 text-white hover:bg-black/80 hover:scale-110 backdrop-blur-md transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 z-10">
              <ChevronLeft size={28} />
            </button>
            <button onClick={(e) => paginate(1, e)} className="absolute right-4 md:-right-12 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-black/50 text-white hover:bg-black/80 hover:scale-110 backdrop-blur-md transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 z-10">
              <ChevronRight size={28} />
            </button>
          </>
        )}
      </div>

      {/* Indicadores */}
      {project.images.length > 1 && (
        <div className="absolute bottom-8 flex gap-3 z-10">
          {project.images.map((_, idx) => (
            <button 
              key={idx} 
              onClick={(e) => { 
                e.stopPropagation(); 
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx); 
              }}
              className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white w-8' : 'bg-white/30 w-2 hover:bg-white/60'}`} 
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

// --------------------------------------------------------
// COMPONENTE PRINCIPAL DE LA PÁGINA
// --------------------------------------------------------
export default function DevPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeModalProject, setActiveModalProject] = useState<typeof devProjects[0] | null>(null);

  return (
    <main className="min-h-[100dvh] w-full flex flex-col items-center pt-[clamp(7rem,15vh,10rem)] pb-12 px-[clamp(1.5rem,4vw,3rem)] relative overflow-hidden">
      
      {/* Header Text */}
      <div className="w-full max-w-5xl relative z-20 flex-shrink-0">
        <h1 className="font-light text-gray-400 tracking-widest mb-[clamp(0.5rem,2vh,1.5rem)] text-[clamp(2.5rem,6vw,4.5rem)] leading-none">
          / <span className="text-white font-medium">dev</span>
        </h1>
        <p className="text-gray-500 flex items-center gap-4 text-[clamp(1rem,2vw,1.25rem)]">
          selected works & experiments.
        </p>
      </div>

      {/* Carrusel 3D */}
      <div className="flex-1 w-full flex flex-col items-center justify-center relative z-10 max-w-5xl">
        <div className="relative w-full max-w-6xl h-[480px] flex justify-center items-center mt-2" style={{ perspective: 1200 }}>
          {devProjects.map((project, index) => {
            const offset = index - activeIndex;
            const isActive = offset === 0;

            return (
              <motion.div
                key={project.id}
                drag="x" 
                dragConstraints={{ left: 0, right: 0 }} 
                dragElastic={0.5} 
                onDragEnd={(e, { offset }) => {
                  if (offset.x < -30 && activeIndex < devProjects.length - 1) setActiveIndex(activeIndex + 1);
                  else if (offset.x > 30 && activeIndex > 0) setActiveIndex(activeIndex - 1);
                }}
                animate={{
                  x: offset * 300,
                  rotateY: isActive ? 0 : offset > 0 ? -35 : 35,
                  scale: isActive ? 1 : 0.8,
                  opacity: Math.abs(offset) > 2 ? 0 : isActive ? 1 : 0.3,
                  zIndex: 10 - Math.abs(offset),
                }}
                whileHover={{ scale: isActive ? 1.05 : 0.8 }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                className="absolute w-[340px] md:w-[420px]"
              >
                {!isActive && (
                  <div className="absolute inset-0 z-50 cursor-pointer" onClick={() => setActiveIndex(index)} />
                )}

                <div className={`transition-all duration-500 ${!isActive ? "pointer-events-none filter brightness-50" : ""}`}>
                  <ProjectCard 
                    title={project.title}
                    description={project.description}
                    tags={project.tags}
                    images={project.images}
                    projectUrl={project.projectUrl}
                    onOpenMedia={() => setActiveModalProject(project)} // Conectamos el botón con el estado de la página
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* RENDERIZADO DEL VISUALIZADOR MODAL */}
      <AnimatePresence>
        {activeModalProject && (
          <Lightbox 
            project={activeModalProject} 
            onClose={() => setActiveModalProject(null)} 
          />
        )}
      </AnimatePresence>

    </main>
  );
}