"use client";

import { MouseEvent } from "react";
import { ExternalLink, Maximize2 } from "lucide-react";
import { useMagneticHover } from "@/hooks/useMagneticHover";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  images: string[];
  projectUrl?: string;
  onOpenMedia: () => void; // Nueva función para avisarle a la página que abra el modal
}

export default function ProjectCard({ title, description, tags, images, projectUrl, onOpenMedia }: ProjectCardProps) {
  const { position, isHovering, ref, handleMouseMove, handleMouseLeave } = useMagneticHover(9);

  const handleCardClick = () => {
    if (projectUrl) {
      window.open(projectUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleMediaClick = (e: MouseEvent) => {
    e.stopPropagation(); 
    onOpenMedia();
  };

  // Determinar si es un color hex o una URL para la miniatura
  const coverIsColor = images[0]?.startsWith('#');

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full"
    >
      <div 
        onClick={handleCardClick}
        className={`flex flex-col gap-4 p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md transition-all ${
          isHovering ? "duration-150 ease-out" : "duration-500 ease-out" 
        } ${
          projectUrl ? "cursor-pointer group/card" : ""
        } shadow-[0_0_40px_rgba(153,170,255,0.2)] hover:shadow-[0_0_60px_rgba(153,170,255,0.4)]`}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        
        {/* CAJA MULTIMEDIA (MINIATURA LIMPIA) */}
        <div 
          onClick={handleMediaClick}
          className="relative w-full h-48 md:h-52 rounded-2xl overflow-hidden group/media cursor-zoom-in border border-white/5"
        >
          {coverIsColor ? (
            <div className="w-full h-full transition-transform duration-700 group-hover/media:scale-105" style={{ backgroundColor: images[0] }} />
          ) : (
            <img src={images[0]} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover/media:scale-105" />
          )}
          
          {/* Overlay sutil para indicar que se puede abrir */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/media:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
            <div className="bg-black/50 p-3 rounded-full text-white/90">
              <Maximize2 size={24} />
            </div>
          </div>
        </div>

        {/* INFORMACIÓN */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-medium text-gray-200">{title}</h3>
            {projectUrl && (
              <ExternalLink size={20} className="text-gray-600 transition-colors group-hover/card:text-[#99aaff]" />
            )}
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 text-xs tracking-wider text-[#99aaff] bg-[#99aaff]/10 border border-[#99aaff]/20 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}