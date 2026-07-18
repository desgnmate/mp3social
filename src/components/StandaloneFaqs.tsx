"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export type StandaloneFaq = {
  category: string;
  question: string;
  answer: string;
};

export function StandaloneFaqs({ items }: { items: StandaloneFaq[] }) {
  const [openIndex, setOpenIndex] = useState(0);
  const answers = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    answers.current.forEach((answer, index) => {
      if (!answer) return;

      gsap.to(answer, {
        height: index === openIndex ? "auto" : 0,
        opacity: index === openIndex ? 1 : 0,
        duration: 0.45,
        ease: "power3.out",
        overwrite: true,
      });
    });
  }, [openIndex]);

  return (
    <div className="border-t border-primary-orange/35">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const answerId = `standalone-faq-answer-${index}`;

        return (
          <article
            key={item.question}
            data-faq-item
            className="border-b border-primary-orange/35"
          >
            <button
              type="button"
              className="group grid w-full grid-cols-[2.25rem_1fr_auto] items-start gap-4 py-7 text-left md:grid-cols-[4rem_1fr_auto] md:gap-7 md:py-9"
              aria-expanded={isOpen}
              aria-controls={answerId}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span className="pt-1 text-[10px] font-bold text-primary-orange/55">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="heading-display max-w-[24ch] text-xl leading-[0.95] text-dark-text transition-colors group-hover:text-primary-orange md:text-3xl">
                {item.question}
              </span>
              <span
                aria-hidden="true"
                className={`flex h-8 w-8 items-center justify-center border border-primary-orange text-lg text-primary-orange transition-transform duration-300 ${
                  isOpen ? "rotate-45 bg-primary-orange text-warm-white" : ""
                }`}
              >
                +
              </span>
            </button>

            <div
              id={answerId}
              ref={(element) => {
                answers.current[index] = element;
              }}
              className="h-0 overflow-hidden opacity-0"
            >
              <div className="grid grid-cols-[2.25rem_1fr] gap-4 pb-8 md:grid-cols-[4rem_1fr] md:gap-7 md:pb-10">
                <span />
                <div className="grid gap-5 md:grid-cols-[8rem_1fr] md:gap-10">
                  <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-primary-orange">
                    {item.category}
                  </p>
                  <p className="max-w-2xl text-sm leading-relaxed text-dark-text/65 md:text-base">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
