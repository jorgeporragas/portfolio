import Link from "next/link";
import { ElementType } from "react";

interface GlitchButtonProps {
  href: string;
  Icon: ElementType;
  label?: string;
  iconSize?: number;
}

export default function GlitchButton({ href, Icon, label, iconSize = 100 }: GlitchButtonProps) {
  return (
    <Link 
      href={href} 
      className="group flex flex-col items-center gap-6 outline-none text-gray-500" 
      style={{ color: "inherit", textDecoration: "none" }}
    >
      
      <div className="relative flex items-center justify-center transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:scale-110 group-hover:drop-shadow-[0_0_30px_rgba(153,170,255,0.6)]">
        
        {/* Ícono Base: Capa z-10 */}
        <Icon 
          size={iconSize} 
          strokeWidth={1.5} 
          className="relative z-10 text-gray-500 group-hover:text-[#99aaff] transition-colors duration-500" 
        />

        {/* Clon Cyan: Subimos a z-20 y bajamos la opacidad a 70 */}
        <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-70 capa-glitch-1 pointer-events-none">
          <Icon size={iconSize} strokeWidth={1.5} color="#06b6d4" />
        </div>

        {/* Clon Magenta: Subimos a z-20 y bajamos la opacidad a 70 */}
        <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-70 capa-glitch-2 pointer-events-none">
          <Icon size={iconSize} strokeWidth={1.5} color="#d946ef" />
        </div>

      </div>
      
      {label && (
        <span className="text-lg tracking-widest text-gray-500 group-hover:text-white transition-colors duration-300">
          {label}
        </span>
      )}
    </Link>
  );
}