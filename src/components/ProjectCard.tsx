"use client";

import { useState, MouseEvent } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMagneticHover } from "@/hooks/useMagneticHover";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  images: string[];
  projectUrl?: string;
}

export default function ProjectCard({ title, description, tags, images, projectUrl }: ProjectCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { position, isHovering, ref, handleMouseMove, handleMouseLeave } = useMagneticHover(9);

  const nextImage = (e?: MouseEvent) => {
    e?.stopPropagation(); // Evita clics fantasma
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e?: MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // 1. Lógica para el clic en la tarjeta (abre pestaña nueva)
  const handleCardClick = () => {
    if (projectUrl) {
      window.open(projectUrl, "_blank", "noopener,noreferrer");
    }
  };

  // 2. Lógica para el clic en la imagen (abre el visualizador)
  const handleMediaClick = (e: MouseEvent) => {
    e.stopPropagation(); // ¡Clave! Evita que se abra el link del proyecto
    setIsModalOpen(true);
  };

  return (
    <>
    {/* 1. EL SENSOR: Se queda quieto y mide el mouse de forma precisa */}
      <div 
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full"
      >
    
      {/* 2. EL MOTOR (LA TARJETA): Recibe las coordenadas y se mueve libremente */}
        <div 
          onClick={handleCardClick}
          // Asegúrate de que tenga "transition-all" para que el movimiento sea suave
          className={`flex flex-col gap-4 p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md transition-all ${
            isHovering ? "duration-150 ease-out" : "duration-500 ease-out" 
          } ${
            projectUrl ? "cursor-pointer group/card" : ""
          } shadow-[0_0_40px_rgba(153,170,255,0.2)] hover:shadow-[0_0_60px_rgba(153,170,255,0.4)]`}
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        >
        
        {/* CAJA MULTIMEDIA */}
          <div 
            onClick={handleMediaClick}
            className="relative w-full h-48 md:h-52 rounded-2xl overflow-hidden group/media cursor-zoom-in"
          >
          <div 
            className="w-full h-full transition-colors duration-500"
            style={{ backgroundColor: images[currentIndex] }}
          />
          
          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover/media:opacity-100 transition-opacity">
            <button onClick={prevImage} className="p-2 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-md transition-all">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextImage} className="p-2 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-md transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <div key={idx} className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-white w-4' : 'bg-white/40'}`} />
            ))}
          </div>
        </div>

        {/* Información */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-medium text-gray-200">{title}</h3>
            {/* Si hay URL, mostramos un ícono sutil que reacciona al hover de la tarjeta */}
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

      {/* LIGHTBOX / VISUALIZADOR MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)} // Clic en el fondo oscuro cierra el modal
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-12"
          >
            {/* Botón Cerrar */}
            <button className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors">
              <X size={40} strokeWidth={1} />
            </button>

            {/* Contenedor de la Imagen/Video */}
            <div 
              onClick={(e) => e.stopPropagation()} // Clic en la foto NO cierra el modal
              className="relative w-full max-w-6xl h-[60vh] md:h-[80vh] rounded-2xl overflow-hidden shadow-2xl group"
            >
              <div 
                className="w-full h-full transition-colors duration-500"
                style={{ backgroundColor: images[currentIndex] }}
              />

              <button onClick={prevImage} className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100">
                <ChevronLeft size={32} />
              </button>
              <button onClick={nextImage} className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100">
                <ChevronRight size={32} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}