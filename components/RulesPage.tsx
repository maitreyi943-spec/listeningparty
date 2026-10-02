"use client";

import React from "react";

const rules = [
  "Don't come expecting drama",
  "Be respectful",
  "No hateful speech is allowed",
  "No cussing",
];

const sparkles = [
  { left: "8%", top: "10%", size: "text-xl", rotation: "-12deg" },
  { left: "88%", top: "16%", size: "text-lg", rotation: "10deg" },
  { left: "14%", top: "82%", size: "text-lg", rotation: "12deg" },
  { left: "84%", top: "78%", size: "text-xl", rotation: "-8deg" },
  { left: "50%", top: "92%", size: "text-sm", rotation: "10deg" },
];

// react-pageflip needs each page to be a forwardRef component
const RulesPage = React.forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="relative h-full w-full overflow-hidden bg-[#f8eee9]"
      style={{ containerType: "inline-size" }}
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 -top-24 h-[300px] w-[300px] rounded-full bg-[#e8c4cb] opacity-40 blur-3xl" />
        <div className="absolute -bottom-28 -left-16 h-[320px] w-[320px] rounded-full bg-[#ead8c8] opacity-45 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff8f3] opacity-80 blur-3xl" />
      </div>

      {/* SPARKLES */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {sparkles.map((s, i) => (
          <span
            key={i}
            className={`absolute ${s.size} select-none text-[#a66d7e] opacity-60`}
            style={{
              left: s.left,
              top: s.top,
              transform: `rotate(${s.rotation})`,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      {/* CONTENT */}
      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center px-8 text-center">
        <p
          className="mb-2 text-[10px] font-medium uppercase tracking-[0.4em]  text-[#4A2C3F]"
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          House 
        </p>

        <h1
          className="font-semibold leading-none tracking-[-0.01em] text-[#641033]"
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(1.8rem, 12cqw, 3rem)",
          }}
        >
          Rules
        </h1>

        <div className="my-4 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-[#c9a0aa]" />
          <span className="h-2 w-2 rotate-45 bg-[#967080]" />
          <span className="h-px w-10 bg-[#c9a0aa]" />
        </div>

        <ul className="flex w-full max-w-[260px] flex-col gap-3">
          {rules.map((rule) => (
            <li
              key={rule}
              className="flex items-center gap-3 rounded-2xl border border-[#e8c4cb] bg-[#fff8f3]/80 px-4 py-3 text-left text-sm text-[#641033] shadow-[0_2px_8px_rgba(150,95,115,0.12)]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              <span className="shrink-0  text-[#4A2C3F]">✦</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

RulesPage.displayName = "RulesPage";

export default RulesPage;