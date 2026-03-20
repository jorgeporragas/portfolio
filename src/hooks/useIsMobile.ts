// src/hooks/useIsMobile.ts
import { useState, useEffect } from "react";

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Revisamos el tamaño actual
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    handleResize(); // Lo corremos una vez al montar el componente
    
    // Nos suscribimos a los cambios de tamaño de la ventana
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}