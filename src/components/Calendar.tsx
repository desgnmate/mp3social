"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  CALENDAR_EVENTS,
  MONTHS,
  type CalendarEvent,
} from "@/lib/calendar-data";
import { EventModal } from "./EventModal";

gsap.registerPlugin(ScrollTrigger);

const EVENT_IMAGES = [
  "/community-bg.jpg",
  "/calendar-bg.jpg",
  "/hero-bg.png",
];

export function Calendar() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [monthIndex, setMonthIndex] = useState(4);
  const [year, setYear] = useState(2026);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const visibleEvents = useMemo(
    () =>
      year === 2026
        ? CALENDAR_EVENTS.filter((event) => event.month === monthIndex)
        : [],
    [monthIndex, year],
  );

  const previewEvent = visibleEvents[previewIndex] ?? null;
  const previewImage = EVENT_IMAGES[previewIndex % EVENT_IMAGES.length];

  useEffect(() => {
    setPreviewIndex(0);
  }, [monthIndex, year]);

  useGSAP(
    () => {
      if (
        !sectionRef.current ||
        !headingRef.current ||
        !imageRef.current ||
        !listRef.current
      ) {
        return;
      }

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) return;

      const headingItems = Array.from(headingRef.current.children);
      const eventRows = gsap.utils.toArray<HTMLElement>("[data-event-row]");

      gsap.from(headingItems, {
        y: 54,
        opacity: 0,
        duration: 1.15,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(imageRef.current, {
        clipPath: "inset(12% 12% 12% 12%)",
        scale: 0.96,
        opacity: 0,
        duration: 1.35,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(eventRows, {
        y: 42,
        opacity: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 78%",
          once: true,
        },
      });

      gsap.to(imageRef.current, {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    },
    { scope: sectionRef },
  );

  const shiftMonth = (amount: number) => {
    let nextMonth = monthIndex + amount;
    let nextYear = year;

    if (nextMonth < 0) {
      nextMonth = 11;
      nextYear -= 1;
    } else if (nextMonth > 11) {
      nextMonth = 0;
      nextYear += 1;
    }

    setMonthIndex(nextMonth);
    setYear(nextYear);
  };

  return (
    <section
      id="calendar"
      ref={sectionRef}
      className="relative overflow-hidden bg-dark-text text-warm-white"
      aria-labelledby="events-title"
    >
      <div className="dust-specks opacity-20" />

      <div className="page-container-wide relative py-20 md:py-28 lg:py-32">
        <div
          ref={headingRef}
          className="grid items-end gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20"
        >
          <div>
            <p className="label-caps text-warm-white/55">
              MP3 / Events · Melbourne
            </p>
            <h2
              id="events-title"
              className="section-title-clamp heading-display mt-5 text-[clamp(3.75rem,9vw,8rem)] leading-[0.78] tracking-[-0.07em]"
            >
              What&apos;s
              <br />
              <span className="text-primary-orange">on?</span>
            </h2>
          </div>

          <div className="border-t border-warm-white/35 pt-5">
            <p className="max-w-md font-serif text-xl leading-snug text-warm-white/85 md:text-2xl">
              Morning raves, matcha parties and third-space takeovers. Pick a
              date and meet us in the room.
            </p>
            <div className="mt-8 flex items-center justify-between rounded-full border border-warm-white/25 bg-warm-white/5 px-1 py-1">
              <button
                type="button"
                onClick={() => shiftMonth(-1)}
                className="flex h-11 w-11 items-center justify-center rounded-full text-lg text-primary-orange transition-[background-color,transform] hover:-translate-x-1 hover:bg-warm-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-orange"
                aria-label="Previous month"
              >
                ←
              </button>
              <div className="text-center">
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-warm-white/50">
                  Lineup
                </span>
                <span className="mt-1 block text-sm font-black uppercase tracking-[0.14em]">
                  {MONTHS[monthIndex]} {year}
                </span>
              </div>
              <button
                type="button"
                onClick={() => shiftMonth(1)}
                className="flex h-11 w-11 items-center justify-center rounded-full text-lg text-primary-orange transition-[background-color,transform] hover:translate-x-1 hover:bg-warm-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-orange"
                aria-label="Next month"
              >
                →
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 grid overflow-hidden rounded-[1.5rem] border border-warm-white/35 lg:mt-24 lg:grid-cols-[0.9fr_1.1fr]">
          <div
            ref={imageRef}
            className="relative min-h-[520px] overflow-hidden border-b border-warm-white/35 bg-primary-orange lg:min-h-[720px] lg:border-b-0 lg:border-r"
          >
            <Image
              key={previewImage}
              src={previewEvent ? previewImage : "/calendar-bg.jpg"}
              alt={
                previewEvent
                  ? `${previewEvent.title} at MP3 Social`
                  : "MP3 Social matcha event"
              }
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover transition-transform duration-700"
              quality={88}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-dark-text/90 via-dark-text/10 to-dark-text/30"
              aria-hidden="true"
            />

            <div className="absolute left-5 top-5 rounded-full border border-warm-white/50 bg-dark-text/70 px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] backdrop-blur-sm md:left-7 md:top-7">
              Current transmission
            </div>

            <div className="absolute inset-x-0 bottom-0 grid grid-cols-[auto_1fr] items-end gap-5 p-5 md:gap-8 md:p-8">
              <span className="heading-display text-[clamp(4rem,9vw,8rem)] leading-[0.7] text-primary-orange">
                {previewEvent
                  ? String(previewEvent.date).padStart(2, "0")
                  : "—"}
              </span>
              <div className="border-l border-warm-white/45 pl-5 md:pl-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-warm-white/55">
                  {previewEvent ? previewEvent.time : "No date announced"}
                </p>
                <p className="heading-display mt-2 text-2xl md:text-4xl">
                  {previewEvent ? previewEvent.title : "Stay tuned"}
                </p>
              </div>
            </div>
          </div>

          <div ref={listRef} className="bg-cream text-dark-text">
            <div
              data-event-row
              className="flex min-h-20 items-center justify-between border-b border-dark-text/20 px-5 py-4 md:px-7"
            >
              <span className="label-caps">The next three</span>
              <span className="font-serif text-lg italic text-primary-orange">
                {visibleEvents.length
                  ? `${visibleEvents.length} dates`
                  : "No dates yet"}
              </span>
            </div>

            {visibleEvents.length > 0 ? (
              visibleEvents.map((event, index) => (
                <button
                  type="button"
                  data-event-row
                  key={`${event.month}-${event.date}-${event.title}`}
                  onMouseEnter={() => setPreviewIndex(index)}
                  onFocus={() => setPreviewIndex(index)}
                  onClick={() => setSelectedEvent(event)}
                  className={`group grid w-full grid-cols-[4.5rem_1fr_auto] items-center gap-4 border-b border-dark-text/20 px-5 py-7 text-left transition-colors duration-300 last:border-b-0 md:grid-cols-[6rem_1fr_auto] md:gap-7 md:px-7 md:py-10 ${
                    previewIndex === index
                      ? "bg-primary-orange text-warm-white"
                      : "bg-cream text-dark-text hover:bg-primary-orange hover:text-warm-white"
                  }`}
                >
                  <span className="heading-display text-5xl leading-none md:text-7xl">
                    {String(event.date).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.17em] opacity-55">
                      {event.time}
                    </span>
                    <span className="heading-display mt-2 block text-2xl leading-[0.9] md:text-4xl">
                      {event.title}
                    </span>
                    <span className="mt-3 hidden text-xs font-semibold uppercase tracking-[0.12em] opacity-65 sm:block">
                      {event.location}
                    </span>
                  </span>
                  <span
                    className="text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </button>
              ))
            ) : (
              <div
                data-event-row
                className="flex min-h-[420px] flex-col items-start justify-between p-7 md:p-10"
              >
                <p className="heading-display max-w-[12ch] text-4xl text-primary-orange md:text-6xl">
                  Nothing announced. Yet.
                </p>
                <p className="max-w-sm font-serif text-xl leading-snug">
                  The next drop lands here first. Check back soon or follow MP3
                  Social for the room reveal.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </section>
  );
}
