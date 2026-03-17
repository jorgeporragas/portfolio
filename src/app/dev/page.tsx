import ProjectCard from "@/components/ProjectCard";

export default function DevPage() {
  return (
    <main className="min-h-screen flex flex-col items-center pt-32 pb-24 px-8 relative">
      
      {/* Título de la Sección */}
      <div className="w-full max-w-5xl mb-16">
        <h1 className="text-5xl font-light text-gray-400 tracking-widest mb-4">
          / <span className="text-white font-medium">dev</span>
        </h1>
        <p className="text-gray-500 text-lg">
          selected works & experiments.
        </p>
      </div>

      {/* Grid de Proyectos */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <ProjectCard 
          title="meedee"
          description="A dedicated mobile application designed to streamline the management of music projects, sessions, and audio assets."
          tags={["Swift", "SwiftUI", "iOS"]}
          images={["#1A1A1A", "#2C2C2E", "#3A3A3C"]} // Colores oscuros estilo iOS
        />

        <ProjectCard 
          title="Web Portfolio"
          description="You're looking at it! Interactive, highly animated personal portfolio built with modern web technologies, focusing on physics-based UI and glassmorphism."
          tags={["Next.js", "Tailwind CSS", "TypeScript"]}
          images={["#3B0764", "#581C87", "#7E22CE"]} // Tonos púrpura
        />

      </div>
    </main>
  );
}