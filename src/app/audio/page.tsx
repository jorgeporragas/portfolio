import CoverFlow from "@/components/CoverFlow";
import { getMetadata } from "@/lib/getMetadata";

const projectSources = [
  {
    id: "1",
    links: {
      spotify: "https://open.spotify.com/intl-es/album/2G7Ve0EImgcNoxa9v6DxnH?si=4k9mZGhaS9mHhhZUeoDfmA",
    },
    artist: "slim ☺",
    description: "A short double feature of two of my tracks, 'luz' and 'nada'. Written, produced, mixed and mastered by myself. Additional production by Alfredo Savoy.",
    tags: ["Ableton Live", "Vocals", "Production", "Mixing", "Mastering"]
  },
  {
    id: "2",
    links: {
      spotify: "https://open.spotify.com/intl-es/album/5F5gwEmXvZGw2lRQlMTJCv?si=0IFHbQsOQme255WRvLQEtg",
    },
    artist: "CLUBZ",
    description: "CLUBZ's latest record. I had the pleasure of working on the production, crafting vocal melodies and lyrics, as well as providing background vocals.",
    tags: ["Songwriting", "Vocals", "Production"]
  },
];

export default async function AudioPage() {
  // 2. Pasamos source.links a la función
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
    <main className="min-h-screen flex flex-col items-center pt-32 pb-24 px-8 relative overflow-hidden">
      <div className="w-full mt-10">
        <CoverFlow projects={audioProjects} />
      </div>
    </main>
  );
}