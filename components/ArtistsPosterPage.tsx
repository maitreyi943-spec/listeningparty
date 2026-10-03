"use client";

import React, { useState } from "react";

const ArtistsPosterPage = React.forwardRef<HTMLDivElement>((_, ref) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      ref={ref}
      className="relative h-full w-full overflow-hidden bg-[#f8eee9]"
    >
      {/* HOVER SHAKE */}
      <style>{`
        @keyframes posterShake {
          0% { transform: translateY(-3px) rotate(-1deg) scale(1.02); }
          25% { transform: translateY(-3px) rotate(0.8deg) scale(1.02); }
          50% { transform: translateY(-3px) rotate(-0.7deg) scale(1.02); }
          75% { transform: translateY(-3px) rotate(0.6deg) scale(1.02); }
          100% { transform: translateY(-3px) rotate(-1deg) scale(1.02); }
        }
      `}</style>

      {/* SOFT BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 -top-24 h-[300px] w-[300px] rounded-full bg-[#e8c4cb] opacity-30 blur-3xl" />
        <div className="absolute -bottom-28 -left-20 h-[350px] w-[350px] rounded-full bg-[#ead8c8] opacity-30 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff8f3] opacity-70 blur-3xl" />
      </div>

      {/* HEADER */}
      <div className="relative z-20 flex w-full flex-col items-center px-6 pt-7 text-center sm:px-8 sm:pt-9">
        <p
          className="mb-2 text-[9px] font-medium uppercase tracking-[0.3em] text-[#9b6576] sm:text-[10px] lg:text-xs"
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          Featured Artists
        </p>

        <h1
          className="m-0 w-full text-center font-semibold uppercase leading-[0.92] tracking-[-0.015em] text-[#641033]"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
          }}
        >
          YOUR FAVOURITE
          <br />
          ARTISTS
        </h1>

        <div className="mt-4 h-px w-12 bg-[#9b6576] opacity-60" />
      </div>

      {/* POSTER AREA (under header) */}
      <div
        className="absolute inset-x-0 bottom-0 z-30 flex justify-center px-8 pb-10"
        style={{ top: 185 }}
      >
        <div
          className="relative h-full cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            animation: isHovered
              ? "posterShake 0.55s ease-in-out infinite"
              : "none",
          }}
        >
          {/* PAPER CUTOUT LAYERS (behind the image) */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              filter:
                "drop-shadow(0 6px 10px rgba(74,45,55,0.22)) drop-shadow(0 1px 2px rgba(74,45,55,0.15))",
            }}
          >
            {/* back paper layer, cream, tilted one way */}
            <div
              className="absolute"
              style={{
                inset: -18,
                background: "#f1e4d8",
                transform: "rotate(2.2deg)",
                clipPath:
                  "polygon(2% 1%, 15% 0%, 30% 1.5%, 47% 0%, 63% 1.5%, 80% 0%, 97% 1%, 100% 15%, 98.5% 32%, 100% 50%, 98.8% 68%, 100% 85%, 98% 99%, 82% 100%, 65% 98.5%, 48% 100%, 30% 98.5%, 14% 100%, 1% 98.5%, 0% 82%, 1.5% 64%, 0% 46%, 1.2% 28%, 0% 12%)",
              }}
            />
            {/* front paper layer, white, tilted the other way */}
            <div
              className="absolute"
              style={{
                inset: -10,
                background: "#fffdf9",
                transform: "rotate(-1.8deg)",
                clipPath:
                  "polygon(1% 2%, 12% 0%, 26% 1.5%, 41% 0%, 58% 1.5%, 74% 0%, 90% 1.5%, 99% 0.5%, 100% 14%, 98.5% 30%, 100% 47%, 98.8% 63%, 100% 80%, 99% 98%, 85% 100%, 68% 98.5%, 50% 100%, 32% 98.5%, 15% 100%, 2% 99%, 0% 84%, 1.5% 66%, 0% 48%, 1.2% 30%, 0% 14%)",
              }}
            />
          </div>

          {/* TAPE */}
          <div
            className="pointer-events-none absolute z-10"
            style={{
              top: -22,
              left: "50%",
              width: 70,
              height: 22,
              marginLeft: -35,
              background: "rgba(232,196,203,0.75)",
              transform: "rotate(-4deg)",
              boxShadow: "0 1px 2px rgba(74,45,55,0.2)",
            }}
          />

          {/* POSTER IMAGE */}
          <img
            src="/artists-poster.png"
            alt="Featured artists"
            draggable={false}
            className="relative block h-full w-auto"
          />
        </div>
      </div>
    </section>
  );
});

ArtistsPosterPage.displayName = "ArtistsPosterPage";

export default ArtistsPosterPage;