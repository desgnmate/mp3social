import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { EditorialMotion } from "@/components/EditorialMotion";
import { Footer } from "@/components/Footer";
import { HeaderLogo } from "@/components/HeaderLogo";

type HeroTone = "cream" | "orange" | "ink";

type EditorialShellProps = {
  code: string;
  eyebrow: string;
  title: ReactNode;
  intro: string;
  image: string;
  imageAlt: string;
  children: ReactNode;
  tone?: HeroTone;
  compact?: boolean;
  imagePosition?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
};

const TONES: Record<
  HeroTone,
  { section: string; muted: string; link: string; frame: string }
> = {
  cream: {
    section: "bg-cream text-dark-text",
    muted: "text-dark-text/65",
    link: "text-primary-orange",
    frame: "border-primary-orange/25",
  },
  orange: {
    section: "bg-primary-orange text-warm-white",
    muted: "text-warm-white/72",
    link: "text-warm-white",
    frame: "border-warm-white/35",
  },
  ink: {
    section: "bg-dark-text text-warm-white",
    muted: "text-warm-white/65",
    link: "text-primary-orange",
    frame: "border-primary-orange/50",
  },
};

export function EditorialShell({
  code,
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  children,
  tone = "cream",
  compact = false,
  imagePosition = "object-center",
  primaryCta,
  secondaryCta,
}: EditorialShellProps) {
  const palette = TONES[tone];

  return (
    <div className="min-h-screen bg-warm-white text-dark-text">
      <HeaderLogo />
      <EditorialMotion>
        <main>
          <section
            className={`relative isolate overflow-hidden ${palette.section}`}
            aria-labelledby="editorial-page-title"
          >
            <div
              className={`page-container-wide grid items-stretch gap-12 py-14 md:py-20 lg:grid-cols-[minmax(0,1.04fr)_minmax(24rem,0.96fr)] lg:gap-16 ${
                compact
                  ? "lg:min-h-[36rem] lg:py-24"
                  : "lg:min-h-[calc(100svh-80px)] lg:py-24"
              }`}
            >
              <div className="flex min-w-0 flex-col">
                <div
                  data-hero-reveal
                  className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.16em]"
                >
                  <span className={palette.link}>{code}</span>
                  <span aria-hidden="true" className="h-px w-8 bg-current opacity-35" />
                  <span className="opacity-65">{eyebrow}</span>
                </div>

                <h1
                  id="editorial-page-title"
                  data-hero-reveal
                  className="heading-display mt-12 max-w-[10ch] text-[clamp(3.75rem,8.6vw,8.8rem)] leading-[0.76] tracking-[-0.075em] sm:mt-16"
                >
                  {title}
                </h1>

                <div className="mt-auto pt-12 sm:pt-16 lg:pt-20">
                  <p
                    data-hero-reveal
                    className={`max-w-xl text-base leading-relaxed md:text-lg ${palette.muted}`}
                  >
                    {intro}
                  </p>

                  {(primaryCta || secondaryCta) && (
                    <div
                      data-hero-reveal
                      className="mt-8 flex flex-wrap items-center gap-5"
                    >
                      {primaryCta && (
                        <Link
                          href={primaryCta.href}
                          className={`group inline-flex min-h-12 items-center gap-8 border px-5 text-[10px] font-extrabold uppercase tracking-[0.14em] transition-colors ${
                            tone === "orange"
                              ? "border-warm-white bg-warm-white text-primary-orange hover:bg-transparent hover:text-warm-white"
                              : "border-primary-orange bg-primary-orange text-warm-white hover:bg-burnt-orange"
                          }`}
                        >
                          {primaryCta.label}
                          <span
                            aria-hidden="true"
                            className="transition-transform group-hover:translate-x-1"
                          >
                            ↗
                          </span>
                        </Link>
                      )}
                      {secondaryCta && (
                        <Link
                          href={secondaryCta.href}
                          className={`text-[10px] font-extrabold uppercase tracking-[0.14em] underline decoration-current/35 underline-offset-8 transition-opacity hover:opacity-60 ${palette.link}`}
                        >
                          {secondaryCta.label}
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div
                data-hero-image
                className={`relative min-h-[26rem] overflow-hidden border sm:min-h-[34rem] lg:min-h-0 ${palette.frame}`}
              >
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className={`object-cover ${imagePosition}`}
                  priority
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-dark-text/35 via-transparent to-transparent"
                />
                <p className="absolute bottom-5 left-5 text-[10px] font-bold uppercase tracking-[0.16em] text-warm-white">
                  MP3 Social / Melbourne
                </p>
              </div>
            </div>
          </section>
          {children}
        </main>
        <Footer />
      </EditorialMotion>
    </div>
  );
}

export function EditorialKicker({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`text-[10px] font-bold uppercase tracking-[0.16em] ${
        light ? "text-warm-white/58" : "text-primary-orange"
      }`}
    >
      {children}
    </p>
  );
}

export function EditorialHeading({
  children,
  light = false,
  className = "",
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={`heading-display text-[clamp(3rem,7vw,7rem)] leading-[0.8] tracking-[-0.06em] ${
        light ? "text-warm-white" : "text-dark-text"
      } ${className}`}
    >
      {children}
    </h2>
  );
}

export function EditorialSerif({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-serif font-normal italic normal-case tracking-[-0.055em] ${className}`}
    >
      {children}
    </span>
  );
}
