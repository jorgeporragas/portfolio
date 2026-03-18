"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", // Cambiamos a físicas reales
        stiffness: 280, // La "tensión" del resorte (más alto = más rápido)
        damping: 10     // La "fricción" (más bajo = más rebote al llegar)
      }}
    >
      {children}
    </motion.div>
  );
}