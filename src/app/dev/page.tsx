"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { motion } from "framer-motion";

const devProjects = [
  {
    id: "meedee",
    title: "meedee",
    description: "A dedicated mobile application designed to streamline the management of music projects, sessions, and audio assets.",
    tags: ["Swift", "SwiftUI", "iOS"],
    images: ["#1A1A1A"],
    projectUrl: "https://github.com/jorgeporragas/meedee"
  },
  {
    id: "portfolio",
    title: "Interactive Portfolio",
    description: "A highly interactive, responsive personal website featuring a custom 3D CoverFlow engine, glassmorphism UI overlays, and complex fluid layouts.",
    tags: ["Next.js", "React", "Framer Motion", "Tailwind CSS"],
    images: ["#000000"],
  },
];

export default function DevPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <main className="min-h-[100dvh] w-full flex flex-col items-center pt-[clamp(7rem,15vh,10rem)] pb-12 px-[clamp(1.5rem,4vw,3rem)] relative overflow-hidden">
      
      <div className="w-full max-w-5xl relative z-20 flex-shrink-0">
        <h1 className="font-light text-gray-400 tracking-widest mb-[clamp(0.5rem,2vh,1.5rem)] text-[clamp(2.5rem,6vw,4.5rem)] leading-none">
          / <span className="text-white font-medium">dev</span>
        </h1>
        <p className="text-gray-500 flex items-center gap-4 text-[clamp(1rem,2vw,1.25rem)]">
          selected works & experiments.
        </p>
      </div>

    <div className="flex-1 w-full flex flex-col items-center justify-center relative z-10 w-full max-w-5xl">

      <div 
        className="relative w-full max-w-6xl h-[480px] flex justify-center items-center mt-2"
        style={{ perspective: 1200 }} 
      >
        {devProjects.map((project, index) => {
          const offset = index - activeIndex;
          const isActive = offset === 0;

          return (
            <motion.div
              key={project.id}
              // --- INICIO DE PROPIEDADES DE SWIPE (TÁCTIL) ---
              drag="x" // Permitir arrastrar solo en el eje horizontal
              dragConstraints={{ left: 0, right: 0 }} // El resorte que lo regresa al centro
              dragElastic={0.5} // Qué tan "duro" se siente el resorte
              onDragEnd={(e, { offset, velocity }) => {
                // Si desliza fuerte a la izquierda, avanzamos
                if (offset.x < -30 && activeIndex < devProjects.length - 1) {
                  setActiveIndex(activeIndex + 1);
                } 
                // Si desliza fuerte a la derecha, retrocedemos
                else if (offset.x > 30 && activeIndex > 0) {
                  setActiveIndex(activeIndex - 1);
                }
              }}
              // --- FIN DE PROPIEDADES DE SWIPE ---
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
                <div 
                  className="absolute inset-0 z-50 cursor-pointer" 
                  onClick={() => setActiveIndex(index)} 
                />
              )}

              <div className={`transition-all duration-500 ${!isActive ? "pointer-events-none filter brightness-50" : ""}`}>
                <ProjectCard 
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  images={project.images}
                  projectUrl={project.projectUrl}
                />
              </div>

            </motion.div>
          );
        })}
      </div>
    </div>

    </main>
  );
}