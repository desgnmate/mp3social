import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  EditorialHeading,
  EditorialKicker,
  EditorialSerif,
  EditorialShell,
} from "@/components/EditorialShell";

export const metadata: Metadata = {
  title: "Shop — MP3 Social",
  description:
    "Small-run MP3 Social matcha kits, event passes and objects from the room.",
};

const DROPS = [
  {
    number: "01",
    title: "Ceremonial matcha",
    note: "The same bright, clean matcha we pour in the room—sized for your kitchen, desk or pre-rave ritual.",
    state: "First drop soon",
    image: "/sticker-2.png",
    color: "bg-primary-orange",
  },
  {
    number: "02",
    title: "Event passes",
    note: "Entry to morning raves, listening sessions and whatever third space we take over next.",
    state: "Released by event",
    image: "/sticker-1.png",
    color: "bg-cream",
  },
  {
    number: "03",
    title: "Room objects",
    note: "Cups, tees and small-run evidence that you were there. Useful first; collectible second.",
    state: "Event-only for now",
    image: "/sticker-4.png",
    color: "bg-warm-beige",
  },
];

export default function ShopPage() {
  return (
    <EditorialShell
      code="DROP / 001"
      eyebrow="MP3 goods"
      title={
        <>
          THE MATCHA
          <br />
          <EditorialSerif>drop.</EditorialSerif>
        </>
      }
      intro="Small runs of good matcha, useful objects and passes to wherever we’re gathering next. No endless catalogue. No filler."
      image="/calendar-bg.jpg"
      imageAlt="MP3 Social matcha drinks and branded cups"
      imagePosition="object-[54%_center]"
      primaryCta={{
        href: "mailto:hello@mp3social.com?subject=MP3%20drop%20list",
        label: "Join the drop list",
      }}
      secondaryCta={{ href: "/", label: "See the next event" }}
    >
      <section className="bg-warm-white px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-6xl">
          <div
            data-reveal
            className="grid gap-8 border-b border-primary-orange/30 pb-12 md:grid-cols-[0.7fr_1.3fr] md:items-end"
          >
            <EditorialKicker>In the queue</EditorialKicker>
            <EditorialHeading>
              GOOD THINGS.
              <br />
              <EditorialSerif className="text-primary-orange">
                Kept small.
              </EditorialSerif>
            </EditorialHeading>
          </div>

          <div data-stagger className="mt-2">
            {DROPS.map((drop) => (
              <article
                key={drop.number}
                className="group grid gap-7 border-b border-primary-orange/30 py-8 md:grid-cols-[3rem_13rem_1fr_auto] md:items-center md:gap-9 md:py-10"
              >
                <span className="text-[10px] font-bold text-primary-orange/55">
                  {drop.number}
                </span>
                <div
                  className={`relative aspect-[4/3] overflow-hidden ${drop.color}`}
                >
                  <Image
                    src={drop.image}
                    alt=""
                    fill
                    sizes="208px"
                    className="object-contain p-7 drop-shadow-xl transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105"
                  />
                </div>
                <div>
                  <h2 className="heading-display text-3xl text-dark-text md:text-4xl">
                    {drop.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-dark-text/60">
                    {drop.note}
                  </p>
                </div>
                <p className="justify-self-start border border-primary-orange/35 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-primary-orange md:justify-self-end">
                  {drop.state}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid bg-primary-orange text-warm-white lg:grid-cols-2">
        <div className="relative min-h-[28rem] overflow-hidden lg:min-h-[42rem]">
          <Image
            src="/community-bg.jpg"
            alt="The MP3 Social crowd at a daytime rave"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            data-parallax
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-dark-text/20 mix-blend-multiply"
          />
        </div>
        <div
          data-reveal
          className="flex flex-col justify-center px-5 py-20 md:px-12 lg:px-16"
        >
          <EditorialKicker light>Try it in the room</EditorialKicker>
          <EditorialHeading light className="mt-8">
            EVENT FIRST.
            <br />
            ONLINE
            <br />
            <EditorialSerif>after.</EditorialSerif>
          </EditorialHeading>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-warm-white/72">
            New pours and objects show up at MP3 events before they show up here.
            Come dance, taste the drop and take home what earns a place.
          </p>
          <Link
            href="/"
            className="mt-9 inline-flex w-fit items-center gap-8 border border-warm-white px-5 py-4 text-[10px] font-extrabold uppercase tracking-[0.14em] transition-colors hover:bg-warm-white hover:text-primary-orange"
          >
            Find the next room <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </EditorialShell>
  );
}
