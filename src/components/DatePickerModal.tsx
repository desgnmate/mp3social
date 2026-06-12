"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { MONTHS } from "@/lib/calendar-data";

type DatePickerModalProps = {
  open: boolean;
  initialMonth: number;
  initialYear: number;
  onClose: () => void;
  onConfirm: (month: number, year: number) => void;
};

const YEAR_START = 2020;
const YEAR_END = 2030;

export function DatePickerModal({
  open,
  initialMonth,
  initialYear,
  onClose,
  onConfirm,
}: DatePickerModalProps) {
  const [viewYear, setViewYear] = useState(initialYear);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    if (open) {
      setViewYear(initialYear);
      setSelectedMonth(null);
      setSelectedYear(null);
    }
  }, [open, initialMonth, initialYear]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const handleConfirm = () => {
    if (selectedMonth !== null && selectedYear !== null) {
      onConfirm(selectedMonth, selectedYear);
    }
  };

  const canConfirm = selectedMonth !== null && selectedYear !== null;

  return (
    <AnimatePresence>
      {open && (
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
            className="relative z-10 w-full max-w-md overflow-hidden bg-cream paper-texture shadow-2xl"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Select date"
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

            <div className="relative px-6 pt-7 md:px-8">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary-orange md:text-xs">
                Select a date
              </span>
              <h3 className="mt-2 heading-display text-2xl uppercase leading-tight text-dark-text md:text-3xl">
                Pick a month
                <br />& year
              </h3>
            </div>

            <div className="px-6 py-6 md:px-8 md:py-7">
              <div className="mb-5 flex items-center justify-between border-b border-primary-orange/20 pb-4">
                <button
                  onClick={() => setViewYear((y) => Math.max(YEAR_START, y - 1))}
                  disabled={viewYear <= YEAR_START}
                  aria-label="Previous year"
                  className="flex h-9 w-9 items-center justify-center text-primary-orange transition-all hover:scale-110 active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
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

                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-dark-text/50">
                    Year
                  </span>
                  <span className="heading-display text-2xl uppercase tracking-tight text-dark-text">
                    {viewYear}
                  </span>
                </div>

                <button
                  onClick={() => setViewYear((y) => Math.min(YEAR_END, y + 1))}
                  disabled={viewYear >= YEAR_END}
                  aria-label="Next year"
                  className="flex h-9 w-9 items-center justify-center text-primary-orange transition-all hover:scale-110 active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
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

              <div className="mb-5 grid grid-cols-3 gap-2 md:gap-2.5">
                {MONTHS.map((m, i) => {
                  const isSelected = selectedMonth === i && selectedYear === viewYear;
                  return (
                    <button
                      key={m}
                      onClick={() => {
                        setSelectedMonth(i);
                        setSelectedYear(viewYear);
                      }}
                      className={`relative border-2 px-2 py-3 text-[10px] font-extrabold uppercase tracking-[0.12em] transition-all md:px-3 md:py-4 md:text-xs ${
                        isSelected
                          ? "border-primary-orange bg-primary-orange text-warm-white"
                          : "border-primary-orange/30 bg-warm-white text-primary-orange hover:border-primary-orange hover:bg-primary-orange/10"
                      }`}
                    >
                      {m.slice(0, 3)}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col gap-3 pt-1 md:flex-row">
                <button
                  onClick={onClose}
                  className="flex-1 border-2 border-primary-orange bg-transparent px-5 py-3 text-xs font-extrabold uppercase tracking-[0.2em] text-primary-orange transition-colors hover:bg-primary-orange hover:text-warm-white md:text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={!canConfirm}
                  className="flex-1 bg-primary-orange px-5 py-3 text-xs font-extrabold uppercase tracking-[0.2em] text-warm-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:hover:scale-100 md:text-sm"
                >
                  {canConfirm
                    ? `Go to ${MONTHS[selectedMonth!]} ${selectedYear}`
                    : "Select a month"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
