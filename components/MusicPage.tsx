"use client";

import React, { useState } from "react";
import AlbumCard from "./AlbumCard";

const albums = [
  {
    title: "folklore",
    artist: "Taylor Swift",
    cover: "/albums/album1.jpeg",
  },
  {
    title: "Happier than ever",
    artist: "Billie Eillish",
    cover: "/albums/album2.jpeg",
  },
  {
    title: "TTPD:the anthology",
    artist: "Taylor Swift",
    cover: "/albums/album3.jpeg",
  },
  {
    title: "The Secret Of Us",
    artist: "Gracie Abrams",
    cover: "/albums/album4.jpeg",
  },
];

const MusicPage = React.forwardRef<HTMLDivElement>((_, ref) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div
      ref={ref}
      className="w-full h-full paper overflow-hidden flex flex-col px-6 py-6"
    >
      <h2 className="font-serif text-xl mb-1 text-center">
        The Session
      </h2>

      <p className="text-[11px] text-center text-[var(--ink)]/60 mb-4">
        Tap what you're excited to hear
      </p>

      <div className="grid grid-cols-2 gap-3 overflow-y-auto">
        {albums.map((album) => (
          <AlbumCard
            key={album.title}
            title={album.title}
            artist={album.artist}
            cover={album.cover}
            selected={selected === album.title}
            onSelect={() => setSelected(album.title)}
          />
        ))}
      </div>
    </div>
  );
});

MusicPage.displayName = "MusicPage";

export default MusicPage;