"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { IMAGES } from "@/lib/images";

type LoaderProps = {
  onComplete?: () => void;
  onSelect?: (choice: "events" | "catering") => void;
};

export function Loader({ onComplete, onSelect }: LoaderProps) {
  const [isExiting, setIsExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while loader is visible and hide scrollbar
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalScrollbarWidth = document.body.style.scrollbarWidth;
    const originalMsOverflow = (document.body.style as any).msOverflowStyle;
    
    document.body.style.overflow = "hidden";
    document.body.style.scrollbarWidth = "none";
    (document.body.style as any).msOverflowStyle = "none";
    
    // Also hide scrollbar on html element
    const html = document.documentElement;
    const originalHtmlOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    html.style.scrollbarWidth = "none";
    (html.style as any).msOverflowStyle = "none";
    
    // Add CSS to hide WebKit scrollbar
    const style = document.createElement("style");
    style.innerHTML = `
      body::-webkit-scrollbar { display: none !important; }
      html::-webkit-scrollbar { display: none !important; }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.scrollbarWidth = originalScrollbarWidth;
      (document.body.style as any).msOverflowStyle = originalMsOverflow;
      
      html.style.overflow = originalHtmlOverflow;
      html.style.scrollbarWidth = "auto";
      (html.style as any).msOverflowStyle = "auto";
      
      document.head.removeChild(style);
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
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            onComplete?.();
          },
        });
      }
    },
    [isExiting, onSelect, onComplete]
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-primary-orange"
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
        <div className="flex items-center gap-6 md:gap-10 lg:gap-14">
          {/* EVENTS button */}
          <button
            onClick={() => handleSelect("events")}
            className="loader-text text-warm-white transition-opacity hover:opacity-70"
          >
            <span className="text-xs font-bold uppercase md:text-sm">
              EVENTS
            </span>
          </button>

          {/* Logo */}
          <div className="relative z-10 h-48 w-72 md:h-56 md:w-80 lg:h-64 lg:w-96">
            {/* Logo image */}
            <div className="absolute inset-0 z-20">
              <Image
                src="/mp3-logo-new.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 24rem, (min-width: 768px) 20rem, 18rem"
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
                sizes="(min-width: 1024px) 24rem, (min-width: 768px) 20rem, 18rem"
                className="object-cover"
                quality={85}
                priority
              />
            </div>
          </div>

          {/* CATERING button */}
          <button
            onClick={() => handleSelect("catering")}
            className="loader-text text-warm-white transition-opacity hover:opacity-70"
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
