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
        self-start h-fit flex flex-col text-left rounded-md overflow-hidden border
        transition-all duration-200
        ${
          selected
            ? "border-[var(--accent-deep)] scale-95"
            : "border-black/10"
        }
      `}
    >
      <div className="relative w-full aspect-square shrink-0">
        <Image
          src={cover}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, 300px"
          className="object-cover"
        />
      </div>

      <div className="shrink-0 px-1.5 pt-1.5 pb-2">
        <p className="text-[11px] font-medium leading-tight truncate">
          {title}
        </p>

        <p className="text-[10px] leading-tight text-[var(--ink)]/60 truncate">
          {artist}
        </p>
      </div>
    </button>
  );
}