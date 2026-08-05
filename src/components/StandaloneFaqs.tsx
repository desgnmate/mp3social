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
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    answers.current.forEach((answer, index) => {
      if (!answer) return;
      gsap.to(answer, {
        height: index === openIndex ? "auto" : 0,
        opacity: index === openIndex ? 1 : 0,
        duration: reduceMotion ? 0 : 0.4,
        ease: "power3.out",
        overwrite: true,
      });
    });
  }, [openIndex]);

  return (
    <div className="border-t border-dark-text/20">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const answerId = `standalone-faq-answer-${index}`;

        return (
          <article key={item.question} className="border-b border-dark-text/20">
            <button
              type="button"
              className="group grid w-full grid-cols-[1fr_auto] items-start gap-6 py-7 text-left md:py-9"
              aria-expanded={isOpen}
              aria-controls={answerId}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span className="heading-display max-w-[25ch] text-xl leading-[0.98] transition-colors group-hover:text-primary-orange md:text-2xl lg:text-[1.75rem]">
                {item.question}
              </span>
              <span
                aria-hidden="true"
                className={`flex h-10 w-10 items-center justify-center border border-dark-text/30 text-xl transition-[transform,background-color,color] duration-300 ${
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
              <div className="grid gap-3 pb-9 md:grid-cols-[8rem_1fr] md:gap-10 md:pb-11">
                <p className="text-xs font-semibold text-primary-orange">
                  {item.category}
                </p>
                <p className="max-w-2xl text-base font-medium leading-relaxed text-dark-text/65">
                  {item.answer}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
