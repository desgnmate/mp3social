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
  const previewCopyRef = useRef<HTMLDivElement>(null);
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
      if (!headingRef.current || !imageRef.current || !listRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 82%",
          once: true,
        },
      });

      timeline
        .from(headingRef.current.children, {
          y: 48,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
        })
        .from(
          imageRef.current,
          {
            clipPath: "inset(8% 8% 8% 8% round 1.5rem)",
            scale: 0.96,
            opacity: 0,
            duration: 1.1,
            ease: "power3.out",
          },
          "-=0.5",
        );

      gsap.from(gsap.utils.toArray<HTMLElement>("[data-event-row]"), {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 82%",
          once: true,
        },
      });

      gsap.to(imageRef.current, {
        yPercent: -3,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    },
    { scope: sectionRef },
  );

  useGSAP(
    () => {
      if (!imageRef.current || !previewCopyRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const image = imageRef.current.querySelector("img");
      gsap.fromTo(
        image,
        { opacity: 0.45, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 0.65, ease: "power3.out" },
      );
      gsap.fromTo(
        previewCopyRef.current.children,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power3.out" },
      );
    },
    { scope: imageRef, dependencies: [previewIndex, monthIndex, year] },
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
      className="relative overflow-hidden bg-warm-white text-dark-text"
      aria-labelledby="events-title"
    >
      <div className="page-container-wide py-20 md:py-28 lg:py-36">
        <div ref={headingRef}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="label-caps text-primary-orange">MP3 events · Melbourne</p>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-dark-text/55">
              Music up · alcohol optional
            </p>
          </div>

          <div className="mt-9 max-w-5xl">
            <h2
              id="events-title"
              className="heading-display text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.78] tracking-[-0.075em]"
            >
              Find your
              <br />
              <span className="text-primary-orange">next room.</span>
            </h2>
            <p className="mt-8 max-w-xl text-base font-semibold leading-relaxed text-dark-text/65 md:ml-[34%] md:text-lg">
              Morning raves, matcha parties and third-space takeovers. Choose a date, then show up as you are.
            </p>
          </div>
        </div>

        <div className="mt-14 rounded-[1.5rem] bg-primary-orange/[0.07] p-4 md:mt-20 md:px-6">
          <div className="grid items-center gap-4 md:grid-cols-[1fr_auto]">
            <div className="flex items-center justify-between gap-3 md:justify-start md:gap-5">
              <button
                type="button"
                onClick={() => shiftMonth(-1)}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-orange text-lg text-warm-white transition-[background-color,transform] duration-200 hover:-translate-x-0.5 hover:bg-primary-orange-burnt active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-orange"
                aria-label="Previous month"
              >
                ←
              </button>
              <p className="min-w-[13ch] text-center text-xl font-black uppercase tracking-[-0.03em] md:text-2xl">
                {MONTHS[monthIndex]} <span className="text-primary-orange">{year}</span>
              </p>
              <button
                type="button"
                onClick={() => shiftMonth(1)}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-orange text-lg text-warm-white transition-[background-color,transform] duration-200 hover:translate-x-0.5 hover:bg-primary-orange-burnt active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-orange"
                aria-label="Next month"
              >
                →
              </button>
            </div>
            <p className="text-center text-xs font-bold uppercase tracking-[0.12em] text-dark-text/50 md:text-right">
              {visibleEvents.length ? `${visibleEvents.length} dates announced` : "Next drop coming soon"}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
          <div
            ref={imageRef}
            className="relative min-h-[32rem] overflow-hidden rounded-[1.5rem] bg-primary-orange lg:sticky lg:top-24 lg:h-[42rem]"
          >
            <Image
              key={previewImage}
              src={previewEvent ? previewImage : "/calendar-bg.jpg"}
              alt={previewEvent ? `${previewEvent.title} at MP3 Social` : "MP3 Social event crowd"}
              fill
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="object-cover"
              quality={82}
              loading="lazy"
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(213,90,45,0.08)_25%,rgba(213,90,45,0.92)_100%)]"
              aria-hidden="true"
            />
            <div className="absolute left-5 top-5 bg-warm-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-primary-orange md:left-7 md:top-7">
              Selected event
            </div>
            <div ref={previewCopyRef} className="absolute inset-x-0 bottom-0 p-6 text-warm-white md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-warm-white/75">
                {previewEvent ? previewEvent.time : "No date announced"}
              </p>
              <p className="heading-display mt-3 max-w-[10ch] text-4xl leading-[0.86] md:text-6xl">
                {previewEvent ? previewEvent.title : "Stay close."}
              </p>
              <p className="mt-5 text-sm font-semibold text-warm-white/80">
                {previewEvent ? previewEvent.location : "New rooms land here first."}
              </p>
            </div>
          </div>

          <div ref={listRef} className="space-y-3">
            {visibleEvents.length > 0 ? (
              visibleEvents.map((event, index) => {
                const active = previewIndex === index;

                return (
                  <button
                    type="button"
                    data-event-row
                    key={`${event.month}-${event.date}-${event.title}`}
                    onMouseEnter={() => setPreviewIndex(index)}
                    onFocus={() => setPreviewIndex(index)}
                    onClick={() => setSelectedEvent(event)}
                    className={`group grid w-full grid-cols-[3.5rem_1fr_auto] items-start gap-4 rounded-[1.25rem] px-4 py-7 text-left transition-[background-color,color,transform] duration-300 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-orange md:grid-cols-[5.5rem_1fr_auto] md:gap-6 md:px-6 md:py-10 ${
                      active
                        ? "bg-primary-orange text-warm-white"
                        : "bg-primary-orange/[0.07] text-dark-text hover:bg-primary-orange/[0.13]"
                    }`}
                    aria-label={`View details for ${event.title}`}
                  >
                    <span className={`text-3xl font-black tabular-nums leading-none md:text-5xl ${active ? "text-warm-white" : "text-primary-orange"}`}>
                      {String(event.date).padStart(2, "0")}
                    </span>
                    <span>
                      <span className={`block text-[10px] font-bold uppercase tracking-[0.15em] ${active ? "text-warm-white/70" : "text-dark-text/50"}`}>
                        {event.time}
                      </span>
                      <span className="heading-display mt-3 block text-2xl leading-[0.9] md:text-4xl">
                        {event.title}
                      </span>
                      <span className={`mt-4 block text-xs font-semibold leading-relaxed ${active ? "text-warm-white/75" : "text-dark-text/60"}`}>
                        {event.location}
                      </span>
                    </span>
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-full text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${active ? "bg-warm-white/15 text-warm-white" : "bg-primary-orange text-warm-white"}`}
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </button>
                );
              })
            ) : (
              <div data-event-row className="flex min-h-80 flex-col justify-between rounded-[1.25rem] bg-primary-orange/[0.07] px-4 py-8 md:px-6 md:py-10">
                <p className="heading-display max-w-[10ch] text-4xl text-primary-orange md:text-6xl">
                  Nothing announced. Yet.
                </p>
                <p className="max-w-sm text-base font-semibold leading-relaxed text-dark-text/65">
                  New dates land here first. Check back soon for next room reveal.
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
