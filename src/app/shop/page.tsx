import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  EditorialHeading,
  EditorialKicker,
  EditorialShell,
} from "@/components/EditorialShell";

export const metadata: Metadata = {
  title: "Shop | MP3 Social",
  description:
    "Small-run MP3 Social matcha kits, event passes and objects from the room.",
};

const DROPS = [
  {
    title: "Ceremonial matcha",
    note: "Bright, clean matcha sized for your kitchen, desk or pre-rave ritual.",
    state: "First drop soon",
    image: "/sticker-2.png",
    className: "md:col-span-7 bg-primary-orange",
  },
  {
    title: "Event passes",
    note: "Entry to morning raves, listening sessions and the next third space.",
    state: "Released by event",
    image: "/sticker-1.png",
    className: "md:col-span-5 bg-cream",
  },
  {
    title: "Room objects",
    note: "Cups, tees and small-run evidence that you were there. Useful first.",
    state: "Event-only for now",
    image: "/sticker-4.png",
    className: "md:col-span-12 bg-cream",
  },
];

export default function ShopPage() {
  return (
    <EditorialShell
      layout="catalogue"
      heroVariant="content"
      title={
        <>
          Good things.
          <br />
          <span className="text-primary-orange">Kept small.</span>
        </>
      }
      intro="Matcha, useful objects and passes to wherever we gather next. No endless catalogue. No filler."
      image="/calendar-bg.jpg"
      imageAlt="MP3 Social matcha drinks ready to serve"
      imagePosition="object-[54%_center]"
      primaryCta={{
        href: "mailto:hello@mp3social.com?subject=MP3%20drop%20list",
        label: "Join drop list",
      }}
      secondaryCta={{ href: "/events", label: "See events" }}
    >
      <section className="editorial-section">
        <div className="page-container-wide">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <EditorialKicker>Coming next</EditorialKicker>
            <EditorialHeading className="lg:col-span-8 lg:col-start-5">
              Not a catalogue. <span className="text-primary-orange">A release schedule.</span>
            </EditorialHeading>
          </div>

          <div className="fresh-card-grid mt-16 md:grid-cols-12" data-stagger>
            {DROPS.map((drop) => (
              <article
                key={drop.title}
                className={`fresh-card group relative min-h-[28rem] p-7 sm:p-9 ${drop.className}`}
              >
                <Image
                  src={drop.image}
                  alt={`${drop.title} artwork`}
                  fill
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="object-contain p-16 transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105 sm:p-24"
                />
                <div className="relative z-[1] flex h-full min-h-[25rem] flex-col justify-between">
                  <p className="text-xs font-semibold text-dark-text/65">{drop.state}</p>
                  <div className="rounded-[1rem] bg-warm-white/95 p-5 backdrop-blur-sm">
                    <h2 className="heading-display text-3xl leading-none sm:text-4xl">
                      {drop.title}
                    </h2>
                    <p className="mt-3 max-w-sm text-sm font-medium leading-relaxed text-dark-text/60">
                      {drop.note}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section bg-cream/50">
        <div className="page-container-wide grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="fresh-media relative min-h-[28rem] lg:col-span-7 lg:min-h-[40rem]" data-reveal>
            <Image
              src="/community-bg.jpg"
              alt="Crowd at MP3 Social daytime rave"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover object-[61%_center]"
              data-parallax
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9" data-reveal>
            <EditorialHeading className="max-w-[8ch]">
              Event first. <span className="text-primary-orange">Online after.</span>
            </EditorialHeading>
            <p className="mt-7 max-w-md text-base font-medium leading-relaxed text-dark-text/65">
              New pours and objects appear at MP3 events first. Dance, taste the drop and take home what earns a place.
            </p>
            <Link href="/events" className="editorial-button mt-8">
              See events <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </EditorialShell>
  );
}
