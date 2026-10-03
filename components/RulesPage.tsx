"use client";

import React from "react";

const rules = [
  "Don't come expecting drama",
  "Be respectful",
  "No hateful speech is allowed",
  "No cussing",
];

const RulesPage = React.forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="
        relative
        h-full
        w-full
        overflow-hidden
        bg-[#E8C4C9]
      "
      style={{ containerType: "inline-size" }}
    >
      {/* SOFT PAPER GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[75%]
          w-[75%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#f8eee9]
          opacity-25
          blur-3xl
        "
      />

      {/* SMALL DECORATIVE CORNERS */}

      <div
        className="
          pointer-events-none
          absolute
          left-7
          top-7
          h-10
          w-10
          border-l
          border-t
          border-[#967080]
          opacity-35
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-7
          right-7
          h-10
          w-10
          border-b
          border-r
          border-[#967080]
          opacity-35
        "
      />

      {/* MAIN CONTENT */}

      <div
        className="
          relative
          z-10
          flex
          h-full
          w-full
          flex-col
          items-center
          px-8
          pb-10
          pt-10
          text-center
        "
      >
        {/* SMALL LABEL */}

        <p
          className="
            mb-2
            text-[9px]
            font-medium
            uppercase
            tracking-[0.42em]
            text-[#4A2C3F]
            opacity-75
          "
          style={{
            fontFamily: "Arial, sans-serif",
          }}
        >
          House
        </p>

        {/* TITLE */}

        <h1
          className="
            m-0
            text-[#641033]
            font-semibold
            leading-none
            tracking-[-0.025em]
          "
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(2.4rem, 11cqw, 4.2rem)",
          }}
        >
          Rules
        </h1>

        {/* DIVIDER */}

        <div className="mt-5 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-[#641033] opacity-45" />

          <span
            className="
              h-[8px]
              w-[8px]
              rotate-45
              bg-[#641033]
              opacity-65
            "
          />

          <span className="h-px w-12 bg-[#641033] opacity-45" />
        </div>

        {/* RULE LIST */}

        <div
          className="
            mt-8
            w-full
            max-w-[320px]
            text-left
          "
        >
          {rules.map((rule, index) => (
            <div
              key={rule}
              className="
                group
                relative
                border-b
                border-[#967080]
                border-opacity-40
                py-5
              "
            >
              <div className="flex items-start gap-4">
                {/* NUMBER */}

                <span
                  className="
                    mt-[3px]
                    w-5
                    shrink-0
                    text-[9px]
                    font-medium
                    tracking-[0.12em]
                    text-[#641033]
                    opacity-65
                  "
                  style={{
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  0{index + 1}
                </span>

                {/* RULE */}

                <p
                  className="
                    m-0
                    text-[15px]
                    leading-[1.45]
                    text-[#4A2C3F]
                  "
                  style={{
                    fontFamily:
                      "Georgia, 'Times New Roman', serif",
                  }}
                >
                  {rule}
                </p>
              </div>

              {/* LITTLE ACCENT */}

              <span
                className="
                  absolute
                  bottom-[-1px]
                  left-0
                  h-[2px]
                  w-0
                  bg-[#641033]
                  opacity-60
                  transition-all
                  duration-300
                  group-hover:w-8
                "
              />
            </div>
          ))}
        </div>

        {/* BOTTOM NOTE */}

        <p
          className="
            mt-7
            text-[8px]
            uppercase
            tracking-[0.25em]
            text-[#4A2C3F]
            opacity-55
          "
          style={{
            fontFamily: "Arial, sans-serif",
          }}
        >
          we'll have fun
        </p>
      </div>
    </div>
  );
});

RulesPage.displayName = "RulesPage";

export default RulesPage;