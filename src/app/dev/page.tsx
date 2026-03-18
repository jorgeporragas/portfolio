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
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <main className="min-h-screen flex flex-col items-center pt-24 pb-12 px-8 relative overflow-hidden">
      
      <div className="w-full max-w-5xl mb-2 relative z-20">
        <h1 className="text-5xl font-light text-gray-400 tracking-widest mb-4">
          / <span className="text-white font-medium">dev</span>
        </h1>
        <p className="text-gray-500 text-lg flex items-center gap-4">
          selected works & experiments.
        </p>
      </div>

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
              animate={{
                x: offset * 300,
                rotateY: isActive ? 0 : offset > 0 ? -35 : 35,
                
                scale: isActive ? 1 : 0.8,
                opacity: Math.abs(offset) > 2 ? 0 : isActive ? 1 : 0.3,
                zIndex: 10 - Math.abs(offset),
              }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="absolute w-[340px] md:w-[420px]"
              whileHover={{ scale: isActive ? 1.05 : 0.8 }}
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

    </main>
  );
}