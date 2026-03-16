import GlitchButton from "@/components/GlitchButton";
import { Command, Star } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden">
      
      <div className="text-center z-10 mb-32">
        <h1 className="text-7xl md:text-9xl font-medium tracking-tighter mb-6 text-[#F5F5F7]">
          jorge porragas
        </h1>
        <p className="text-xl md:text-3xl text-[#99aaff] tracking-wide font-light">
          software developer & producer
        </p>
      </div>

      <div className="flex gap-32 z-10">
        <GlitchButton href="/dev" Icon={Command} label="dev" iconSize={120} />
        <GlitchButton href="/audio" Icon={Star} label="audio" iconSize={120} />
      </div>
      
    </main>
  );
}