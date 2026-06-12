"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { IMAGES } from "@/lib/images";
import { CALENDAR_EVENTS, MONTHS, getMonthDays, type CalendarEvent } from "@/lib/calendar-data";
import { EventModal } from "./EventModal";
import { DatePickerModal } from "./DatePickerModal";

const ZOOM = 1.55;
const ROTATION = 17;

export function Calendar() {
  const reduce = useReducedMotion();
  const [monthIndex, setMonthIndex] = useState(4);
  const [year, setYear] = useState(2026);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ left: -300, right: 300, top: -200, bottom: 200 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const updateBounds = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const h = containerRef.current.offsetHeight;
      const maxX = w * 0.4;
      const maxY = h * 0.4;
      setBounds({ left: -maxX, right: maxX, top: -maxY, bottom: maxY });
    };
    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  const handleDragEnd = () => {
    const cx = x.get();
    const cy = y.get();
    if (
      Math.abs(cx) > Math.abs(bounds.right) ||
      Math.abs(cy) > Math.abs(bounds.bottom)
    ) {
      x.set(0);
      y.set(0);
    }
  };

  const prev = () => {
    setDirection(-1);
    setMonthIndex((i) => (i - 1 + 12) % 12);
  };
  const next = () => {
    setDirection(1);
    setMonthIndex((i) => (i + 1) % 12);
  };

  useEffect(() => {
    x.set(0);
    y.set(0);
  }, [monthIndex, x, y]);

  const monthName = MONTHS[monthIndex];
  const cells = getMonthDays(monthIndex, year);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  return (
    <section
      className="relative w-full overflow-hidden bg-warm-white"
      aria-label="Event calendar"
    >
      <div className="relative w-full">
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: "16 / 11",
            maxHeight: "900px",
            boxShadow:
              "0 30px 60px -20px rgba(44,34,27,0.35), 0 18px 30px -10px rgba(44,34,27,0.25)",
            perspective: "1600px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          {/* Static background — does not move with drag */}
          <div className="pointer-events-none absolute inset-0">
            <Image
              src={IMAGES.calendar}
              alt="Table with matcha drinks and pastries"
              fill
              sizes="100vw"
              className="object-cover"
              style={{ opacity: 0.88 }}
              quality={85}
              draggable={false}
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.18) 100%)",
              }}
            />
            <div className="dust-specks" />
          </div>

          {/* Draggable grid layer — only the dates/events move */}
          <motion.div
            drag
            dragElastic={0.25}
            dragMomentum={false}
            dragConstraints={bounds}
            onDragEnd={handleDragEnd}
            style={{
              x,
              y,
              scale: ZOOM,
              rotate: reduce ? 0 : ROTATION,
              rotateX: reduce ? 0 : 18,
              transformStyle: "preserve-3d",
              transformOrigin: "50% 50%",
              willChange: "transform",
            }}
            className="absolute inset-0 cursor-grab touch-none active:cursor-grabbing"
          >
            <div
              className="absolute -inset-[40%] grid"
              style={{
                gridTemplateColumns: "repeat(7, 1fr)",
                gridTemplateRows: "repeat(6, 1fr)",
                gap: "1px",
                padding: "clamp(0.6rem, 1.2vw, 1.25rem)",
              }}
            >
                {cells.map((cell, idx) => {
                  if (cell.empty) {
                    return <div key={`e-${idx}`} />;
                  }
                  const event = CALENDAR_EVENTS.find(
                    (e) => e.month === monthIndex && e.date === cell.day
                  );
                  return (
                    <div
                      key={`d-${cell.day}`}
                      className="relative flex items-start justify-end border-[2.5px] border-warm-white/80 p-1.5 md:p-2.5"
                    >
                      <span className="relative z-10 text-lg font-black tracking-tight text-warm-white drop-shadow-md md:text-xl lg:text-2xl">
                        {cell.day}
                      </span>
                      {event && (
                        <motion.button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEvent(event);
                          }}
                          initial={
                            reduce ? false : { opacity: 0, scale: 0.9, y: 6 }
                          }
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          whileHover={
                            reduce
                              ? undefined
                              : { scale: 1.05, y: -2, transition: { duration: 0.2 } }
                          }
                          whileTap={reduce ? undefined : { scale: 0.97 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.1 + idx * 0.015,
                          }}
                          aria-label={`View details for ${event.title} on May ${event.date}`}
                          className="group absolute inset-1 flex cursor-pointer items-center justify-center overflow-hidden bg-primary-orange p-1 text-center focus:outline-none focus:ring-2 focus:ring-warm-white focus:ring-offset-1 focus:ring-offset-primary-orange md:inset-2 md:p-2"
                        >
                            <span className="relative text-xs font-black uppercase leading-tight tracking-tight text-warm-white md:text-sm lg:text-base">
                            <span className="block group-hover:hidden">
                              {event.title}
                            </span>
                            <span className="hidden text-warm-white/90 group-hover:block">
                              VIEW
                            </span>
                          </span>
                          <span
                            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-warm-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                            aria-hidden="true"
                          />
                        </motion.button>
                      )}
                    </div>
                  );
                })}
              </div>
          </motion.div>

          <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2 md:bottom-8 md:gap-3">
            <div className="pointer-events-auto flex items-center gap-3 rounded-full bg-cream px-4 py-2 shadow-sm md:gap-4 md:px-6 md:py-3">
              <button
                onClick={prev}
                aria-label="Previous month"
                className="flex h-7 w-7 items-center justify-center text-primary-orange transition-transform hover:scale-110 active:scale-95 md:h-8 md:w-8"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 12L6 8L10 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="relative h-7 w-28 overflow-hidden md:h-8 md:w-32">
                <button
                  type="button"
                  onClick={() => setDatePickerOpen(true)}
                  className="absolute inset-0 flex w-full items-center justify-center text-sm font-extrabold uppercase tracking-[0.2em] text-primary-orange transition-colors hover:text-primary-orange/70 md:text-base"
                  aria-label="Open date picker"
                >
                  {monthName}
                </button>
              </div>

              <button
                onClick={next}
                aria-label="Next month"
                className="flex h-7 w-7 items-center justify-center text-primary-orange transition-transform hover:scale-110 active:scale-95 md:h-8 md:w-8"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 4L10 8L6 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-warm-white/70 md:text-xs">
              Drag to pan the calendar
            </p>
          </div>
        </div>
      </div>

      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />

      <DatePickerModal
        open={datePickerOpen}
        initialMonth={monthIndex}
        initialYear={year}
        onClose={() => setDatePickerOpen(false)}
        onConfirm={(m, y) => {
          setDirection(m > monthIndex || y > year ? 1 : -1);
          setMonthIndex(m);
          setYear(y);
          setDatePickerOpen(false);
        }}
      />
    </section>
  );
}
