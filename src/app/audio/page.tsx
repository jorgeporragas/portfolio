"use client";

import CoverFlow, { AudioProject } from "@/components/CoverFlow";

// Nuestra base de datos "manual" temporal
const audioProjects: AudioProject[] = [
  {
    id: "1",
    title: "Nocturne EP",
    artist: "Jorge Porragas",
    description: "A dark, atmospheric exploration of granular synthesis and heavy low-end. Completely produced, mixed, and mastered in-the-box.",
    coverImage: "#1c1917", // Carbón
    tags: ["Ableton Live", "Sound Design", "Mixing"],
    platformUrl: "https://spotify.com/...", // Listo para el futuro
  },
  {
    id: "2",
    title: "Neon Pulse",
    artist: "Jorge Porragas",
    description: "High-energy synthwave track focusing on analog modeling and aggressive drum bus processing.",
    coverImage: "#4c1d95", // Púrpura profundo
    tags: ["Synthesis", "Analog Modeling", "Production"],
  },
  {
    id: "3",
    title: "Cinematic Soundscape Vol. 1",
    artist: "Jorge Porragas",
    description: "Original scoring project designed for tension and release. Featuring custom foley recordings and orchestral arrangements.",
    coverImage: "#064e3b", // Esmeralda oscuro
    tags: ["Scoring", "Foley", "Arrangement"],
  },
  {
    id: "4",
    title: "Unreleased B-Side",
    artist: "Jorge Porragas",
    description: "Raw, unmixed studio session bounce. Capturing the immediate energy of a live jam before post-production.",
    coverImage: "#7f1d1d", // Rojo oscuro
    tags: ["Live Jam", "Raw Audio", "Experiment"],
  },
  {
    id: "5",
    title: "Urban Textures",
    artist: "Jorge Porragas",
    description: "A collection of field recordings processed through various modular effects chains to create playable melodic instruments.",
    coverImage: "#1e3a8a", // Azul oscuro
    tags: ["Field Recording", "Processing", "Modular"],
  }
];

export default function AudioPage() {
  return (
    <main className="min-h-screen flex flex-col items-center pt-32 pb-24 px-8 relative overflow-hidden">
      
      <div className="w-full max-w-5xl mb-12">
        <h1 className="text-5xl font-light text-gray-400 tracking-widest mb-4">
          / <span className="text-white font-medium">audio</span>
        </h1>
        <p className="text-gray-500 text-lg">
          sonic explorations & production.
        </p>
      </div>

      {/* Inyectamos nuestro nuevo componente 3D */}
      <div className="w-full mt-10">
        <CoverFlow projects={audioProjects} />
      </div>

    </main>
  );
}