"use client";

import React from "react";
import QRCode from "react-qr-code";

type Props = {
  name: string;
  seat: number;
  ticketId: string;
};

const Ticket = ({ name, seat, ticketId }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <p className="text-[10px] tracking-[0.25em] uppercase text-[var(--accent-deep)] mb-2">
        Seat reserved!
      </p>

      <h2 className="font-serif text-2xl mb-6">
        You're on the list.
      </h2>

      <div className="border-2 border-dashed border-[var(--accent-deep)]/40 rounded-lg p-6 w-full max-w-[260px]">
        <p className="text-[10px] tracking-[0.3em] text-[var(--ink)]/50 mb-2">
          THE LISTENING PARTY
        </p>

        <h3 className="font-serif text-xl mb-4">
          {name}
        </h3>

        <div className="flex justify-center mb-4">
          <QRCode
            value={ticketId}
            size={110}
            bgColor="transparent"
            fgColor="#4a2c30"
          />
        </div>

        <p className="text-xs text-[var(--ink)]/60 mb-1">
          SEAT
        </p>

        <p className="font-serif text-2xl mb-3">
          {String(seat).padStart(2, "0")}
        </p>

        <p className="text-[9px] text-[var(--ink)]/40 tracking-wide">
          Your seat is waiting.
        </p>
      </div>
    </div>
  );
};

export default Ticket;