import GlowLink from "@/components/GlowLink";
// Agregamos AtSign a la importación
import { Command, Star, AtSign } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden">
      
      <div className="text-center z-10 mb-32">
        {/* Redujimos la escala tipográfica aquí */}
        <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-6 text-[#F5F5F7]">
          jorge porragas
        </h1>
        <p className="text-xl md:text-3xl text-[#99aaff] tracking-wide font-light">
          software developer & producer
        </p>
      </div>

      {/* Ajustamos el gap para acomodar 3 elementos */}
      <div className="flex gap-16 md:gap-24 z-10">
        <GlowLink href="/dev" label="dev">
          <Command size={100} strokeWidth={1.5} />
        </GlowLink>
        
        <GlowLink href="/audio" label="audio">
          <Star size={100} strokeWidth={1.5} />
        </GlowLink>

        {/* Nuevo botón integrado */}
        <GlowLink href="/me" label="me">
          <AtSign size={100} strokeWidth={1.5} />
        </GlowLink>
      </div>
      
    </main>
  );
}