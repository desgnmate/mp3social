"use client";

import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section
      className="bg-warm-white px-3 pb-3 pt-3 sm:px-5 sm:pb-5"
      aria-labelledby="events-hero-title"
    >
      <div className="relative mx-auto min-h-[44rem] w-full max-w-[80rem] overflow-hidden rounded-[1.5rem] bg-dark-text text-warm-white lg:min-h-[calc(100svh-1.5rem)]">
        <Image
          src="/hero-bg.png"
          alt="Crowd dancing at an MP3 Social daytime event"
          fill
          priority
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="object-cover object-bottom"
          quality={90}
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(44,34,27,0.12)_18%,rgba(44,34,27,0.28)_52%,rgba(44,34,27,0.88)_100%),linear-gradient(90deg,rgba(44,34,27,0.36),transparent_64%)]"
          aria-hidden="true"
        />

        <div className="relative z-[1] grid min-h-[inherit] gap-8 p-5 pt-24 sm:p-8 sm:pt-28 lg:grid-cols-12 lg:p-10 lg:pt-28">
          <div className="flex min-w-0 flex-col justify-between lg:col-span-8">
            <p className="max-w-max rounded-full border border-warm-white/65 bg-warm-white/10 px-4 py-2 text-[0.6875rem] font-bold uppercase tracking-[0.12em] backdrop-blur-md">
              Events by MP3 Social
            </p>

            <h1
              id="events-hero-title"
              className="heading-display mt-20 max-w-[8ch] text-[clamp(3.1rem,7vw,6.5rem)] leading-[0.84] tracking-[-0.075em]"
            >
              <span className="block">Sober is</span>
              <span className="block">the new</span>
              <span className="block text-primary-orange">wasted.</span>
            </h1>
          </div>

          <aside className="self-end rounded-[1.25rem] border border-warm-white/70 bg-warm-white p-5 text-dark-text shadow-[0_18px_50px_rgba(44,34,27,0.2)] sm:p-6 lg:col-span-4">
            <p className="max-w-[38ch] text-sm font-semibold leading-relaxed text-dark-text/70 sm:text-base">
              Matcha in hand. Music up. Strangers turning into friends before noon.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link href="#calendar" className="editorial-button rounded-full">
                See next event <span aria-hidden="true">↓</span>
              </Link>
              <Link href="/about" className="editorial-text-link">
                Why MP3 <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
