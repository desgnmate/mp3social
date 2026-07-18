"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type EventData = {
  title: string;
  date: string;
  location: string;
  description: string;
  highlights: string[];
  attendees: number;
};

const EVENTS: EventData[] = [
  {
    title: "10 AM ENERGY",
    date: "Every Saturday · 10:00 AM",
    location: "MP3 Social HQ",
    description: "Start your weekend with electrifying beats and matcha lattes. Our signature morning rave experience.",
    highlights: [
      "Live DJ sets",
      "Free matcha for early birds",
      "Polaroid photo wall",
      "Community breakfast",
    ],
    attendees: 150,
  },
  {
    title: "GOOD VIBES",
    date: "Every Sunday · 11:00 AM",
    location: "MP3 Social Rooftop",
    description: "Chill grooves, good company, and the best Sunday morning energy in the city.",
    highlights: [
      "Acoustic sets",
      "Yoga warmup",
      "Fresh pastries",
      "Sunrise views",
    ],
    attendees: 120,
  },
  {
    title: "MATCHA HOUR",
    date: "Wednesdays · 9:00 AM",
    location: "The Green Room",
    description: "Where matcha meets music. A mid-week recharge session for the creative community.",
    highlights: [
      "Premium matcha bar",
      "Ambient music curation",
      "Networking sessions",
      "Wellness workshops",
    ],
    attendees: 80,
  },
  {
    title: "MORNING RAVE",
    date: "First Friday · 8:00 AM",
    location: "Warehouse District",
    description: "The ultimate pre-work party. Dance before your 9-to-5 and carry that energy all day.",
    highlights: [
      "Underground DJs",
      "Cold brew coffee",
      "Dancefloor lighting",
      "Power hour playlist",
    ],
    attendees: 200,
  },
  {
    title: "NO SLEEP",
    date: "Special Events · Late Night",
    location: "Secret Location",
    description: "For the night owls. Exclusive late-night gatherings that keep the energy alive.",
    highlights: [
      "Secret lineups",
      "Midnight snacks",
      "Immersive installations",
      "After-hours community",
    ],
    attendees: 250,
  },
];

