"use client";

import { motion } from "framer-motion";

export default function Vinyl({ size = 160 }: { size?: number }) {
  return (
    <motion.div
      style={{ width: size, height: size }}
      className="relative rounded-full bg-[#E8C4C9] overflow-hidden shadow-2xl"
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 4,
        ease: "linear",
      }}
    >
      {/* Inner record label */}
      <div className="absolute inset-[15%] rounded-full bg-[--accent]" />

      {/* Centre hole */}
      <div className="absolute inset-[46%] rounded-full bg-[--paper]" />

      {/* Vinyl grooves */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-black/15"
          style={{
            inset: `${8 + i * 6}%`,
          }}
        />
      ))}

      {/* Centre stopper */}
      <div className="absolute top-1/2 left-1/2 w-[12%] h-[12%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8F7B60] shadow-sm" />
    </motion.div>
  );
}