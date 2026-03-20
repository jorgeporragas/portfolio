// src/app/page.tsx
import GlowLink from "@/components/GlowLink";
import { Command, Star, AtSign } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden p-6 md:p-12">
      
      {/* SECCIÓN 1: TÍTULO Y DESCRIPCIÓN (FLUIDOS Y AGRANDADOS X1.5) */}
      {/* Aumentamos el margen inferior para que no se pegue a los íconos agrandados.
        mb-[clamp(4.5rem,15vw,9rem)] -> (x1.5 sobre el original)
      */}
      <div className="text-center z-10 mb-[clamp(4.5rem,15vw,9rem)] relative">
        {/*
          TÍTULO (JORGE PORRAGAS)
          Aumentamos valores un 50%:
          text-[clamp(2.5rem,6vw,4rem)] -> text-[clamp(3.75rem,9vw,6rem)]
          En celular pequeño: 60px (3.75rem) - ¡Impacto directo!
          En monitor gigante: 96px (6rem)
        */}
        <h1 className="text-white font-medium tracking-tight text-[clamp(3.75rem,9vw,6rem)] leading-none">
          jorge porragas
        </h1>
        
        {/*
          DESCRIPCIÓN (developer & producer)
          Aumentamos valores un 50%:
          text-[clamp(1.125rem,2.5vw,1.5rem)] -> text-[clamp(1.7rem,4vw,2.25rem)]
          En monitor gigante: 36px (2.25rem)
          Subimos también el mt elásticamente.
        */}
        <p className="text-gray-500 font-light mt-[clamp(0.75rem,3vw,1.5rem)] text-[clamp(1.7rem,4vw,2.25rem)] tracking-wide">
          developer & producer
        </p>
      </div>

      {/* SECCIÓN 2: ÍCONOS DE NAVEGACIÓN (FLUÍDOS Y AGRANDADOS X1.5) */}
      {/* Aumentamos la separación elástica (gap) para que los íconos grandes no choquen.
        gap-[clamp(2rem,8vw,5rem)] -> gap-[clamp(3rem,12vw,7.5rem)]
        Aumentamos el max-w-3xl -> max-w-5xl para darles espacio lateral.
      */}
      <div className="flex flex-row items-center justify-center gap-[clamp(3rem,12vw,7.5rem)] w-full max-w-5xl relative z-10 px-4">
        
        {/* Para los íconos, cambiamos el size={40} rígido por un div contenedor con clamp().
          Aumentamos el tamaño x1.5:
          w/h-[clamp(2.5rem,6vw,3.5rem)] -> w/h-[clamp(3.75rem,9vw,5.25rem)]
          En monitor gigante: 84px (5.25rem)
        */}
        <GlowLink href="/dev" label="dev">
          <div className="w-[clamp(3.75rem,9vw,5.25rem)] h-[clamp(3.75rem,9vw,5.25rem)] flex items-center justify-center">
            <Command size="100%" strokeWidth={1} />
          </div>
        </GlowLink>

        <GlowLink href="/audio" label="audio">
          <div className="w-[clamp(3.75rem,9vw,5.25rem)] h-[clamp(3.75rem,9vw,5.25rem)] flex items-center justify-center">
            <Star size="100%" strokeWidth={1} />
          </div>
        </GlowLink>

        <GlowLink href="/me" label="me">
          <div className="w-[clamp(3.75rem,9vw,5.25rem)] h-[clamp(3.75rem,9vw,5.25rem)] flex items-center justify-center">
            <AtSign size="100%" strokeWidth={1} />
          </div>
        </GlowLink>

      </div>
    </main>
  );
}