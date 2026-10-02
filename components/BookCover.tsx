"use client";

import React from "react";
import { Reenie_Beanie } from "next/font/google";

const hand = Reenie_Beanie({ subsets: ["latin"], weight: "400" });

type Props = {
  onOpen: () => void;
};

const BookCover = React.forwardRef<HTMLDivElement, Props>(({ onOpen }, ref) => {
  return (
    <div
      ref={ref}
      onClick={onOpen}
      className={`${hand.className} w-full h-full overflow-hidden bg-[#EBCFE0] flex flex-col items-center justify-center text-center gap-4 cursor-pointer page-shadow border border-[#3B2347]/20`}
    >
      <p className="w-full text-[#6B4A7A] tracking-[0.3em] text-2xl">
        come join us
      </p>

      <h1 className="w-full text-[#3B2347] text-6xl md:text-7xl px-6 leading-snug">
        The Listening Party
      </h1>

      <p className="w-full text-[#6B4A7A] text-2xl mt-6">
        tap to open
      </p>
    </div>
  );
});

BookCover.displayName = "BookCover";
export default BookCover;