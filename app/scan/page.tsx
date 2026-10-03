
"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { supabase } from "@/lib/supabaseClient";

type Ticket = {
  id: string;
  name: string;
  checked_in: boolean | null;
};

export default function ScanPage() {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const processingRef = useRef(false);

  const [result, setResult] = useState<
    "scanning" | "valid" | "already" | "invalid" | "error"
  >("scanning");

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;

    const startScanner = async () => {
      try {
        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: {
              width: 250,
              height: 250,
            },
          },
          async (decodedText) => {
            await handleScan(decodedText);
          },
          () => {
            // Ignore normal scanning errors.
          }
        );
      } catch (error) {
        console.error("Camera error:", error);

        setResult("error");
        setMessage(
          "Could not access the camera. Please allow camera permission and try again."
        );
      }
    };

    startScanner();

    return () => {
      if (scanner.isScanning) {
        scanner
          .stop()
          .catch((error) =>
            console.error("Scanner stop error:", error)
          );
      }
    };
  }, []);

  const handleScan = async (ticketId: string) => {
    // Prevent the same QR from being processed multiple times.
    if (processingRef.current) return;

    processingRef.current = true;

    const scanner = scannerRef.current;

    // Stop the camera as soon as we get a QR result.
    if (scanner?.isScanning) {
      try {
        await scanner.stop();
      } catch (error) {
        console.error("Scanner stop error:", error);
      }
    }

    try {
      // Find the RSVP using the UUID stored inside the QR code.
      const { data, error } = await supabase
        .from("rsvps")
        .select("id, name, checked_in")
        .eq("id", ticketId)
        .maybeSingle();

      if (error) {
        console.error("Supabase lookup error:", error);

        setResult("error");
        setMessage("Could not check this ticket.");
        return;
      }

      // UUID doesn't exist in the database.
      if (!data) {
        setResult("invalid");
        setTicket(null);
        setMessage("This ticket does not exist.");
        return;
      }

      setTicket(data);

      // Ticket was already scanned before.
      if (data.checked_in === true) {
        setResult("already");
        setMessage("This ticket has already been checked in.");
        return;
      }

      // Mark the ticket as checked in.
      const { error: updateError } = await supabase
        .from("rsvps")
        .update({ checked_in: true })
        .eq("id", ticketId);

      if (updateError) {
        console.error("Check-in update error:", updateError);

        setResult("error");
        setMessage(
          "Ticket found, but it could not be checked in."
        );
        return;
      }

      setResult("valid");
      setMessage("Ticket successfully checked in.");
    } catch (error) {
      console.error("Unexpected scanner error:", error);

      setResult("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  const scanAgain = async () => {
    setResult("scanning");
    setTicket(null);
    setMessage("");
    processingRef.current = false;

    const scanner = scannerRef.current;

    if (!scanner) return;

    try {
      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: {
            width: 250,
            height: 250,
          },
        },
        async (decodedText) => {
          await handleScan(decodedText);
        },
        () => {
          // Ignore normal scanning errors.
        }
      );
    } catch (error) {
      console.error("Scanner restart error:", error);

      setResult("error");
      setMessage("Could not restart the camera.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-[var(--background)] text-[var(--ink)]">
      <div className="w-full max-w-md text-center">

        <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--accent-deep)] mb-3">
          THE LISTENING PARTY
        </p>

        <h1 className="font-serif text-3xl mb-8">
          Ticket Check-In
        </h1>

        {/* CAMERA */}
        {result === "scanning" && (
          <>
            <div
              id="qr-reader"
              className="w-full overflow-hidden rounded-xl border border-[var(--accent-deep)]/30"
            />

            <p className="text-sm text-[var(--ink)]/60 mt-5">
              Point the camera at the QR code on the ticket.
            </p>
          </>
        )}

        {/* VALID TICKET */}
        {result === "valid" && ticket && (
          <div className="border-2 border-[var(--accent-deep)]/30 rounded-xl p-7">

            <p className="text-xs tracking-[0.25em] uppercase mb-5">
              ✓ Valid Ticket
            </p>

            <h2 className="font-serif text-3xl mb-4">
              {ticket.name}
            </h2>

            <p className="text-sm text-[var(--ink)]/60">
              {message}
            </p>

          </div>
        )}

        {/* ALREADY CHECKED IN */}
        {result === "already" && ticket && (
          <div className="border-2 border-[var(--accent-deep)]/30 rounded-xl p-7">

            <p className="text-xs tracking-[0.25em] uppercase mb-5">
              ⚠ Already Checked In
            </p>

            <h2 className="font-serif text-3xl mb-4">
              {ticket.name}
            </h2>

            <p className="text-sm text-[var(--ink)]/60">
              {message}
            </p>

          </div>
        )}

        {/* INVALID TICKET */}
        {result === "invalid" && (
          <div className="border-2 border-red-500/30 rounded-xl p-7">

            <p className="text-xs tracking-[0.25em] uppercase mb-5">
              ✕ Invalid Ticket
            </p>

            <p className="text-sm text-[var(--ink)]/60">
              {message}
            </p>

          </div>
        )}

        {/* ERROR */}
        {result === "error" && (
          <div className="border-2 border-red-500/30 rounded-xl p-7">

            <p className="text-xs tracking-[0.25em] uppercase mb-5">
              Something went wrong
            </p>

            <p className="text-sm text-[var(--ink)]/60">
              {message}
            </p>

          </div>
        )}

        {/* SCAN AGAIN */}
        {result !== "scanning" && (
          <button
            onClick={scanAgain}
            className="mt-6 px-6 py-3 rounded-full border border-[var(--accent-deep)]/40 text-sm"
          >
            Scan Another Ticket
          </button>
        )}

      </div>
    </main>
  );
}

