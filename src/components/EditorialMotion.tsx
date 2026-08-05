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

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          "[data-hero-reveal]",
          { y: 18 },
          {
            y: 0,
            duration: 0.62,
            stagger: 0.055,
            immediateRender: false,
          },
        )
        .fromTo(
          "[data-hero-image]",
          { clipPath: "inset(4% 0 0 0)", scale: 1.018 },
          {
            clipPath: "inset(0 0 0% 0)",
            scale: 1,
            duration: 0.78,
            immediateRender: false,
          },
          0.08,
        );

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 16,
          duration: 0.58,
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
          y: 14,
          duration: 0.55,
          stagger: 0.06,
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
              scrub: 1.6,
            },
          },
        );
      });
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
