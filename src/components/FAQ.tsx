"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FAQ_ITEMS } from "@/lib/faq-data";

gsap.registerPlugin(ScrollTrigger);

type FAQRowProps = {
  answer: string;
  index: number;
  open: boolean;
  question: string;
  onToggle: () => void;
};

function FAQRow({ answer, index, open, question, onToggle }: FAQRowProps) {
  const panelId = `events-faq-${index}`;
  const buttonId = `${panelId}-button`;
  const reducedMotion = useReducedMotion();

  return (
    <article
      data-faq-row
      className={`border-b border-primary-orange/25 transition-colors duration-300 last:border-b-0 ${open ? "bg-primary-orange text-warm-white" : "bg-warm-white text-dark-text"}`}
    >
      <button
        id={buttonId}
        type="button"
        onClick={onToggle}
        className={`group grid min-h-24 w-full grid-cols-[2.25rem_1fr_auto] items-center gap-3 px-3 py-6 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-orange md:grid-cols-[4rem_1fr_auto] md:gap-6 md:px-6 md:py-8 lg:px-8 ${open ? "hover:bg-primary-orange-burnt" : "hover:bg-primary-orange/[0.08]"}`}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className={`text-[10px] font-black uppercase tracking-[0.16em] ${open ? "text-warm-white/65" : "text-primary-orange"}`}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-lg font-black leading-tight tracking-[-0.035em] md:text-2xl lg:text-3xl">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`flex h-10 w-10 items-center justify-center rounded-full border text-2xl font-medium leading-none transition-colors md:h-12 md:w-12 ${open ? "border-warm-white/55 text-warm-white" : "border-primary-orange/40 text-primary-orange group-hover:bg-primary-orange group-hover:text-warm-white"}`}
          aria-hidden="true"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={reducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={reducedMotion ? { duration: 0 } : {
              height: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.25 },
            }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-[2.25rem_1fr] gap-3 px-3 pb-8 md:grid-cols-[4rem_1fr] md:gap-6 md:px-6 md:pb-10 lg:px-8 lg:pb-12">
              <span aria-hidden="true" />
              <p className="max-w-2xl text-base font-medium leading-relaxed text-warm-white/80 md:text-lg">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useGSAP(
    () => {
      if (!headingRef.current || !listRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(headingRef.current.children, {
        y: 44,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(gsap.utils.toArray<HTMLElement>("[data-faq-row]"), {
        x: 42,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 82%",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative overflow-hidden bg-warm-white text-dark-text"
      aria-labelledby="faq-title"
    >
      <div className="page-container-wide pb-24 pt-8 md:pb-32 md:pt-12 lg:pb-40">
        <div className="border-t-2 border-primary-orange pt-5">
          <div className="flex items-center justify-between gap-4">
            <p className="label-caps text-primary-orange">Good to know</p>
            <p className="text-xs font-bold tabular-nums text-dark-text/50">
              01 / {String(FAQ_ITEMS.length).padStart(2, "0")}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div ref={headingRef} className="lg:sticky lg:top-28 lg:self-start">
            <h2
              id="faq-title"
              className="heading-display max-w-[7ch] text-[clamp(3.5rem,7vw,7rem)] leading-[0.8] tracking-[-0.07em]"
            >
              Ask it
              <span className="block text-primary-orange">loud.</span>
            </h2>
            <p className="mt-7 max-w-sm text-base font-semibold leading-relaxed text-dark-text/65 md:text-lg">
              First rave, matcha curious, or bringing MP3 into your room? Start here.
            </p>
            <a
              href="/contact"
              className="mt-8 inline-flex items-center gap-3 border-b border-primary-orange pb-2 text-xs font-black uppercase tracking-[0.12em] text-primary-orange transition-[gap,color] hover:gap-5 hover:text-primary-orange-burnt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-orange"
            >
              Still curious? Ask us <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div ref={listRef} className="border-t border-primary-orange/25">
            {FAQ_ITEMS.map((item, index) => (
              <FAQRow
                key={item.question}
                index={index}
                question={item.question}
                answer={item.answer}
                open={openIndex === index}
                onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
