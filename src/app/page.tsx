// src/app/page.tsx
import GlowLink from "@/components/GlowLink";
import { Command, Star, AtSign } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden p-6 md:p-12">
      
      {/* TÍTULO Y DESCRIPCIÓN */}
      <div className="text-center z-10 mb-[clamp(4.5rem,15vw,9rem)] relative">
        
        {/* TÍTULO */}
        <h1 className="text-white font-medium tracking-tight text-[clamp(3.75rem,9vw,6rem)] leading-none">
          jorge porragas
        </h1>

        {/* DESCRIPCIÓN */}
        <p className="text-gray-500 font-light mt-[clamp(0.75rem,3vw,1.5rem)] text-[clamp(1.7rem,4vw,2.25rem)] tracking-wide">
          developer & producer
        </p>
      </div>

      {/* ICONOS */}
      <div className="flex flex-row items-center justify-center gap-[clamp(1.5rem,15vw,10rem)] w-full max-w-7xl relative z-10 px-4">
        
        {/* ENLACE A LA SECCIÓN DE DESARROLLO (DEV) */}
        <GlowLink href="/dev" label="dev">
          <div className="w-[clamp(5rem,12vw,8rem)] h-[clamp(6rem,12vw,8rem)] flex items-center justify-center">
            <Command size="100%" strokeWidth={1.5} />
          </div>
        </GlowLink>

        {/* ENLACE A LA SECCIÓN DE AUDIO (AUDIO) */}
        <GlowLink href="/audio" label="audio">
          <div className="w-[clamp(5rem,12vw,8rem)] h-[clamp(6rem,12vw,8rem)] flex items-center justify-center">
            <Star size="100%" strokeWidth={1.5} />
          </div>
        </GlowLink>

        {/* ENLACE A LA SECCIÓN DE INFORMACIÓN PERSONAL (ME) */}
        <GlowLink href="/me" label="me">
          <div className="w-[clamp(5rem,12vw,8rem)] h-[clamp(6rem,12vw,8rem)] flex items-center justify-center">
            <AtSign size="100%" strokeWidth={1.5} />
          </div>
        </GlowLink>

      </div>
    </main>
  );
}