"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";
import { FAQ_ITEMS } from "@/lib/faq-data";

gsap.registerPlugin(ScrollTrigger);

type FAQRowProps = {
  answer: string;
  index: number;
  open: boolean;
  question: string;
  onToggle: () => void;
};

function FAQRow({
  answer,
  index,
  open,
  question,
  onToggle,
}: FAQRowProps) {
  const panelId = `events-faq-${index}`;

  return (
    <article
      data-faq-row
      className={`border-b border-dark-text/15 transition-colors duration-300 last:border-b-0 ${
        open ? "bg-primary-orange text-warm-white" : "bg-cream text-dark-text"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className={`group grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-3 px-4 py-6 text-left transition-colors md:grid-cols-[4rem_1fr_auto] md:gap-6 md:px-8 md:py-8 lg:px-10 ${open ? "hover:bg-primary-orange-burnt" : "hover:bg-cream-beige"}`}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="text-[10px] font-black uppercase tracking-[0.18em] opacity-55">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="heading-display text-xl leading-[0.95] md:text-3xl lg:text-4xl">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={`flex h-10 w-10 items-center justify-center rounded-full border text-2xl font-light leading-none md:h-11 md:w-11 md:text-3xl ${open ? "border-warm-white/45 text-warm-white" : "border-primary-orange/45 text-primary-orange"}`}
          aria-hidden="true"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.3 },
            }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-[2.25rem_1fr] gap-3 px-4 pb-8 md:grid-cols-[4rem_1fr] md:gap-6 md:px-8 md:pb-10 lg:px-10">
              <span aria-hidden="true" />
              <p className="max-w-2xl font-serif text-lg leading-relaxed text-warm-white/78 md:text-xl">
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

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) return;

      gsap.from(Array.from(headingRef.current.children), {
        y: 58,
        opacity: 0,
        duration: 1.15,
        stagger: 0.13,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(gsap.utils.toArray<HTMLElement>("[data-faq-row]"), {
        y: 36,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
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
      className="relative overflow-hidden bg-primary-orange"
      aria-labelledby="faq-title"
    >
      <div className="dust-specks opacity-25" />

      <div className="page-container-wide relative py-20 md:py-28 lg:py-32">
        <div
          ref={headingRef}
          className="grid items-end gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20"
        >
          <div>
            <p className="label-caps text-dark-text/65">
              Questions / No gatekeeping
            </p>
            <h2
              id="faq-title"
              className="section-title-clamp heading-display mt-5 text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.78] tracking-[-0.07em] text-warm-white"
            >
              Ask it
              <br />
              <span className="font-serif font-normal italic normal-case tracking-[-0.06em] text-dark-text">
                loud.
              </span>
            </h2>
          </div>

          <div className="border-t border-dark-text/45 pt-5">
            <p className="font-serif text-xl leading-snug text-dark-text md:text-2xl">
              First rave? Matcha curious? Trying to bring MP3 into your own
              room? Start here.
            </p>
            <div className="mt-8 flex items-center justify-between rounded-full border border-dark-text/25 bg-warm-white/10 px-5 py-4 text-[10px] font-black uppercase tracking-[0.17em] text-dark-text/65">
              <span>FAQ</span>
              <span>01—{String(FAQ_ITEMS.length).padStart(2, "0")}</span>
            </div>
          </div>
        </div>

        <div ref={listRef} className="mt-16 overflow-hidden rounded-[1.5rem] bg-cream lg:mt-24">
          {FAQ_ITEMS.map((item, index) => (
            <FAQRow
              key={item.question}
              index={index}
              question={item.question}
              answer={item.answer}
              open={openIndex === index}
              onToggle={() =>
                setOpenIndex((current) => (current === index ? null : index))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
