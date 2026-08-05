import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  EditorialHeading,
  EditorialKicker,
  EditorialShell,
} from "@/components/EditorialShell";

export const metadata: Metadata = {
  title: "About | MP3 Social",
  description:
    "MP3 Social is an independent event collective making room for music, matcha and actual connection.",
};

const PRINCIPLES = [
  {
    title: "Music",
    note: "Good sound changes a room before anyone has to explain what it is.",
  },
  {
    title: "Matcha",
    note: "A bright ritual with real energy and something better to gather around.",
  },
  {
    title: "People",
    note: "Familiar faces, new friends and less pressure to perform.",
  },
];

export default function AboutPage() {
  return (
    <EditorialShell
      eyebrow="About MP3 Social"
      layout="manifesto"
      title={
        <>
          More human.
          <br />
          <span className="text-primary-orange">Less hangover.</span>
        </>
      }
      intro="An independent event collective making room for music, matcha and actual connection. Not a club. Not a café. Somewhere in between."
      image="/community-bg.jpg"
      imageAlt="MP3 Social community dancing together"
      imagePosition="object-[63%_center]"
      primaryCta={{ href: "/", label: "See events" }}
      secondaryCta={{ href: "/contact", label: "Contact us" }}
    >
      <section className="editorial-section">
        <div className="page-container-wide grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <EditorialKicker>Why we exist</EditorialKicker>
          </div>
          <div className="lg:col-span-8" data-reveal>
            <EditorialHeading>
              Daytime deserves a <span className="text-primary-orange">better pulse.</span>
            </EditorialHeading>
            <div className="mt-12 grid max-w-4xl gap-8 border-t border-dark-text/20 pt-8 text-base font-medium leading-relaxed text-dark-text/65 md:grid-cols-2 md:gap-14">
              <p>
                MP3 Social started with a simple thought: daytime energy should
                feel alive. So we built a room around good sound, great matcha
                and people who wanted something different.
              </p>
              <p>
                Today we create morning raves, listening sessions and
                third-space gatherings, then bring that pulse to other
                people&apos;s events.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="editorial-section !pt-0">
        <div className="page-container-wide">
          <div className="relative min-h-[32rem] overflow-hidden sm:min-h-[42rem]" data-reveal>
            <Image
              src="/hero-bg-web.jpg"
              alt="Crowd filling an MP3 Social daytime event"
              fill
              sizes="100vw"
              className="object-cover object-center"
              data-parallax
            />
          </div>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-dark-text/55">
            A room built around sound, movement and zero pressure to perform.
          </p>
        </div>
      </section>

      <section className="editorial-section border-y border-dark-text/15">
        <div className="page-container-wide">
          <EditorialHeading className="max-w-[9ch]">
            Three things hold <span className="text-primary-orange">every room.</span>
          </EditorialHeading>
          <div className="mt-14 grid gap-8 md:grid-cols-12" data-stagger>
            {PRINCIPLES.map((principle, index) => (
              <article
                key={principle.title}
                className={`border-t border-dark-text/20 pt-6 ${
                  index === 0
                    ? "md:col-span-5"
                    : index === 1
                      ? "md:col-span-3 md:mt-12"
                      : "md:col-span-4 md:mt-5"
                }`}
              >
                <h2 className="heading-display text-5xl leading-none text-dark-text md:text-6xl">
                  {principle.title}
                </h2>
                <p className="mt-5 max-w-xs text-base font-medium leading-relaxed text-dark-text/60">
                  {principle.note}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section">
        <div className="page-container-wide grid gap-12 lg:grid-cols-12 lg:items-end">
          <blockquote
            className="editorial-statement heading-display max-w-[13ch] leading-[0.9] tracking-[-0.055em] lg:col-span-9"
            data-reveal
          >
            “The best room is one you leave with more energy than you brought.”
          </blockquote>
          <Link href="/contact" className="editorial-button lg:col-span-3 lg:justify-self-end">
            Contact us <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </EditorialShell>
  );
}
