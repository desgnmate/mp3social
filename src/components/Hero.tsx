"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type HeroProps = {
  title: ReactNode;
  titleId: string;
  copy: string;
  primaryCta: { href: string; label: string; icon: string };
  secondaryCta: { href: string; label: string; icon: string };
  image: { src: string; alt: string; className?: string };
  motion?: "catering";
};

export function Hero({
  title,
  titleId,
  copy,
  primaryCta,
  secondaryCta,
  image,
  motion,
}: HeroProps) {
  const motionAttribute = motion === "catering" ? "" : undefined;

  return (
    <section
      className="bg-warm-white px-3 pb-3 pt-3 sm:px-5 sm:pb-5"
      aria-labelledby={titleId}
    >
      <div className="relative mx-auto min-h-[44rem] w-full max-w-[80rem] overflow-hidden rounded-[1.5rem] bg-dark-text text-warm-white lg:min-h-[calc(100svh-1.5rem)]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="(min-width: 1280px) 1280px, 100vw"
          className={image.className ?? "object-cover object-bottom"}
          quality={90}
          data-catering-image={motionAttribute}
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(44,34,27,0.12)_18%,rgba(44,34,27,0.28)_52%,rgba(44,34,27,0.88)_100%),linear-gradient(90deg,rgba(44,34,27,0.36),transparent_64%)]"
          aria-hidden="true"
        />

        <div className="relative z-[1] grid min-h-[inherit] gap-8 p-5 pt-24 sm:p-8 sm:pt-28 lg:grid-cols-12 lg:p-10 lg:pt-28">
          <div className="flex min-w-0 flex-col justify-between lg:col-span-8">
            <h1
              id={titleId}
              data-catering-hero={motionAttribute}
              className="heading-display mt-20 max-w-[8ch] text-[clamp(3.1rem,7vw,6.5rem)] leading-[0.84] tracking-[-0.075em] lg:mt-auto"
            >
              {title}
            </h1>
          </div>

          <aside
            data-catering-hero={motionAttribute}
            className="self-end rounded-[1.25rem] border border-warm-white/70 bg-warm-white p-3.5 text-dark-text shadow-[0_12px_30px_rgba(44,34,27,0.16)] sm:p-4 lg:col-span-4 lg:max-w-[21rem] lg:justify-self-end"
          >
            <p className="max-w-[32ch] text-[0.8125rem] font-semibold leading-[1.45] text-dark-text/70 sm:text-sm">
              {copy}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <Link href={primaryCta.href} className="editorial-button hero-primary-action">
                {primaryCta.label} <span aria-hidden="true">{primaryCta.icon}</span>
              </Link>
              <Link href={secondaryCta.href} className="hero-secondary-action">
                {secondaryCta.label} <span aria-hidden="true">{secondaryCta.icon}</span>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function EventsHero() {
  return (
    <Hero
      title={
        <>
          <span className="block">Sober is</span>
          <span className="block">the new</span>
          <span className="block text-primary-orange">wasted.</span>
        </>
      }
      titleId="events-hero-title"
      copy="Matcha in hand. Music up. Strangers turning into friends before noon."
      primaryCta={{ href: "#calendar", label: "See next event", icon: "↓" }}
      secondaryCta={{ href: "/about", label: "Why MP3", icon: "↗" }}
      image={{ src: "/hero-bg.png", alt: "Crowd dancing at an MP3 Social daytime event" }}
    />
  );
}
