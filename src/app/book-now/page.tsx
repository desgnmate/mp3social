import type { Metadata } from "next";
import Link from "next/link";
import { BookingBriefForm } from "@/components/BookingBriefForm";
import {
  EditorialHeading,
  EditorialKicker,
  EditorialSerif,
  EditorialShell,
} from "@/components/EditorialShell";

export const metadata: Metadata = {
  title: "Book Catering — MP3 Social",
  description:
    "Book the MP3 Social ceremonial matcha bar or full rave catering experience for your event.",
};

const STEPS = [
  {
    number: "01",
    title: "Send the shape",
    note: "Date, city, venue, guest count and the kind of room you’re building.",
  },
  {
    number: "02",
    title: "Build the format",
    note: "We recommend a matcha service plan and any sound, styling or crew layers.",
  },
  {
    number: "03",
    title: "Lock the room",
    note: "Approve the scope, secure the date and leave the energy to us.",
  },
];

export default function BookNowPage() {
  return (
    <EditorialShell
      code="CATERING / 005"
      eyebrow="Book the bar"
      tone="ink"
      title={
        <>
          BUILD YOUR
          <br />
          <EditorialSerif className="text-primary-orange">
            room.
          </EditorialSerif>
        </>
      }
      intro="Ceremonial matcha at volume, with the people and production to make it land. Start with the basics; we’ll shape the rest."
      image="/community-bg.jpg"
      imageAlt="Guests dancing at a crowded MP3 Social event"
      imagePosition="object-[65%_center]"
      primaryCta={{ href: "#event-brief", label: "Start the brief" }}
      secondaryCta={{ href: "/catering", label: "Explore catering" }}
    >
      <section className="bg-primary-orange px-5 py-24 text-warm-white md:px-10 md:py-36">
        <div className="mx-auto max-w-6xl">
          <div
            data-reveal
            className="grid gap-10 border-b border-warm-white/30 pb-12 md:grid-cols-[0.7fr_1.3fr] md:items-end"
          >
            <EditorialKicker light>Three calm steps</EditorialKicker>
            <EditorialHeading light>
              FROM FIRST NOTE
              <br />
              TO <EditorialSerif>full room.</EditorialSerif>
            </EditorialHeading>
          </div>

          <div data-stagger className="grid md:grid-cols-3">
            {STEPS.map((step, index) => (
              <article
                key={step.number}
                className={`border-b border-warm-white/30 py-10 md:min-h-[22rem] md:border-b-0 md:py-12 ${
                  index > 0
                    ? "md:border-l md:border-warm-white/30 md:pl-9"
                    : "md:pr-9"
                } ${index === 1 ? "md:pr-9" : ""}`}
              >
                <span className="text-[10px] font-bold text-warm-white/55">
                  {step.number}
                </span>
                <h2 className="heading-display mt-20 text-3xl md:mt-28 md:text-4xl">
                  {step.title}
                </h2>
                <p className="mt-5 max-w-xs text-sm leading-relaxed text-warm-white/68">
                  {step.note}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="event-brief"
        className="scroll-mt-20 bg-dark-text px-5 py-24 md:px-10 md:py-36"
      >
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.68fr_1.32fr] lg:items-start lg:gap-20">
          <aside
            data-reveal
            className="text-warm-white lg:sticky lg:top-28 lg:self-start"
          >
            <EditorialKicker light>Start here</EditorialKicker>
            <EditorialHeading light className="mt-8">
              GIVE US
              <br />
              THE
              <br />
              <EditorialSerif className="text-primary-orange">
                basics.
              </EditorialSerif>
            </EditorialHeading>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-warm-white/60">
              Thirty guests or three hundred: the right format starts with a
              clear brief. This opens a completed draft in your email app.
            </p>
            <div className="mt-10 border-l border-primary-orange pl-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-primary-orange">
                Prefer a plain email?
              </p>
              <Link
                href="mailto:hello@mp3social.com?subject=Catering%20inquiry"
                className="mt-3 block break-all text-sm font-semibold text-warm-white underline decoration-warm-white/25 underline-offset-8"
              >
                hello@mp3social.com
              </Link>
            </div>
          </aside>

          <div data-reveal>
            <BookingBriefForm />
          </div>
        </div>
      </section>
    </EditorialShell>
  );
}
