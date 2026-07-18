"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { HeaderLogo } from "@/components/HeaderLogo";
import styles from "./catering.module.css";

const MATCHA_MENU = [
  {
    number: "01",
    name: "THE OG",
    type: "Ceremonial matcha",
    copy: "Clean, creamy and made to order with your guests’ milk of choice.",
  },
  {
    number: "02",
    name: "FRUIT MODE",
    type: "Signature matcha",
    copy: "A bright seasonal layer that brings colour without burying the matcha.",
  },
  {
    number: "03",
    name: "CLUB TONIC",
    type: "Sparkling matcha",
    copy: "Crisp, citrus-led and built for the part of the room that wants less sweet.",
  },
];

const RAVE_LAYERS = [
  ["Sound", "A DJ-ready JBL system, wireless mics and a playlist that knows when to peak."],
  ["Space", "Bar styling, menus, lighting and the visual details that make the room feel intentional."],
  ["Crew", "Baristas, an on-site lead, setup, service and reset—one team from doors to close."],
];

const BOOKING_MODES = [
  {
    number: "01",
    kicker: "Matcha first",
    title: "JUST THE BAR",
    guests: "From 30 guests",
    copy: "A complete mobile matcha bar with two signature drinks, baristas, ice, cups and service ware.",
    items: ["2 signature serves", "Dedicated baristas", "Full bar setup"],
    tone: "light",
  },
  {
    number: "02",
    kicker: "Turn it up",
    title: "FULL RAVE MODE",
    guests: "Custom scale",
    copy: "Matcha bar plus sound, styling and production for launches, socials, brand nights and private parties.",
    items: ["Everything in the bar", "Sound + optional DJ", "Styling + event lead"],
    tone: "orange",
  },
];

const PROCESS = [
  ["01", "Drop the brief", "Date, venue, guest count and the feeling you want."],
  ["02", "Build the set", "We shape the drinks, service window and production layers."],
  ["03", "Open the room", "Our crew sets up, serves the crowd and resets after."],
];

