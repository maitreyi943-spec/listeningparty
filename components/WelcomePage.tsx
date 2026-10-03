"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Vinyl from "./Vinyl";

const WelcomePage = React.forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="relative w-full h-full overflow-hidden paper flex items-center justify-center px-8 text-center"
    >
      {/* BIG VINYL - BACKGROUND */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <Vinyl size={350} />
      </div>

      {/* FLOWERS - TOP RIGHT */}
      <motion.img
        src="/stickers/flowers.jpeg"
        alt="Flowers"
        draggable={false}
        className="absolute z-10 w-32 -top-6 -right-4 object-contain mix-blend-multiply"
        animate={{ rotate: [-4, 2, -4], y: [0, 5, 0] }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* HEADPHONES + SPARKLES - TOP LEFT */}
      <div
        className="z-10"
        style={{ position: "absolute", top: 5, left: 20, width: 160 }}
      >
        <motion.img
          src="/stickers/headphones.png"
          alt="Headphones"
          draggable={false}
          style={{ width: 160, height: "auto", display: "block" }}
          animate={{ y: [0, -5, 0], rotate: [-3, 3, -3] }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Sparkle 1 */}
        <motion.div
          className="absolute -top-1 -right-2 text-xl pointer-events-none text-[#4A2C3F]"
          animate={{ rotate: [0, 8, 0, -8, 0], y: [0, -2, 0, 2, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          ✦
        </motion.div>

        {/* Sparkle 2 */}
        <motion.div
          className="pointer-events-none text-[#4A2C3F]"
          style={{
            position: "absolute",
            left: -14,
            bottom: 24,
            fontSize: 20,
            zIndex: 20,
          }}
          animate={{ rotate: [0, -8, 0, 8, 0], y: [0, 2, 0, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          ✦
        </motion.div>
      </div>

      {/* BOOKS - BOTTOM LEFT CORNER */}
      <motion.img
        src="/stickers/album-stack.png"
        alt="Stack of books"
        draggable={false}
        className="absolute z-10 w-48 bottom-[-18px] left-[-30px] object-contain"
        whileHover={{ x: 5, rotate: -2 }}
        transition={{ type: "spring", stiffness: 250, damping: 12 }}
      />

      {/* CAT + CHAIR - BOTTOM RIGHT */}
      <motion.img
        src="/stickers/cat-chair.png"
        alt="Cat sitting on chair"
        draggable={false}
        className="absolute z-10 w-48 bottom-[-65px] right-[-18px] object-contain"
        whileHover={{ rotate: [0, -2, 2, -2, 2, 0], scale: 1.03 }}
        whileTap={{ rotate: [0, -4, 4, -3, 3, 0] }}
        transition={{ duration: 0.5 }}
      />

      {/* MAIN TEXT */}
      <div className="relative z-30 flex flex-col items-center justify-center">
        <h2 className="font-serif text-3xl mb-3 text-[#4A2C3F]">
          The Listening Party
        </h2>
        <p className="text-lg italic mb-4 text-[#4A2C3F]">lets have some fun</p>
        <p className="text-sm text-[#5E3B50] max-w-xs">
          Come hang, listen and sing to your fav music, eat, talk, and meet people.
        </p>
      </div>
    </div>
  );
});

WelcomePage.displayName = "WelcomePage";

export default WelcomePage;