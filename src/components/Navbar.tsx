import GlowLink from "./GlowLink";
import { Home } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed z-50 flex items-center top-[clamp(1.5rem,4vh,3rem)] left-[clamp(1.5rem,4vw,3rem)]">
      <GlowLink href="/">
        <div className="w-[clamp(2.5rem,6vw,3.5rem)] h-[clamp(2.5rem,6vw,3.5rem)] flex items-center justify-center">
          <Home size="100%" strokeWidth={2.2} />
        </div>
      </GlowLink>
    </nav>
  );
}