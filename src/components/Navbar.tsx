import GlowLink from "./GlowLink";
import { Home } from "lucide-react";

export default function Navbar() {
  return (
    // Cambiamos 'left-1/2 -translate-x-1/2' por 'left-8 md:left-12'
    <nav className="fixed top-12 left-8 md:left-12 z-50 flex items-center">
      <GlowLink href="/">
        <Home size={50} strokeWidth={1.5} />
      </GlowLink>
    </nav>
  );
}