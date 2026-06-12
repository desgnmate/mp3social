"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { FAQ_ITEMS } from "@/lib/faq-data";

function FAQRow({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-primary-orange/35">
      <button
        onClick={() => setOpen((o) => !o)}
        className="group flex w-full items-center justify-between py-5 text-left transition-colors hover:text-primary-orange md:py-7"
        aria-expanded={open}
      >
        <span className="heading-display pr-4 text-sm tracking-tight text-primary-orange md:text-base lg:text-lg">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex-shrink-0 text-2xl font-light text-primary-orange md:text-3xl"
          aria-hidden="true"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.25 },
            }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-10 text-sm leading-relaxed text-dark-text/80 md:pb-8 md:text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  return (
    <section
      className="relative w-full overflow-hidden bg-cream paper-texture"
      aria-label="Frequently asked questions"
    >
      <div className="dust-specks" />
      <div className="relative w-full px-6 py-20 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <Reveal>
          <div className="text-center">
            <h2 className="heading-display text-primary-orange text-[clamp(2.5rem,7vw,4.5rem)]">
              FAQs
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-dark-text/80 md:text-base">
              Lorem ipsum dolor sit amet consectetur adipiscing elit tincidunt,
              penatibus erat tellus cum integer morbi
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 md:mt-16">
            {FAQ_ITEMS.map((item, i) => (
              <FAQRow key={i} question={item.question} answer={item.answer} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
