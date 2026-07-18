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
  title: "About — MP3 Social",
  description:
    "MP3 Social is an independent event collective making room for music, matcha and actual connection.",
};

const PRINCIPLES = [
  {
    number: "01",
    title: "Music",
    note: "Good sound changes the room before anyone has to explain what the room is.",
  },
  {
    number: "02",
    title: "Matcha",
    note: "A bright ritual with real energy—and something better to gather around.",
  },
  {
    number: "03",
    title: "People",
    note: "The whole point. Familiar faces, new friends and less pressure to perform.",
  },
];

export default function AboutPage() {
  return (
    <EditorialShell
      code="STORY / 003"
      eyebrow="About MP3 Social"
      tone="ink"
      title={
        <>
          MORE HUMAN.
          <br />
          <EditorialSerif className="text-primary-orange">
            Less hangover.
          </EditorialSerif>
        </>
      }
      intro="An independent event collective making room for music, matcha and actual connection. Not a club. Not a café. Somewhere in between."
      image="/community-bg.jpg"
      imageAlt="The MP3 Social community dancing together"
      imagePosition="object-[64%_center]"
      primaryCta={{ href: "/", label: "Enter the next room" }}
      secondaryCta={{ href: "/contact", label: "Build something together" }}
    >
      <section className="bg-primary-orange px-5 py-24 text-warm-white md:px-10 md:py-36">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-24">
            <EditorialKicker light>Why we exist</EditorialKicker>
            <div data-reveal>
              <EditorialHeading light>
                DAYTIME
                <br />
                DESERVES A
                <br />
                <EditorialSerif>better pulse.</EditorialSerif>
              </EditorialHeading>
              <div className="mt-12 grid gap-7 border-t border-warm-white/30 pt-8 text-sm leading-relaxed text-warm-white/72 md:grid-cols-2 md:gap-12">
                <p>
                  MP3 Social started with a simple thought: daytime energy
                  should feel just as alive as a night out. So we built a room
                  around good sound, great matcha and people who wanted
                  something different.
                </p>
                <p>
                  Today we create morning raves, listening sessions and
                  third-space gatherings for our community—and bring that same
                  pulse to other people’s events.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warm-white px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-6xl">
          <div
            data-reveal
            className="flex flex-col gap-8 border-b border-primary-orange/30 pb-12 md:flex-row md:items-end md:justify-between"
          >
            <EditorialHeading>
              THE SIMPLE
              <br />
              <EditorialSerif className="text-primary-orange">
                ingredients.
              </EditorialSerif>
            </EditorialHeading>
            <p className="max-w-xs text-sm leading-relaxed text-dark-text/55">
              The ingredients stay simple. The combinations—and the rooms—keep
              changing.
            </p>
          </div>

          <div data-stagger className="grid lg:grid-cols-3">
            {PRINCIPLES.map((principle, index) => (
              <article
                key={principle.number}
                className={`border-b border-primary-orange/30 py-10 lg:min-h-[24rem] lg:border-b-0 lg:py-12 ${
                  index > 0
                    ? "lg:border-l lg:border-primary-orange/30 lg:pl-10"
                    : "lg:pr-10"
                } ${index === 1 ? "lg:pr-10" : ""}`}
              >
                <span className="text-[10px] font-bold text-primary-orange/50">
                  {principle.number}
                </span>
                <h2 className="heading-display mt-20 text-5xl text-dark-text lg:mt-32">
                  {principle.title}
                </h2>
                <p className="mt-5 max-w-xs text-sm leading-relaxed text-dark-text/58">
                  {principle.note}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-[42rem] overflow-hidden">
        <Image
          src="/calendar-bg.jpg"
          alt="Matcha drinks being served at MP3 Social"
          fill
          sizes="100vw"
          className="object-cover"
          data-parallax
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-dark-text/58 mix-blend-multiply"
        />
        <div className="page-container-wide relative flex min-h-[42rem] flex-col justify-between py-12 text-warm-white md:py-16">
          <EditorialKicker light>Our manifesto</EditorialKicker>
          <div data-reveal>
            <blockquote className="heading-display max-w-[15ch] text-[clamp(3rem,7vw,7rem)] leading-[0.8]">
              “THE BEST ROOM IS THE ONE YOU LEAVE WITH MORE ENERGY THAN YOU
              BROUGHT.”
            </blockquote>
            <Link
              href="/contact"
              className="mt-9 inline-flex items-center gap-8 border border-warm-white px-5 py-4 text-[10px] font-extrabold uppercase tracking-[0.14em] transition-colors hover:bg-warm-white hover:text-dark-text"
            >
              Make a room with us <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </EditorialShell>
  );
}
