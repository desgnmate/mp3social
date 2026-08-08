"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function EditorialMotion({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set("[data-hero-reveal], [data-reveal], [data-stagger] > *", {
          clearProps: "all",
          opacity: 1,
        });
        return;
      }

      gsap.fromTo(
        "[data-hero-reveal]",
        { y: 10 },
        {
          y: 0,
          duration: 0.32,
          stagger: 0.03,
          ease: "power3.out",
          immediateRender: false,
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 8,
          duration: 0.35,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        gsap.from(Array.from(group.children), {
          y: 8,
          duration: 0.35,
          stagger: 0.03,
          ease: "power3.out",
          scrollTrigger: {
            trigger: group,
            start: "top 88%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        gsap.fromTo(
          element,
          { yPercent: -2 },
          {
            yPercent: 2,
            ease: "none",
            scrollTrigger: {
              trigger: element.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
