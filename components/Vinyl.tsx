"use client";

import { motion } from "framer-motion";

export default function Vinyl({
  size = 160,
}: {
  size?: number;
}) {
  return (
    <motion.div
      style={{ width: size, height: size }}
      className="relative rounded-full bg-[#E8C4C9] overflow-hidden shadow-2xl"
      whileHover={{
        rotate: 3,
        x: 3,
      }}
      transition={{
        duration: 0.15,
        ease: "easeOut",
      }}
    >
      {/* Spinning layer */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        {/* Light streak (makes the spin visible) */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.35) 6%, transparent 14%, transparent 50%, rgba(255,255,255,0.25) 56%, transparent 64%)",
          }}
        />

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
    </motion.div>
  );
}