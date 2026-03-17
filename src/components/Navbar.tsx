import GlowLink from "./GlowLink";
import { Home, AtSign } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-12 left-1/2 -translate-x-1/2 z-50 flex gap-[16px] items-center">
      <GlowLink href="/">
        <Home size={50} strokeWidth={1.5} />
      </GlowLink>
      
      <GlowLink href="/me">
        <AtSign size={50} strokeWidth={1.5} />
      </GlowLink>
    </nav>
  );
}