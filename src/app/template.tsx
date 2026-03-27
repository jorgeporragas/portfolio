"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", // Tipo de física
        stiffness: 280, // Tensión
        damping: 10     // Fricción
      }}
    >
      {children}
    </motion.div>
  );
}