"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Footer } from "@/components/Footer";
import { HeaderLogo } from "@/components/HeaderLogo";
import styles from "./catering.module.css";

gsap.registerPlugin(ScrollTrigger);

const MATCHA_MENU = [
  {
    name: "THE OG",
    type: "Ceremonial matcha",
    copy: "Clean, creamy and made to order with your guests’ milk of choice.",
  },
  {
    name: "FRUIT MODE",
    type: "Signature matcha",
    copy: "A bright seasonal layer that brings colour without burying the matcha.",
  },
  {
    name: "CLUB TONIC",
    type: "Sparkling matcha",
    copy: "Crisp, citrus-led and built for guests who want less sweet.",
  },
];

const RAVE_LAYERS = [
  ["Sound", "A DJ-ready JBL system, wireless mics and a playlist that knows when to peak."],
  ["Space", "Bar styling, menus, lighting and visual details that make the room feel intentional."],
  ["Crew", "Baristas, on-site lead, setup, service and reset. One team from doors to close."],
];

const BOOKING_MODES = [
  {
    kicker: "Matcha first",
    title: "JUST THE BAR",
    guests: "From 30 guests",
    copy: "Complete mobile matcha bar with two signature drinks, baristas, ice, cups and service ware.",
    items: ["2 signature serves", "Dedicated baristas", "Full bar setup"],
  },
  {
    kicker: "Turn it up",
    title: "FULL RAVE MODE",
    guests: "Custom scale",
    copy: "Matcha bar plus sound, styling and production for launches, socials, brand nights and private parties.",
    items: ["Everything in bar", "Sound + optional DJ", "Styling + event lead"],
  },
];

const PROCESS = [
  ["Drop the brief", "Date, venue, guest count and feeling you want."],
  ["Build the set", "We shape drinks, service window and production layers."],
  ["Open the room", "Crew sets up, serves the crowd and resets after."],
];

const FAQS = [
  {
    question: "Can we book only the matcha bar?",
    answer:
      "Yes. The bar is the core offer. Keep it focused or add sound, a DJ, styling and full event production.",
  },
  {
    question: "What is included with the bar?",
    answer:
      "Two signature matcha drinks, ceremonial-grade matcha, milk options, cups, ice, service ware and a dedicated barista team.",
  },
  {
    question: "What events do you cater?",
    answer:
      "Brand launches, team socials, workshops, birthdays, private parties and sober-friendly raves.",
  },
  {
    question: "How early should we book?",
    answer:
      "Two to four weeks is ideal for bar-only bookings. Full rave productions benefit from longer lead time.",
  },
  {
    question: "Do you travel?",
    answer:
      "Yes, for selected briefs. Include city and venue in your inquiry so the team can confirm availability.",
  },
];

