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
    tags: ["Ableton Live","Songwriting", "Vocals", "Production"]
  },
  {
    id: "2",
    links: {
      spotify: "https://open.spotify.com/intl-es/track/6VB4dDfp7BRrvhvMbJW06k?si=c0bbad0f6e294474",
      apple: "https://music.apple.com/mx/album/hesperia/1715034315?i=1715034695",
      tidal: "https://tidal.com/track/281907910/u"
    },
    artist: "Noah Pino Palo",
    description: "I originally made this track with my friend Mauricio Jasso as an experiment in production and songwriting. The end result was too good and it ended up being released as a single by his band Noah Pino Palo. I produced, recorded background vocals and mixed this track.  ",
    tags: ["Ableton Live","Songwriting", "Vocals", "Production", "Mixing"]
  },
  {
    id: "3",
    links: {
      spotify: "https://open.spotify.com/intl-es/album/3YJVMJ9unabj9f0GNPmlSW?si=QkGjB3JbTo6hnYqIWKLnDQ",
      apple: "https://music.apple.com/mx/album/we-need-a-title/1596193684",
      tidal: "https://tidal.com/album/205643101/u"
    },
    artist: "Shark Camp",
    description: "The first and only EP by Shark Camp. I produced this project with the help of my friends and bandmates, Alfredo Savoy, Marcelo Villanueva, Ángel Gomez and Kevin Josh. A blend of pop, hip hop and electronic music that originally was only meant to be Angel's audio engineering thesis project.",
    tags: ["Ableton Live","Songwriting", "Vocals", "Production", "Mixing", "Mastering"]
  },
  {
    id: "4",
    links: {
      spotify: "https://open.spotify.com/intl-es/album/2G7Ve0EImgcNoxa9v6DxnH?si=4k9mZGhaS9mHhhZUeoDfmA",
      apple: "https://music.apple.com/mx/album/luz-nada-single/1820040774",
      tidal: "https://tidal.com/album/441573976/u"
    },
    artist: "slim ☺",
    description: "A short double feature of two of my tracks, 'luz' and 'nada'. Written, produced, mixed and mastered by myself. Additional production by Alfredo Savoy.",
    tags: ["Ableton Live", "Vocals", "Production", "Mixing", "Mastering"]
  },
  {
    id: "5",
    links: {
      spotify: "https://open.spotify.com/intl-es/album/23hyIItO7jnyJsSvbovFW8?si=UglykhTaSa24ruRccqY3xw",
      apple: "https://music.apple.com/mx/album/chicle-y-mora-ep/1757468172",
      tidal: "https://tidal.com/album/375296440/u"
    },
    artist: "Aguadulce",
    description: "I had the pleasure of working on the production alongside close friend and talented musician Alfredo Savoy. A blend of pop, rock and electronic music, this EP was a fun project to work on.",
    tags: ["Ableton Live", "Production", "Mixing", "Mastering"]
  }
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
    <main className="min-h-[100dvh] w-full flex flex-col items-center pt-[clamp(7rem,15vh,10rem)] pb-12 px-[clamp(1.5rem,4vw,3rem)] relative overflow-hidden">
      
      {/* TÍTULO*/}
      <div className="w-full max-w-5xl relative z-10 flex-shrink-0">
        <h1 className="font-light text-gray-400 tracking-widest mb-[clamp(0.5rem,2vh,1.5rem)] text-[clamp(2.5rem,6vw,4.5rem)] leading-none">
          / <span className="text-white font-medium">audio</span>
        </h1>
        <p className="text-gray-500 flex items-center gap-4 text-[clamp(1rem,2vw,1.25rem)]">
          production & audio engineering.
        </p>
      </div>

      {/* EL CONTENEDOR DEL CARRUSEL */}
      <div className="flex-1 w-full flex flex-col items-center justify-center relative z-30 max-w-5xl"> 
        <CoverFlow projects={audioProjects} /> 
      </div>

    </main>
  );
}