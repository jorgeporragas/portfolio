"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  // Por ahora usaremos colores de fondo como placeholders de las imágenes
  images: string[]; 
}

export default function ProjectCard({ title, description, tags, images }: ProjectCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md transition-all hover:bg-white/10">
      
      {/* Caja Multimedia (Carrusel) */}
      <div className="relative w-full h-64 rounded-2xl overflow-hidden group">
        {/* Placeholder de la imagen actual */}
        <div 
          className="w-full h-full transition-colors duration-500"
          style={{ backgroundColor: images[currentIndex] }}
        />
        
        {/* Controles del carrusel (Solo aparecen al pasar el mouse) */}
        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={prevImage}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-md transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextImage}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-md transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        {/* Indicadores de puntitos */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-white w-4' : 'bg-white/40'}`}
            />
          ))}
        </div>
      </div>

      {/* Información del Proyecto */}
      <div>
        <h3 className="text-2xl font-medium text-gray-200 mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {description}
        </p>
        
        {/* Píldoras de Tecnología */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <span 
              key={idx} 
              className="px-3 py-1 text-xs tracking-wider text-[#99aaff] bg-[#99aaff]/10 border border-[#99aaff]/20 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}