function CateringMotion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo("[data-catering-hero]", { y: 18 }, {
          y: 0,
          duration: 0.62,
          stagger: 0.055,
          immediateRender: false,
        })
        .fromTo("[data-catering-image]", {
          clipPath: "inset(4% 0 0 0)",
          scale: 1.018,
        }, {
          clipPath: "inset(0 0 0% 0)",
          scale: 1,
          duration: 0.78,
          immediateRender: false,
        }, 0.08);

      gsap.utils.toArray<HTMLElement>("[data-catering-reveal]").forEach((element) => {
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

      gsap.utils.toArray<HTMLElement>("[data-catering-parallax]").forEach((image) => {
        gsap.fromTo(image, { yPercent: -2 }, {
          yPercent: 2,
          ease: "none",
          scrollTrigger: {
            trigger: image.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.6,
          },
        });
      });
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}

function FAQList() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={styles.faqList}>
      {FAQS.map((item, index) => {
        const isOpen = open === index;
        const panelId = `catering-faq-${index}`;

        return (
          <article className={styles.faqItem} key={item.question}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span>{item.question}</span>
              <span className={`${styles.faqIcon} ${isOpen ? styles.faqIconOpen : ""}`} aria-hidden="true">+</span>
            </button>
            <div id={panelId} className={`${styles.faqPanel} ${isOpen ? styles.faqPanelOpen : ""}`}>
              <div><p>{item.answer}</p></div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function CateringPage() {
  return (
    <div className={styles.page}>
      <HeaderLogo />
      <CateringMotion>
        <main>
          <section className={styles.hero} aria-labelledby="catering-title">
            <div className={styles.heroCopy}>
              <p data-catering-hero className={styles.kicker}>Catering by MP3 Social</p>
              <h1 id="catering-title" data-catering-hero>
                Matcha rave <span>catering.</span>
              </h1>
              <div data-catering-hero className={styles.heroBottom}>
                <p>Ceremonial matcha at volume. Book bar alone or build full rave with sound, styling and crew.</p>
                <div className={styles.actions}>
                  <Link href="/book-now" className={styles.button}>Book catering <span aria-hidden="true">↗</span></Link>
                  <a href="#matcha" className={styles.textLink}>View menu <span aria-hidden="true">↓</span></a>
                </div>
              </div>
            </div>
            <div className={styles.heroMedia} data-catering-image>
              <Image src="/hero-bg-web.jpg" alt="Packed MP3 Social matcha rave" fill sizes="(min-width: 901px) 48vw, 100vw" className={styles.cover} priority />
            </div>
          </section>

          <section id="matcha" className={styles.section} aria-labelledby="matcha-title">
            <div className={styles.sectionHeading} data-catering-reveal>
              <h2 id="matcha-title">Matcha that <span>moves a room.</span></h2>
              <p>Every booking starts with ceremonial-grade matcha and two serves shaped around your event.</p>
            </div>
            <div className={styles.menuComposition}>
              <div className={styles.menuMedia} data-catering-reveal>
                <Image src="/calendar-bg.jpg" alt="MP3 Social matcha drinks being prepared" fill sizes="(min-width: 900px) 57vw, 100vw" className={styles.cover} data-catering-parallax />
              </div>
              <div className={styles.menuList} data-catering-reveal>
                {MATCHA_MENU.map((drink) => (
                  <article key={drink.name}>
                    <p>{drink.type}</p>
                    <h3>{drink.name}</h3>
                    <span>{drink.copy}</span>
                  </article>
                ))}
                <Link href="/whats-included" className={styles.textLink}>See full bar setup <span aria-hidden="true">↗</span></Link>
              </div>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="rave-title">
            <div className={styles.raveComposition}>
              <div className={styles.raveCopy} data-catering-reveal>
                <p className={styles.kicker}>Beyond the bar</p>
                <h2 id="rave-title">Turn the bar <span>up.</span></h2>
                <p>A matcha service can be the whole brief or heartbeat of a fully produced sober rave.</p>
                <div className={styles.layers}>
                  {RAVE_LAYERS.map(([title, copy]) => (
                    <article key={title}><h3>{title}</h3><p>{copy}</p></article>
                  ))}
                </div>
                <Link href="/our-way" className={styles.button}>How MP3 works <span aria-hidden="true">↗</span></Link>
              </div>
              <div className={styles.raveMedia} data-catering-reveal>
                <Image src="/community-bg.jpg" alt="DJs and crowd at MP3 Social" fill sizes="(min-width: 900px) 56vw, 100vw" className={styles.cover} data-catering-parallax />
              </div>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="booking-title">
            <div className={styles.sectionHeading} data-catering-reveal>
              <h2 id="booking-title"><span className={styles.headingLine}>Choose your</span><span>volume.</span></h2>
              <p>Two starting points. Every detail scales with the room.</p>
            </div>
            <div className={styles.modeGrid} data-catering-reveal>
              {BOOKING_MODES.map((mode, index) => (
                <article key={mode.title} className={index === 1 ? styles.modeFeatured : ""}>
                  <div className={styles.modeMeta}><span>{mode.kicker}</span><span>{mode.guests}</span></div>
                  <h3>{mode.title}</h3>
                  <p>{mode.copy}</p>
                  <ul>{mode.items.map((item) => <li key={item}>{item}</li>)}</ul>
                  <Link href="/book-now" className={styles.modeLink}>Book catering <span aria-hidden="true">↗</span></Link>
                </article>
              ))}
            </div>
            <ol className={styles.process} data-catering-reveal>
              {PROCESS.map(([title, copy]) => <li key={title}><h3>{title}</h3><p>{copy}</p></li>)}
            </ol>
          </section>

          <section className={styles.section} aria-labelledby="faq-title">
            <div className={styles.faqGrid}>
              <h2 id="faq-title" data-catering-reveal>Useful <span>answers.</span></h2>
              <div data-catering-reveal><FAQList /></div>
            </div>
          </section>

          <section className={styles.finalCta} aria-labelledby="final-cta-title">
            <h2 id="final-cta-title" data-catering-reveal>Bring the crowd. <span>We bring matcha.</span></h2>
            <div data-catering-reveal><p>Send date, venue and guest count. We reply with a focused service plan.</p><Link href="/book-now" className={styles.button}>Book catering <span aria-hidden="true">↗</span></Link></div>
          </section>
        </main>
        <Footer />
      </CateringMotion>
    </div>
  );
}
