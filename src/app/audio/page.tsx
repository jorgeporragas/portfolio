import CoverFlow from "@/components/CoverFlow";
import { getMetadata } from "@/lib/getMetadata";

const projectSources = [
  
  {
    id: "1",
    links: {
      spotify: "https://open.spotify.com/intl-es/album/5F5gwEmXvZGw2lRQlMTJCv?si=0IFHbQsOQme255WRvLQEtg",
      apple: "https://music.apple.com/mx/album/radio-kono/1801347395",
      tidal: "https://tidal.com/album/424515648/u"
    },
    artist: "CLUBZ",
    description: "CLUBZ's latest record. I had the pleasure of working on the production, crafting vocal melodies and lyrics, as well as providing background vocals for the entire project.",
    tags: ["Songwriting", "Vocals", "Production"]
  },
  {
    id: "2",
    links: {
      spotify: "https://open.spotify.com/intl-es/album/2G7Ve0EImgcNoxa9v6DxnH?si=4k9mZGhaS9mHhhZUeoDfmA",
      apple: "https://music.apple.com/mx/album/luz-nada-single/1820040774",
      tidal: "https://tidal.com/album/441573976/u"
    },
    artist: "slim ☺",
    description: "A short double feature of two of my tracks, 'luz' and 'nada'. Written, produced, mixed and mastered by myself. Additional production by Alfredo Savoy.",
    tags: ["Ableton Live", "Vocals", "Production", "Mixing", "Mastering"]
  },
];

export default async function AudioPage() {
  const audioProjects = await Promise.all(
    projectSources.map(source => 
      getMetadata(
        source.links, 
        source.id, 
        source.artist, 
        source.description, 
        source.tags
      )
    )
  );

  return (
    // 1. PADDING Y MÁRGENES FLUIDOS (El escudo protector del Navbar)
    <main className="min-h-[100dvh] w-full flex flex-col items-center pt-[clamp(7rem,15vh,10rem)] pb-12 px-[clamp(1.5rem,4vw,3rem)] relative overflow-hidden">
      
      {/* 1. EL TÍTULO: Lo bajamos de z-20 a z-10 */}
      <div className="w-full max-w-5xl relative z-10 flex-shrink-0">
        <h1 className="font-light text-gray-400 tracking-widest mb-[clamp(0.5rem,2vh,1.5rem)] text-[clamp(2.5rem,6vw,4.5rem)] leading-none">
          / <span className="text-white font-medium">audio</span>
        </h1>
        <p className="text-gray-500 flex items-center gap-4 text-[clamp(1rem,2vw,1.25rem)]">
          production & audio engineering.
        </p>
      </div>

      {/* 2. EL CONTENEDOR DEL CARRUSEL: Lo subimos de z-10 a z-30 */}
      {/* Usamos z-30 para asegurarnos de que toda la "Capa 2" esté por encima del layout base */}
      <div className="flex-1 w-full flex flex-col items-center justify-center relative z-30 max-w-5xl">
        <CoverFlow projects={audioProjects} />
      </div>

    </main>
  );
}