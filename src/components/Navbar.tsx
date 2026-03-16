import GlitchButton from "./GlitchButton";
import { Home, AtSign } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-12 left-1/2 -translate-x-1/2 z-50 flex gap-[16px] items-center">
      <GlitchButton href="/" Icon={Home} iconSize={50} />
      <GlitchButton href="/me" Icon={AtSign} iconSize={50} />
    </nav>
  );
}