export function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);

  const [openModal, setOpenModal] = useState<number | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (openModal !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [openModal]);

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current) return;

      const ctx = gsap.context(() => {
        const track = trackRef.current!;
        const section = sectionRef.current!;
        const VW = window.innerWidth;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: "top top",
            end: () => `+=${(track.scrollWidth - VW) * 1.2}`,
            scrub: 2.25,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Track: 0 → -690vw
        tl.to(track, { x: -VW * 6.9, ease: "none", duration: 690 }, 0);

        // ── P1 lock ──
        tl.to(text1Ref.current!, { x: VW * 0.4, ease: "none", duration: 40 }, 0);
        tl.to(text1Ref.current!, { x: 0, ease: "none", duration: 20 }, 40);

        // ── P2 lock: hold the entire three-polaroid sequence ──
        tl.to(
          text2Ref.current!,
          { x: VW * 3.35, ease: "none", duration: 335 },
          200,
        );

        // ── 3 images ──
        const images = [
          img1Ref.current!,
          img2Ref.current!,
          img3Ref.current!,
        ];
        const rotations = [-3, 2, -2];

        images.forEach((img, i) => {
          if (!img) return;
          gsap.set(img, {
            x: VW * 0.42,
            scale: 0.8,
            rotation: rotations[i] * 1.35,
            opacity: 0,
            filter: "blur(3px)",
            left: "50%", top: "50%", xPercent: -50, yPercent: -50,
          });
        });

        images.forEach((img, i) => {
          if (!img) return;
          const start = 215 + i * 120;

          tl.to(
            img,
            {
              x: 0,
              scale: 1,
              rotation: rotations[i],
              opacity: 1,
              filter: "blur(0px)",
              ease: "power1.inOut",
              duration: 55,
            },
            start,
          );
          tl.to(
            img,
            {
              x: -VW * 0.42,
              scale: 0.86,
              rotation: rotations[i] * 0.35,
              opacity: 0,
              filter: "blur(3px)",
              ease: "power1.inOut",
              duration: 55,
            },
            start + 75,
          );
        });

        // ── P2 unlock, P4 lock ──
        tl.to(text2Ref.current!, { x: 0, ease: "none", duration: 40 }, 535);
        tl.to(text4Ref.current!, { x: VW, ease: "none", duration: 100 }, 590);
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef }
  );

  const imagesData = [
    { ref: img1Ref, img: "/community-bg.jpg", label: "10 AM ENERGY" },
    { ref: img2Ref, img: "/calendar-bg.jpg", label: "GOOD VIBES" },
    { ref: img3Ref, img: "/hero-bg.png", label: "MATCHA HOUR" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative h-[100vh] w-full overflow-hidden bg-primary-orange"
      aria-label="About"
    >
      <div className="dust-specks" />

      {/* ── Panel 3 overlay — 3 photos ── */}
      <div className="absolute inset-0 z-20">
        {imagesData.map(({ ref, img, label }, i) => (
          <div
            key={i}
            ref={ref}
            className="absolute h-[36vh] w-[20vw] max-w-[280px] cursor-pointer bg-warm-white p-3 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-transform hover:scale-105"
            style={{ willChange: "transform, filter, opacity" }}
            onClick={() => setOpenModal(i)}
          >
            <div className="relative h-[calc(100%-1.75rem)] w-full overflow-hidden">
              <Image src={img} alt={label} fill sizes="20vw" className="object-cover" quality={85} />
            </div>
            <p className="mt-2 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-primary-orange">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="absolute top-0 left-0 z-10 flex h-full"
        style={{ width: "790vw" }}
      >
        {/* ── Panel 1 ── */}
        <div
          ref={text1Ref}
          className="relative flex h-full w-[100vw] items-center justify-center px-6 md:px-12"
          style={{ zIndex: 10, willChange: "transform" }}
        >
          <h2 className="heading-display text-center text-warm-white text-[clamp(2.5rem,7vw,6rem)] leading-[1.05]">
            YES IT&apos;S A RAVE.
            <br />
            YES IT&apos;S 10 AM.
          </h2>
        </div>

        {/* ── spacers & panels ── */}
        <div className="flex-shrink-0 w-[100vw]" aria-hidden="true" />

        {/* ── Panel 2 ── */}
        <div
          ref={text2Ref}
          className="flex h-full w-[100vw] items-center justify-center px-6 md:px-12"
          style={{ zIndex: 10, willChange: "transform" }}
        >
          <h2 className="heading-display text-center text-warm-white text-[clamp(2.5rem,7vw,6rem)] leading-[1.05]">
            NO WE WON&apos;T
            <br />
            EXPLAIN IT AGAIN.
          </h2>
        </div>

        <div className="flex-shrink-0 w-[290vw]" aria-hidden="true" />

        {/* ── Panel 4 ── */}
        <div
          ref={text4Ref}
          className="flex h-full w-[100vw] items-center justify-center px-6 md:px-12"
          style={{ zIndex: 10, willChange: "transform" }}
        >
          <div className="flex flex-col items-center gap-6 text-center md:gap-8">
            <div className="relative h-20 w-32 flex-shrink-0 md:h-24 md:w-40 lg:h-28 lg:w-48">
              <Image src="/mp3-logo.png" alt="MP3 Social" fill sizes="(min-width: 1024px) 12rem, (min-width: 768px) 10rem, 8rem" className="object-contain" quality={100} />
            </div>
            <div className="max-w-2xl">
              <h2 className="heading-display text-warm-white text-[clamp(1.65rem,3.85vw,3.3rem)] leading-[1.1]">
                MATCHA IN HAND. MUSIC UP. STRANGERS TURNING INTO FRIENDS BEFORE NOON.
              </h2>
            </div>
            <a href="#calendar" className="inline-block border-2 border-warm-white bg-warm-white px-6 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.25em] text-primary-orange transition-colors hover:bg-primary-orange hover:text-warm-white md:px-8 md:py-3 md:text-xs">
              SEE NEXT EVENT
            </a>
          </div>
        </div>

        <div className="flex-shrink-0 w-[100vw]" aria-hidden="true" />
      </div>

      {/* ── Event Modal Overlay ── */}
      {openModal !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setOpenModal(null)}
        >
          <div
            className="relative mx-4 w-full max-w-[340px] overflow-hidden rounded-lg shadow-2xl"
            style={{ backgroundColor: "#EBDEC2" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setOpenModal(null)}
              className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/30 text-white transition-colors hover:bg-black/50"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Instagram Header */}
            <div className="flex items-center gap-2.5 border-b border-black/10 px-3.5 py-2.5">
              <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-black/10 bg-primary-orange">
                <Image src="/mp3-logo.png" alt="MP3" width={28} height={28} className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-dark-text">mp3social</span>
                <span className="text-[9px] text-dark-text/60">{EVENTS[openModal].location}</span>
              </div>
            </div>

            {/* Instagram Image - Compact */}
            <div className="relative aspect-[3/2] w-full overflow-hidden bg-black/5">
              <Image
                src={imagesData[openModal].img}
                alt={EVENTS[openModal].title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 340px"
              />
            </div>

            {/* Instagram Actions */}
            <div className="flex items-center justify-between px-3.5 py-2">
              <div className="flex items-center gap-3">
                <button className="text-dark-text transition-transform hover:scale-110">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button className="text-dark-text transition-transform hover:scale-110">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>
                <button className="text-dark-text transition-transform hover:scale-110">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <button className="text-dark-text transition-transform hover:scale-110">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            </div>

            {/* Instagram Content - All visible at once */}
            <div className="px-3.5 pb-3.5">
              <p className="text-xs font-bold text-dark-text">
                {EVENTS[openModal].attendees} likes
              </p>

              <div className="mt-1">
                <p className="text-xs leading-relaxed text-dark-text">
                  <span className="font-bold">mp3social</span>{" "}
                  <span className="font-black uppercase tracking-tight">{EVENTS[openModal].title}</span>.{" "}
                  {EVENTS[openModal].description}
                </p>
              </div>

              <p className="mt-1.5 text-[11px] text-primary-orange">
                {EVENTS[openModal].highlights.map((h) => `#${h.replace(/\s+/g, "").toLowerCase()}`).join(" ")}
              </p>

              <p className="mt-1.5 text-[10px] uppercase tracking-wider text-dark-text/40">
                {EVENTS[openModal].date}
              </p>
            </div>

            {/* Instagram Add Comment Bar */}
            <div className="flex items-center gap-2.5 border-t border-black/10 px-3.5 py-2">
              <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-primary-orange">
                <Image src="/mp3-logo.png" alt="MP3" width={24} height={24} className="object-contain" />
              </div>
              <span className="text-xs text-dark-text/50">Add a comment...</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
