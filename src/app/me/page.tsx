"use client";

import { motion } from "framer-motion";
import GlowLink from "@/components/GlowLink";
import { Github, Linkedin, Mail } from "lucide-react";

export default function MePage() {
  return (
    <main className="min-h-screen flex flex-col justify-center pt-32 pb-24 px-8 relative overflow-hidden">
      
      <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row gap-20 items-center lg:items-start">
        
        {/* Columna Izquierda: Título y Declaración */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex-1"
        >
          <h1 className="text-5xl font-light text-gray-400 tracking-widest mb-8">
            / <span className="text-white font-medium">me</span>
          </h1>
          <h2 className="text-3xl md:text-5xl text-white font-medium tracking-tight leading-tight">
            I write code, build systems, and produce music.
          </h2>
        </motion.div>

        {/* Columna Derecha: Bio y Links */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
          className="flex-1 flex flex-col gap-8 text-gray-400 text-lg leading-relaxed font-light"
        >
          <p>
            I'm Jorge, a 27-year-old software developer and producer based in Monterrey, Mexico. Currently in my 5th semester of Software Development, I balance my time between engineering robust digital products and exploring sonic landscapes.
          </p>
          <p>
            My technical focus lies in low-level systems architecture using C++ and crafting fluid, native mobile experiences with Swift and SwiftUI.
          </p>
          <p>
            When I'm not optimizing code or upgrading the GPU on my custom rig, you can find me in Ableton Live designing heavy, atmospheric soundscapes. I believe the best engineering—just like the best mixing—requires extreme attention to detail and a deep understanding of the underlying signal flow.
          </p>

          {/* Redes y Contacto */}
          <div className="flex gap-12 mt-8 pt-8 border-t border-white/10">
            <GlowLink href="https://github.com/jorgeporragas" iconSize={32}>
              <Github />
            </GlowLink>
            <GlowLink href="https://linkedin.com/in/jorgeporragas" iconSize={32}>
              <Linkedin />
            </GlowLink>
            <GlowLink href="mailto:hello@jorgeporragas.com" iconSize={32}>
              <Mail />
            </GlowLink>
          </div>
        </motion.div>

      </div>
    </main>
  );
}