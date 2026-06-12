"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import type { CalendarEvent } from "@/lib/calendar-data";

type EventModalProps = {
  event: CalendarEvent | null;
  onClose: () => void;
};

export function EventModal({ event, onClose }: EventModalProps) {
  useEffect(() => {
    if (!event) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [event, onClose]);

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <div
            className="absolute inset-0 bg-dark-text/70 backdrop-blur-md"
            aria-hidden="true"
          />
          <motion.div
            className="relative z-10 w-full max-w-lg overflow-hidden bg-cream paper-texture shadow-2xl"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={event.title}
          >
            <div className="dust-specks" />
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-warm-white text-primary-orange transition-transform hover:scale-110 active:scale-95"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3L13 13M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="relative h-32 w-full bg-primary-orange md:h-40">
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-warm-white/80 md:text-xs">
                  Upcoming Event
                </span>
                <h3 className="mt-2 heading-display text-2xl uppercase leading-tight text-warm-white md:text-4xl">
                  {event.title}
                </h3>
              </div>
            </div>

            <div className="space-y-5 px-6 py-7 md:px-8 md:py-8">
              <div className="space-y-2 border-b border-primary-orange/25 pb-4">
                <div className="flex items-start gap-3 text-sm text-dark-text/80 md:text-base">
                  <svg
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-orange"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <rect
                      x="2"
                      y="3"
                      width="12"
                      height="11"
                      rx="1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M2 6.5H14M5.5 1.5V4M10.5 1.5V4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="font-medium">{event.time}</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-dark-text/80 md:text-base">
                  <svg
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-orange"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M8 14.5C11.5 11 13.5 8.5 13.5 6.2C13.5 3.7 11.3 1.5 8.8 1.5C6.3 1.5 4.5 3.5 4.5 3.5M8 14.5C4.5 11 2.5 8.5 2.5 6.2C2.5 3.7 4.7 1.5 7.2 1.5C9.7 1.5 11.5 3.5 11.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="8"
                      cy="6"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <span className="font-medium">{event.location}</span>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-dark-text/80 md:text-base">
                {event.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-primary-orange/40 bg-warm-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-orange md:text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-3 pt-2 md:flex-row">
                <button
                  className="flex-1 bg-primary-orange px-5 py-3 text-xs font-extrabold uppercase tracking-[0.2em] text-warm-white transition-transform hover:scale-[1.02] active:scale-[0.98] md:text-sm"
                  onClick={onClose}
                >
                  Reserve a spot
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 border-2 border-primary-orange bg-transparent px-5 py-3 text-xs font-extrabold uppercase tracking-[0.2em] text-primary-orange transition-colors hover:bg-primary-orange hover:text-warm-white md:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
