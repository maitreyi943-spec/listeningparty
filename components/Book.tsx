"use client";

import React, { useRef, useState } from "react";

import HTMLFlipBook from "react-pageflip";
import BookCover from "./BookCover";
import WelcomePage from "./WelcomePage";
import RulesPage from "./RulesPage";
import MusicPage from "./MusicPage";
import RSVPForm from "./RSVPform";
import ArtistsPosterPage from "./ArtistsPosterPage";

export default function Book() {
  const flipBookRef = useRef<any>(null);
  const [page, setPage] = useState(0);

  const openBook = () => {
    flipBookRef.current?.pageFlip()?.flipNext();
  };

  const totalPages = 6; // cover + 5 pages

  return (
    <div className="flex flex-col items-center gap-4">
      {/* @ts-expect-error react-pageflip has incorrect TypeScript types */}
      <HTMLFlipBook
        ref={flipBookRef}
        width={340}
        height={480}
        size="stretch"
        minWidth={280}
        maxWidth={420}
        minHeight={400}
        maxHeight={600}
        showCover={true}
        flippingTime={1800} // flip duration in ms (default is 1000), raise to slow it down
        onFlip={(e: any) => setPage(e.data)}
        className="page-shadow"
      >
        <BookCover onOpen={openBook} />
        <WelcomePage />
        <RulesPage />
        <ArtistsPosterPage />
        <MusicPage />
        <RSVPForm />
      </HTMLFlipBook>

      <div className="flex items-center gap-4 text-xs text-[var(--paper)]/70">
        <button onClick={() => flipBookRef.current?.pageFlip()?.flipPrev()}>
          ← prev
        </button>
        <span>
          {page + 1} / {totalPages}
        </span>
        <button onClick={() => flipBookRef.current?.pageFlip()?.flipNext()}>
          next →
        </button>
      </div>
    </div>
  );
}