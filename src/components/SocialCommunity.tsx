"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./Reveal";
import { IMAGES } from "@/lib/images";

export function SocialCommunity() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-warm-white px-3 pb-3 sm:px-5 sm:pb-5"
      aria-label="Social community"
    >
      <div className="relative mx-auto h-[55vh] min-h-[360px] w-full max-w-[80rem] overflow-hidden rounded-[1.5rem] md:h-[60vh] md:min-h-[420px]">
        <motion.div
          className="absolute inset-0 chromatic-aberration"
          style={{ y, scale: 1.1 }}
        >
          <Image
            src={IMAGES.community}
            alt="Crowd at MP3 Social community gathering"
            fill
            sizes="100vw"
            className="object-cover"
            quality={85}
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.25)" }}
          />
          <div className="dust-specks" />
        </motion.div>

        <div className="absolute left-4 right-4 top-6 z-10 flex items-center justify-between text-warm-white md:left-8 md:right-8 md:top-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] md:text-xs">
            Follow us on social media
          </span>
          <div className="flex items-center gap-3 md:gap-4">
            <a
              href="#"
              aria-label="YouTube"
              className="transition-transform hover:scale-115"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-warm-white md:h-5 md:w-5"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="TikTok"
              className="transition-transform hover:scale-115"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-warm-white md:h-[18px] md:w-[18px]"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.62a8.16 8.16 0 0 0 4.77 1.52V6.69a4.85 4.85 0 0 1-1.84 0z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="transition-transform hover:scale-115"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="md:h-5 md:w-5"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="5"
                  stroke="currentColor"
                  fill="none"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  fill="none"
                />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>

        <div className="absolute inset-x-4 bottom-6 z-10 grid grid-cols-2 gap-4 md:inset-x-8 md:bottom-10 lg:gap-12">
          <Reveal delay={0.1}>
            <h2 className="heading-display text-warm-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
              NOT A CLUB
              <br />
              SOMEWHERE IN
            </h2>
          </Reveal>
          <Reveal delay={0.25}>
            <h2 className="heading-display text-warm-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl md:text-right">
              NOT A CAFE
              <br />
              BETWEEN
            </h2>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