const FAQS = [
  {
    question: "Can we book only the matcha bar?",
    answer:
      "Yes. The bar is the core offer. You can keep it focused or add sound, a DJ, styling and full event production.",
  },
  {
    question: "What is included with the bar?",
    answer:
      "Two signature matcha drinks, ceremonial-grade matcha, milk options, cups, ice, service ware and a dedicated barista team.",
  },
  {
    question: "What kind of events do you cater?",
    answer:
      "Brand launches, team socials, workshops, birthdays, private parties and sober-friendly raves. If people are gathering, we can shape the bar around it.",
  },
  {
    question: "How early should we book?",
    answer:
      "Two to four weeks is ideal for bar-only bookings. Full rave productions benefit from a longer lead time, especially when a venue or DJ is involved.",
  },
  {
    question: "Do you travel?",
    answer:
      "Yes, for selected briefs. Include the city and venue in your inquiry and the team will confirm travel availability.",
  },
];

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
              <span className={styles.faqNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{item.question}</span>
              <span
                className={`${styles.faqIcon} ${isOpen ? styles.faqIconOpen : ""}`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            <div
              id={panelId}
              className={`${styles.faqPanel} ${isOpen ? styles.faqPanelOpen : ""}`}
            >
              <div>
                <p>{item.answer}</p>
              </div>
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

      <main>
        <section className={styles.hero} aria-labelledby="catering-title">
          <div className={styles.heroEditorial}>
            <h1 id="catering-title" className={styles.heroTitle}>
              <span>Matcha rave</span>
              <span className={styles.heroTitleSerif}>catering.</span>
            </h1>

            <div className={styles.heroBottom}>
              <p>
                Ceremonial matcha, served at volume. Book the bar on its own or
                build it into a full rave with sound, styling and crew.
              </p>
              <div className={styles.heroActions}>
                <Link href="/book-now" className={styles.primaryButton}>
                  Book catering
                  <span aria-hidden="true">↗</span>
                </Link>
                <a href="#matcha" className={styles.textButton}>
                  Explore the menu
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </div>

          <div className={styles.heroImageFrame}>
            <Image
              src="/hero-bg.png"
              alt="A packed MP3 Social matcha rave"
              fill
              sizes="100vw"
              className={styles.heroImage}
              priority
            />
          </div>
        </section>

        <section
          id="matcha"
          className={styles.matchaSection}
          aria-labelledby="matcha-title"
        >
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>The headliner</p>
            <h2 id="matcha-title">
              MATCHA THAT
              <br />
              MOVES A ROOM.
            </h2>
            <p className={styles.sectionCopy}>
              Fast enough for a crowd. Good enough to stop for. Every booking
              starts with ceremonial-grade matcha and two serves shaped around
              your event.
            </p>
          </div>

          <div className={styles.matchaGrid}>
            <div className={styles.matchaImageWrap}>
              <Image
                src="/calendar-bg.jpg"
                alt="MP3 Social matcha drinks being prepared for service"
                fill
                sizes="(min-width: 900px) 52vw, 100vw"
                className={styles.coverImage}
              />
              <div className={styles.imageNote}>
                <span>Two serves</span>
                <strong>Your menu</strong>
              </div>
            </div>

            <div className={styles.menuPanel}>
              <div className={styles.menuLead}>
                <span>Sample set / 01—03</span>
                <p>Choose the direction. We dial in the final menu with you.</p>
              </div>
              <div>
                {MATCHA_MENU.map((drink) => (
                  <article className={styles.menuRow} key={drink.number}>
                    <span className={styles.menuNumber}>{drink.number}</span>
                    <div>
                      <p className={styles.menuType}>{drink.type}</p>
                      <h3>{drink.name}</h3>
                      <p className={styles.menuCopy}>{drink.copy}</p>
                    </div>
                    <span className={styles.menuArrow} aria-hidden="true">
                      ↗
                    </span>
                  </article>
                ))}
              </div>
              <Link href="/whats-included" className={styles.panelLink}>
                See the full bar setup
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section
          id="rave"
          className={styles.raveSection}
          aria-labelledby="rave-title"
        >
          <div className={styles.raveHeading}>
            <p className={styles.eyebrow}>When drinks are not enough</p>
            <h2 id="rave-title">
              TURN
              <br />
              THE BAR UP.
            </h2>
            <p>
              A matcha service can be the whole brief—or the heartbeat of a
              fully produced sober rave.
            </p>
          </div>

          <div className={styles.raveGrid}>
            <div className={styles.raveImageWrap}>
              <Image
                src="/community-bg.jpg"
                alt="DJs and a crowd at an MP3 Social event"
                fill
                sizes="(min-width: 900px) 58vw, 100vw"
                className={styles.coverImage}
              />
              <div className={styles.raveImageCaption}>
                <span>Not a club</span>
                <span>Not a café</span>
                <strong>Somewhere louder.</strong>
              </div>
            </div>

            <div className={styles.ravePanel}>
              <p className={styles.ravePanelLabel}>Full rave mode</p>
              <h3>WE BUILD THE FEELING, NOT JUST THE BAR.</h3>
              <div className={styles.raveLayers}>
                {RAVE_LAYERS.map(([title, copy], index) => (
                  <article key={title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h4>{title}</h4>
                      <p>{copy}</p>
                    </div>
                  </article>
                ))}
              </div>
              <Link href="/our-way" className={styles.darkButton}>
                How MP3 builds a room
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section
          className={styles.bookingSection}
          aria-labelledby="booking-title"
        >
          <div className={styles.bookingHeading}>
            <p className={styles.eyebrow}>Choose your volume</p>
            <h2 id="booking-title">BOOK YOUR MODE.</h2>
            <p>
              Two clean starting points. Every detail can scale with the room.
            </p>
          </div>

          <div className={styles.modeGrid}>
            {BOOKING_MODES.map((mode) => (
              <article
                key={mode.number}
                className={`${styles.modeCard} ${
                  mode.tone === "orange" ? styles.modeCardOrange : ""
                }`}
              >
                <div className={styles.modeTop}>
                  <span>{mode.number}</span>
                  <span>{mode.guests}</span>
                </div>
                <p className={styles.modeKicker}>{mode.kicker}</p>
                <h3>{mode.title}</h3>
                <p className={styles.modeCopy}>{mode.copy}</p>
                <ul>
                  {mode.items.map((item) => (
                    <li key={item}>
                      <span>{item}</span>
                      <span aria-hidden="true">+</span>
                    </li>
                  ))}
                </ul>
                <Link href="/book-now" className={styles.modeLink}>
                  Inquire about this
                  <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>

          <ol className={styles.process}>
            {PROCESS.map(([number, title, copy]) => (
              <li key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="faq" className={styles.faqSection} aria-labelledby="faq-title">
          <div className={styles.faqHeading}>
            <p className={styles.eyebrow}>Need-to-knows</p>
            <h2 id="faq-title">FAQS, NO FLUFF.</h2>
          </div>
          <FAQList />
        </section>

        <section className={styles.finalCta} aria-labelledby="final-cta-title">
          <div className={styles.finalCtaTop}>
            <span>Have a date?</span>
            <span>Have a room?</span>
            <span>Let&apos;s make noise.</span>
          </div>
          <h2 id="final-cta-title">
            BRING THE CROWD.
            <br />
            WE&apos;LL BRING THE MATCHA.
          </h2>
          <div className={styles.finalCtaBottom}>
            <p>
              Send your date, venue and guest count. We&apos;ll come back with a
              focused service plan.
            </p>
            <Link href="/book-now" className={styles.finalButton}>
              Start the brief
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
