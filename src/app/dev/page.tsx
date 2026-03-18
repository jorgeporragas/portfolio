"use client";

import ProjectCard from "@/components/ProjectCard";
import { motion, Variants } from "framer-motion";

// 1. Variantes del Contenedor (El Grid)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, 
    },
  },
};

// 2. Variantes de cada Elemento (Las Tarjetas)
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    }
  },
};

export default function DevPage() {
  return (
    <main className="min-h-screen flex flex-col items-center pt-32 pb-24 px-8 relative">
      
      <div className="w-full max-w-5xl mb-16">
        <h1 className="text-5xl font-light text-gray-400 tracking-widest mb-4">
          / <span className="text-white font-medium">dev</span>
        </h1>
        <p className="text-gray-500 text-lg">
          selected works & experiments.
        </p>
      </div>

      {/* 3. El Contenedor Padre animado */}
      <motion.div 
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        
        {/* 4. Envolvemos cada tarjeta en un "Hijo" animado */}
        <motion.div variants={itemVariants}>
          <ProjectCard 
            title="meedee"
            description="A dedicated mobile application designed to streamline the management of music projects, sessions, and audio assets."
            tags={["Swift", "SwiftUI", "iOS"]}
            images={["#1A1A1A", "#2C2C2E", "#3A3A3C"]} 
            projectUrl="https://github.com/jorgeporragas/meedee"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ProjectCard 
            title="Song Split Manager"
            description="Freelance mobile solution for independent artists to calculate and manage credit splits, royalties, and track metadata effectively."
            tags={["React Native", "TypeScript", "Mobile"]}
            images={["#1E1B4B", "#312E81", "#4338CA"]} 
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ProjectCard 
            title="Custom Game Engine"
            description="Low-level architecture experiments building a custom game engine, focusing on memory management and high-performance rendering."
            tags={["C++", "OpenGL", "Systems Architecture"]}
            images={["#064E3B", "#065F46", "#047857"]} 
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ProjectCard 
            title="Web Portfolio"
            description="Interactive, highly animated personal portfolio built with modern web technologies, focusing on physics-based UI and glassmorphism."
            tags={["Next.js", "Tailwind CSS", "TypeScript"]}
            images={["#3B0764", "#581C87", "#7E22CE"]} 
          />
        </motion.div>

      </motion.div>
    </main>
  );
}