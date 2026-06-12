"use client";

import Image from "next/image";

const HEADLINE_LINES = [
  { text: "SOBER", orange: false },
  { text: "IS THE", orange: false },
  { text: "NEW", orange: false },
  { text: "WASTED.", orange: true },
];

export function Hero() {
  return (
    <section
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden"
      aria-label="Hero"
    >
      {/* Image layer — clean orange background, no blend-mode overlays */}
      <div className="absolute inset-0 bg-primary-orange">
        <Image
          src="/hero-bg.png"
          alt="Crowd at MP3 Social event with torn paper effect"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
          quality={90}
        />
        {/* Top gradient for readability */}
        <div
          className="absolute inset-x-0 top-0 h-1/2"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0) 100%)",
          }}
        />
      </div>

      {/* Text layer — same stacking context as image for blend mode */}
      <div className="absolute inset-0 flex h-full flex-col items-start justify-center pl-4 pr-6 md:pl-8 md:pr-12 lg:pl-10 lg:pr-16">
        <h1 className="heading-display text-[clamp(2rem,6.6vw,4.8rem)]">
          {HEADLINE_LINES.map((line, i) => (
            <span key={i} className="hero-line">
              {line.orange ? (
                <span className="text-primary-orange">{line.text}</span>
              ) : (
                <span className="text-warm-white mix-blend-difference">
                  {line.text}
                </span>
              )}
            </span>
          ))}
        </h1>
      </div>

      {/* Side quote box */}
      <div
        className="absolute right-6 top-1/2 hidden -translate-y-1/2 md:block"
        aria-hidden="true"
        style={{ animation: "fade-in 0.8s ease-out 1.5s both" }}
      >
        <div className="relative flex flex-col items-center px-3 py-4">
          {/* Top dots */}
          <div className="mb-6 flex flex-col items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary-orange" />
            <span className="h-2 w-2 rounded-full border border-warm-white/70" />
            <span className="h-2 w-2 rounded-full border border-warm-white/70" />
          </div>

          {/* Vertical quote text — bottom to top, 2 columns */}
          <span
            className="text-[9px] font-medium uppercase leading-[1.4] tracking-[0.18em] text-warm-white/85"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            <span style={{ display: "block" }}>
              IT&apos;S NOT ABOUT DRINKING.
            </span>
            <span style={{ display: "block" }}>
              IT&apos;S ABOUT NOT GIVING A F*CK.
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
