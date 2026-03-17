"use client";

import ProjectCard from "@/components/ProjectCard";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Tu ritmo perfecto de cascada
    },
  },
};

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

export default function AudioPage() {
  return (
    <main className="min-h-screen flex flex-col items-center pt-32 pb-24 px-8 relative">
      
      {/* Título de la Sección */}
      <div className="w-full max-w-5xl mb-16">
        <h1 className="text-5xl font-light text-gray-400 tracking-widest mb-4">
          / <span className="text-white font-medium">audio</span>
        </h1>
        <p className="text-gray-500 text-lg">
          sonic explorations & production.
        </p>
      </div>

      {/* Grid Animado */}
      <motion.div 
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        
        <motion.div variants={itemVariants}>
          <ProjectCard 
            title="Debut EP Production"
            description="Full-cycle production, from sound design and arrangement to final mixdown. Exploring atmospheric textures and heavy low-end."
            tags={["Ableton Live", "Production", "Mixing"]}
            images={["#450a0a", "#7f1d1d", "#991b1b"]} // Tonos rojo oscuro
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ProjectCard 
            title="Indie Film Scoring"
            description="Original soundtrack and foley for an independent short film. Focused on creating tension through analog synthesis and organic recordings."
            tags={["Sound Design", "Foley", "Synthesis"]}
            images={["#1c1917", "#292524", "#44403c"]} // Tonos carbón
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ProjectCard 
            title="Freelance Mix & Master"
            description="Audio engineering services for independent artists. Providing clarity, width, and competitive loudness standards for streaming platforms."
            tags={["Mixing", "Mastering", "Audio Engineering"]}
            images={["#0f172a", "#1e293b", "#334155"]} // Tonos slate/acero
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ProjectCard 
            title="Sample Pack Vol. 1"
            description="A curated collection of royalty-free drum breaks, atmospheric pads, and granular synth textures crafted for modern electronic producers."
            tags={["Sound Design", "Sampling", "Processing"]}
            images={["#3f2ccb", "#4338ca", "#4f46e5"]} // Tonos índigo profundos
          />
        </motion.div>

      </motion.div>
    </main>
  );
}