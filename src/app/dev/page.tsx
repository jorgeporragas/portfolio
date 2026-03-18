"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// 1. Extraemos los datos para que el código sea limpio y escalable
const devProjects = [
  {
    id: "meedee",
    title: "meedee",
    description: "A dedicated mobile application designed to streamline the management of music projects, sessions, and audio assets.",
    tags: ["Swift", "SwiftUI", "iOS"],
    images: ["#1A1A1A", "#2C2C2E", "#3A3A3C"],
    projectUrl: "https://github.com/jorgeporragas/meedee"
  },
  {
    id: "song-split",
    title: "Song Split Manager",
    description: "Freelance mobile solution for independent artists to calculate and manage credit splits, royalties, and track metadata effectively.",
    tags: ["React Native", "TypeScript", "Mobile"],
    images: ["#1E1B4B", "#312E81", "#4338CA"]
  },
  {
    id: "game-engine",
    title: "Custom Game Engine",
    description: "Low-level architecture experiments building a custom game engine, focusing on memory management and high-performance rendering.",
    tags: ["C++", "OpenGL", "Systems Architecture"],
    images: ["#064E3B", "#065F46", "#047857"]
  },
  {
    id: "portfolio",
    title: "Web Portfolio",
    description: "Interactive, highly animated personal portfolio built with modern web technologies, focusing on physics-based UI and glassmorphism.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    images: ["#3B0764", "#581C87", "#7E22CE"]
  }
];

export default function DevPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = derecha, -1 = izquierda

  const nextProject = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === devProjects.length - 1 ? 0 : prev + 1));
  };

  const prevProject = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? devProjects.length - 1 : prev - 1));
  };

  // Variantes de animación para el deslizamiento
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <main className="min-h-screen flex flex-col items-center pt-32 pb-24 px-8 relative overflow-hidden">
      
      <div className="w-full max-w-5xl mb-12">
        <h1 className="text-5xl font-light text-gray-400 tracking-widest mb-4">
          / <span className="text-white font-medium">dev</span>
        </h1>
        <p className="text-gray-500 text-lg flex items-center gap-4">
          selected works & experiments.
          <span className="text-sm px-3 py-1 bg-white/5 rounded-full border border-white/10">
            {currentIndex + 1} of {devProjects.length}
          </span>
        </p>
      </div>

      {/* EL CARRUSEL 2D */}
      <div className="relative w-full max-w-2xl flex items-center justify-center mt-4">
        
        {/* Botón Anterior (Flotando a la izquierda) */}
        <button 
          onClick={prevProject}
          className="absolute -left-16 md:-left-24 z-10 p-4 text-gray-500 hover:text-white transition-colors hover:scale-110 active:scale-95"
        >
          <ChevronLeft size={40} strokeWidth={1} />
        </button>

        {/* Contenedor de la Tarjeta Animada */}
        <div className="w-full relative flex justify-center h-[550px] perspective-[1000px]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 }
              }}
              className="absolute w-full"
            >
              <ProjectCard 
                title={devProjects[currentIndex].title}
                description={devProjects[currentIndex].description}
                tags={devProjects[currentIndex].tags}
                images={devProjects[currentIndex].images}
                projectUrl={devProjects[currentIndex].projectUrl}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Botón Siguiente (Flotando a la derecha) */}
        <button 
          onClick={nextProject}
          className="absolute -right-16 md:-right-24 z-10 p-4 text-gray-500 hover:text-white transition-colors hover:scale-110 active:scale-95"
        >
          <ChevronRight size={40} strokeWidth={1} />
        </button>

      </div>

      {/* Indicadores (Puntitos abajo) */}
      <div className="flex gap-3 mt-12">
        {devProjects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-8 bg-[#99aaff]" : "w-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

    </main>
  );
}