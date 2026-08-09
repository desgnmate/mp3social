"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { IMAGES } from "@/lib/images";

type LoaderProps = {
  onSelect?: (choice: "events" | "catering") => void;
};

export function Loader({ onSelect }: LoaderProps) {
  const [isExiting, setIsExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const html = document.documentElement;
    const originalHtmlOverflow = html.style.overflow;

    document.body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
      html.style.overflow = originalHtmlOverflow;
    };
  }, []);

  const handleSelect = useCallback(
    (choice: "events" | "catering") => {
      if (isExiting) return;
      setIsExiting(true);
      onSelect?.(choice);

      if (containerRef.current) {
        gsap.to(containerRef.current, {
          y: "-100%",
          duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.7,
          ease: "power2.inOut",
          onComplete: () => {
            window.location.assign(`/${choice}`);
          },
        });
      }
    },
    [isExiting, onSelect]
  );

  return (
    <div
      ref={containerRef}
      className="paper-texture fixed inset-0 z-[9999] overflow-hidden bg-primary-orange"
    >
      {/* Top bar */}
      <div className="loader-text absolute inset-x-6 top-6 z-20 flex items-center justify-between text-warm-white md:inset-x-10 md:top-8">
        <span className="text-[10px] font-bold uppercase md:text-xs">
          NOT A CLUB
        </span>
        <span className="text-[10px] font-bold uppercase md:text-xs">
          2026
        </span>
        <span className="text-[10px] font-bold uppercase md:text-xs">
          NOT A CAFE
        </span>
      </div>

      {/* Center area: EVENTS button + logo + CATERING button */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="flex items-center gap-2 md:gap-5 lg:gap-7">
          {/* EVENTS button */}
          <button
            onClick={() => handleSelect("events")}
            disabled={isExiting}
            className="loader-text inline-flex min-h-11 min-w-16 items-center justify-center rounded-full border border-warm-white/45 bg-warm-white/5 px-3 text-warm-white backdrop-blur-sm transition-[background-color,border-color,opacity,transform] hover:border-warm-white/80 hover:bg-warm-white/15 hover:opacity-100 active:scale-95 disabled:pointer-events-none disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-warm-white"
          >
            <span className="text-xs font-bold uppercase md:text-sm">
              EVENTS
            </span>
          </button>

          {/* Logo */}
          <div className="relative z-10 h-24 w-36 md:h-32 md:w-48 lg:h-40 lg:w-64">
            {/* Logo image */}
            <div className="absolute inset-0 z-20">
              <Image
                src="/mp3-logo-new.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 16rem, (min-width: 768px) 12rem, 9rem"
                className="object-contain"
                quality={100}
                priority
              />
            </div>

            {/* Hero image inside the logo (masked) */}
            <div
              className="absolute inset-0 z-10"
              style={{
                maskImage: "url(/mp3-logo-new.png)",
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskImage: "url(/mp3-logo-new.png)",
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
              }}
            >
              <Image
                src={IMAGES.community}
                alt=""
                fill
                sizes="(min-width: 1024px) 16rem, (min-width: 768px) 12rem, 9rem"
                className="object-cover"
                quality={85}
                priority
              />
            </div>
          </div>

          {/* CATERING button */}
          <button
            onClick={() => handleSelect("catering")}
            disabled={isExiting}
            className="loader-text inline-flex min-h-11 min-w-16 items-center justify-center rounded-full border border-warm-white/45 bg-warm-white/5 px-3 text-warm-white backdrop-blur-sm transition-[background-color,border-color,opacity,transform] hover:border-warm-white/80 hover:bg-warm-white/15 hover:opacity-100 active:scale-95 disabled:pointer-events-none disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-warm-white"
          >
            <span className="text-xs font-bold uppercase md:text-sm">
              CATERING
            </span>
          </button>
        </div>
      </div>

      {/* Bottom bar with centered MP3 SOCIAL */}
      <div className="loader-text absolute inset-x-6 bottom-6 z-20 flex items-end justify-center text-warm-white md:inset-x-10 md:bottom-8">
        <span className="absolute left-0 text-[10px] font-bold uppercase md:text-xs">
          ALL RIGHTS RESERVED
        </span>
        <span className="heading-display text-xl font-black uppercase md:text-2xl">
          MP3 SOCIAL
        </span>
        <span className="absolute right-0 text-[10px] font-bold uppercase md:text-xs">
          LOADING
        </span>
      </div>
    </div>
  );
}
