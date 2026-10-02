"use client";

import Image from "next/image";

type Props = {
  title: string;
  artist: string;
  cover: string;
  selected?: boolean;
  onSelect?: () => void;
};

export default function AlbumCard({
  title,
  artist,
  cover,
  selected,
  onSelect,
}: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`
        text-left rounded-md overflow-hidden border
        transition-all duration-200
        ${
          selected
            ? "border-[var(--accent-deep)] scale-95"
            : "border-black/10"
        }
      `}
    >
      <div className="relative w-full aspect-square">
        <Image
          src={cover}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, 300px"
          className="object-cover"
        />
      </div>

      <div className="p-1.5">
        <p className="text-[11px] font-medium truncate">
          {title}
        </p>

        <p className="text-[10px] text-[var(--ink)]/60 truncate">
          {artist}
        </p>
      </div>
    </button>
  );
}