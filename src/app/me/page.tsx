"use client";

import { motion } from "framer-motion";
import GlowLink from "@/components/GlowLink";
import { Github, Linkedin, Mail } from "lucide-react";

export default function MePage() {
  return (
    // 1. EL ESCUDO DEL NAVBAR Y PADDING LATERAL FLUIDO
    <main className="min-h-[100dvh] w-full flex flex-col items-center pt-[clamp(7rem,15vh,10rem)] pb-12 px-[clamp(1.5rem,4vw,3rem)] relative overflow-hidden">
      
      {/* 2. GAP FLUIDO ENTRE COLUMNAS: 
        En celular se apilan con separación normal, en escritorio la separación es elástica.
      */}
      <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row gap-[clamp(3rem,8vw,5rem)] items-center lg:items-start">
        
        {/* COLUMNA IZQUIERDA: Título y Declaración */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex-1"
        >
          {/* 3. TÍTULO UNIFICADO (/ me)
            Exactamente la misma escala matemática que en /dev y /audio.
          */}
          <h1 className="font-light text-gray-400 tracking-widest mb-[clamp(1.5rem,4vh,2rem)] text-[clamp(2.5rem,6vw,4.5rem)] leading-none">
            / <span className="text-white font-medium">me</span>
          </h1>
          
          {/* 4. SUBTÍTULO FLUIDO (I write code...)
            Escala masivamente en pantallas grandes para dar mucho impacto inicial.
          */}
          <h2 className="text-white font-medium tracking-tight leading-tight text-[clamp(2rem,4.5vw,3.5rem)]">
            I write code, build systems, and produce music.
          </h2>
        </motion.div>

        {/* COLUMNA DERECHA: Bio y Links */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
          // 5. TEXTO DE LA BIO FLUIDO Y SEPARACIÓN ENTRE PÁRRAFOS ELÁSTICA
          className="flex-1 flex flex-col gap-[clamp(1rem,2.5vh,1.5rem)] text-gray-400 text-[clamp(1.05rem,1.5vw,1.25rem)] leading-relaxed font-light"
        >
          <p>
            I'm Jorge, a 27-year-old software developer and producer based in Monterrey, Mexico. I balance my time between engineering robust digital products and exploring sound.
          </p>
          <p>
            My technical focus lies in low-level systems architecture using <strong>C++</strong>, crafting fluid web experiences with <strong>Next.js</strong> and <strong>React</strong>, as well as creating intuitive and responsive mobile apps using <strong>Swift</strong> and <strong>Flutter</strong>. I have a deep passion for optimizing performance and creating seamless user interfaces that feel good to use.
          </p>
          <p>
            When I'm not optimizing code or upgrading the GPU on my custom rig, you can find me crafting new tracks in <strong>Ableton Live</strong>. I believe the best engineering—just like the best mixing—requires extreme attention to detail and a deep understanding of the underlying signal flow.
          </p>

          {/* REDES Y CONTACTO (Íconos fluidos) */}
          <div className="flex gap-[clamp(1.5rem,4vw,3rem)] mt-[clamp(1.5rem,4vh,2.5rem)] pt-[clamp(1.5rem,4vh,2.5rem)] border-t border-white/10">
            <GlowLink href="https://github.com/jorgeporragas">
              <div className="w-[clamp(1.75rem,3vw,2.25rem)] h-[clamp(1.75rem,3vw,2.25rem)] flex items-center justify-center">
                <Github size="100%" />
              </div>
            </GlowLink>
            
            <GlowLink href="https://linkedin.com/in/jorgeporragas">
              <div className="w-[clamp(1.75rem,3vw,2.25rem)] h-[clamp(1.75rem,3vw,2.25rem)] flex items-center justify-center">
                <Linkedin size="100%" />
              </div>
            </GlowLink>
            
            <GlowLink href="mailto:hello@jorgeporragas.com">
              <div className="w-[clamp(1.75rem,3vw,2.25rem)] h-[clamp(1.75rem,3vw,2.25rem)] flex items-center justify-center">
                <Mail size="100%" />
              </div>
            </GlowLink>
          </div>
        </motion.div>

      </div>
    </main>
  );
}