"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Ticket from "./Ticket";

type Status = "idle" | "loading" | "success" | "full" | "error";

const CAPACITY = 10;

const stopFlip = {
  onPointerDownCapture: (e: React.PointerEvent) => {
    e.stopPropagation();
  },

  onMouseDownCapture: (e: React.MouseEvent) => {
    e.stopPropagation();
  },

  onTouchStartCapture: (e: React.TouchEvent) => {
    e.stopPropagation();
  },

  onClickCapture: (e: React.MouseEvent) => {
    e.stopPropagation();
  },
};

const RSVPForm = React.forwardRef<HTMLDivElement>((_, ref) => {
  const [name, setName] = useState("");
  const [food, setFood] = useState("");
  const [song1, setSong1] = useState("");
  const [song2, setSong2] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [seatsTaken, setSeatsTaken] = useState<number | null>(null);

  const [ticketData, setTicketData] = useState<{
    id: string;
    name: string;
    seat: number;
  } | null>(null);

  // ----------------------------------------
  // Get current number of RSVPs
  // ----------------------------------------

  const fetchSeatCount = async () => {
    const { data, error } = await supabase.rpc("get_rsvp_count");

    if (error) {
      console.error("Failed to get RSVP count:", error);
      return null;
    }

    return data ?? 0;
  };

  // ----------------------------------------
  // Load seat count when page opens
  // ----------------------------------------

  useEffect(() => {
    const loadCount = async () => {
      const count = await fetchSeatCount();

      if (count !== null) {
        setSeatsTaken(count);
      }
    };

    loadCount();
  }, []);

  // ----------------------------------------
  // Submit RSVP
  // ----------------------------------------

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (status === "loading") return;

    setStatus("loading");

    // Check current number of seats
    const currentCount = await fetchSeatCount();

    if (currentCount === null) {
      setStatus("error");
      return;
    }

    // Event is full
    if (currentCount >= CAPACITY) {
      setSeatsTaken(currentCount);
      setStatus("full");
      return;
    }

    // Create a ticket ID locally.
    // This means we do not need public SELECT access
    // to the newly inserted RSVP.
    const ticketId = crypto.randomUUID();

    const { error } = await supabase
      .from("rsvps")
      .insert([
        {
          id: ticketId,
          name,
          food,
          song_request_1: song1,
          song_request_2: song2,
        },
      ]);

    if (error) {
      console.error("RSVP insert failed:", error);
      setStatus("error");
      return;
    }

    // Seat number is the next available number.
    const assignedSeat = currentCount + 1;

    setTicketData({
      id: ticketId,
      name,
      seat: assignedSeat,
    });

    setSeatsTaken(assignedSeat);
    setStatus("success");
  };

  return (
    <div
      ref={ref}
      className="w-full h-full paper overflow-hidden flex flex-col justify-center px-8 relative"
      style={{
        touchAction: "auto",
        pointerEvents: "auto",
      }}
      {...stopFlip}
    >
      {status === "success" && ticketData ? (
        // ----------------------------------------
        // SUCCESS / TICKET VIEW
        // ----------------------------------------
        <Ticket
          name={ticketData.name}
          seat={ticketData.seat}
          ticketId={ticketData.id}
        />
      ) : (
        // ----------------------------------------
        // RSVP FORM VIEW
        // ----------------------------------------
        <>
          <h2 className="font-serif text-2xl mb-1 text-center">
            RSVP
          </h2>

          <p className="text-xs text-center text-[var(--ink)]/60 mb-6">
            {seatsTaken !== null
              ? `${seatsTaken}/${CAPACITY} seats claimed`
              : "Only 10 seats."}
          </p>

          {status === "full" ? (
            <p className="text-center text-sm text-[var(--accent-deep)] font-medium">
              All 10 seats have been claimed.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 relative z-20"
              style={{
                pointerEvents: "auto",
                touchAction: "manipulation",
              }}
              {...stopFlip}
            >
              <input
                required
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-b border-black/30 py-2 text-sm outline-none text-[var(--ink)] placeholder:text-[var(--ink)]/50"
                autoComplete="name"
                {...stopFlip}
              />

              <input
                type="text"
                placeholder="What are you bringing?"
                value={food}
                onChange={(e) => setFood(e.target.value)}
                className="w-full bg-transparent border-b border-black/30 py-2 text-sm outline-none text-[var(--ink)] placeholder:text-[var(--ink)]/50"
                {...stopFlip}
              />

              <input
                type="text"
                placeholder="Song request #1"
                value={song1}
                onChange={(e) => setSong1(e.target.value)}
                className="w-full bg-transparent border-b border-black/30 py-2 text-sm outline-none text-[var(--ink)] placeholder:text-[var(--ink)]/50"
                {...stopFlip}
              />

              <input
                type="text"
                placeholder="Song request #2"
                value={song2}
                onChange={(e) => setSong2(e.target.value)}
                className="w-full bg-transparent border-b border-black/30 py-2 text-sm outline-none text-[var(--ink)] placeholder:text-[var(--ink)]/50"
                {...stopFlip}
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full mt-4 py-2 bg-[var(--accent-deep)] text-white text-sm tracking-wide transition-opacity hover:opacity-90 disabled:opacity-50"
                {...stopFlip}
              >
                {status === "loading"
                  ? "Saving your seat..."
                  : "Reserve my seat"}
              </button>

              {status === "error" && (
                <p className="text-center text-xs text-red-600">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}
        </>
      )}
    </div>
  );
});

RSVPForm.displayName = "RSVPForm";

export default RSVPForm;