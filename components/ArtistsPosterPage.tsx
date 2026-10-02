"use client";

import React from "react";
import Image from "next/image";

interface Artist {
  id: number;
  name: string;
  image: string;
  rotation: string;
  width: string;
  left: string;
  bottom: string;
  zIndex: number;
}

const artists: Artist[] = [
  {
    id: 1,
    name: "Artist 1",
    image: "/artists/artist1.png",
    rotation: "-4deg",
    width: "36%",
    left: "-7%",
    bottom: "-2%",
    zIndex: 10,
  },
  {
    id: 2,
    name: "Artist 2",
    image: "/artists/artist2.png",
    rotation: "3deg",
    width: "40%",
    left: "11%",
    bottom: "-2%",
    zIndex: 20,
  },
  {
    id: 3,
    name: "Artist 3",
    image: "/artists/artist3.png",
    rotation: "-2deg",
    width: "46%",
    left: "27%",
    bottom: "-1%",
    zIndex: 30,
  },
  {
    id: 4,
    name: "Artist 4",
    image: "/artists/artist4.png",
    rotation: "3deg",
    width: "40%",
    left: "49%",
    bottom: "-2%",
    zIndex: 20,
  },
  {
    id: 5,
    name: "Artist 5",
    image: "/artists/artist5.png",
    rotation: "-4deg",
    width: "36%",
    left: "71%",
    bottom: "-2%",
    zIndex: 10,
  },
];

const sparkles = [
  { id: 1, left: "7%", top: "18%", size: "text-2xl", rotation: "-12deg" },
  { id: 2, left: "19%", top: "42%", size: "text-lg", rotation: "15deg" },
  { id: 3, left: "34%", top: "25%", size: "text-xl", rotation: "-8deg" },
  { id: 4, left: "49%", top: "43%", size: "text-2xl", rotation: "12deg" },
  { id: 5, left: "65%", top: "22%", size: "text-lg", rotation: "-15deg" },
  { id: 6, left: "79%", top: "40%", size: "text-2xl", rotation: "8deg" },
  { id: 7, left: "91%", top: "24%", size: "text-lg", rotation: "-10deg" },
  { id: 8, left: "12%", top: "66%", size: "text-lg", rotation: "10deg" },
  { id: 9, left: "87%", top: "65%", size: "text-xl", rotation: "-12deg" },
];

const ArtistsPosterPage = React.forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <section
      ref={ref}
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-[#f8eee9]
      "
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            -right-32
            -top-32
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#e8c4cb]
            opacity-40
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-40
            -right-20
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#ead8c8]
            opacity-45
            blur-3xl
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[500px]
            w-[500px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#fff8f3]
            opacity-80
            blur-3xl
          "
        />
      </div>

      {/* SPARKLES */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        {sparkles.map((sparkle) => (
          <span
            key={sparkle.id}
            className={`
              absolute
              ${sparkle.size}
              select-none
              text-[#a66d7e]
              opacity-70
              drop-shadow-[0_2px_4px_rgba(150,95,115,0.18)]
            `}
            style={{
              left: sparkle.left,
              top: sparkle.top,
              transform: `rotate(${sparkle.rotation})`,
            }}
          >
            ✦
          </span>
        ))}

        <span className="absolute left-[27%] top-[58%] text-sm text-[#c08b9b] opacity-70">
          ✧
        </span>

        <span className="absolute left-[73%] top-[58%] text-sm text-[#c08b9b] opacity-70">
          ✧
        </span>

        <span className="absolute left-[55%] top-[67%] text-xs text-[#a66d7e] opacity-60">
          ✦
        </span>
      </div>

      {/* HEADER */}
      <div
        className="
          relative
          z-50
          mx-auto
          w-full
          max-w-[1600px]
          px-4
          pt-5
          text-center
          sm:px-6
          sm:pt-7
          lg:px-10
          lg:pt-8
        "
      >
        <p
          className="
            mb-2
            text-[10px]
            font-medium
            uppercase
            tracking-[0.4em]
            text-[#9b6576]
            sm:text-xs
            lg:text-sm
          "
          style={{
            fontFamily: "Arial, sans-serif",
          }}
        >
          Featured artists
        </p>

        <h1
          className="
            mx-auto
            w-full
            text-balance
            font-semibold
            leading-[1.05]
            tracking-[-0.02em]
            text-[#641033]
          "
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(1.6rem, 5.5vw, 4.5rem)",
          }}
        >
          YOUR FAVOURITE ARTISTS
        </h1>
      </div>

      {/* ARTIST STAGE */}
      <div className="absolute inset-x-0 bottom-0 top-[14%] z-30 overflow-hidden">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="
              absolute
              flex
              items-end
              justify-center
            "
            style={{
              left: artist.left,
              bottom: artist.bottom,
              width: artist.width,
              zIndex: artist.zIndex,
            }}
          >
            <Image
              src={artist.image}
              alt={artist.name}
              width={700}
              height={900}
              sizes="50vw"
              priority
              className="
                h-auto
                w-full
                object-contain
                drop-shadow-[0_18px_18px_rgba(74,45,55,0.25)]
              "
              style={{
                transform: `rotate(${artist.rotation})`,
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
});

ArtistsPosterPage.displayName = "ArtistsPosterPage";

export default ArtistsPosterPage;