import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { HeaderLogo } from "@/components/HeaderLogo";

type NavMode = "main" | "catering";

type SubpageShellProps = {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  navMode?: NavMode;
  index: string;
  children: ReactNode;
  /** Optional primary CTA under the intro */
  primaryCta?: { href: string; label: string };
  /** Optional secondary CTA under the intro */
  secondaryCta?: { href: string; label: string };
  /** Override default back link (Events / Catering hub) */
  backHref?: string;
  backLabel?: string;
};

/**
 * Shared subpage frame: fixed header, editorial hero, children, footer.
 * Uses design tokens from globals.css (.page-container, .section-pad, type roles).
 */
export function SubpageShell({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  navMode = "main",
  index,
  children,
  primaryCta,
  secondaryCta,
  backHref: backHrefProp,
  backLabel: backLabelProp,
}: SubpageShellProps) {
  const backHref =
    backHrefProp ?? (navMode === "catering" ? "/catering" : "/");
  const backLabel =
    backLabelProp ?? (navMode === "catering" ? "Catering" : "Events");

  return (
    <div className="min-h-screen bg-warm-white text-dark-text">
      <HeaderLogo />

      <main>
        <section
          className="relative overflow-hidden bg-cream"
          aria-labelledby="subpage-title"
        >
          <div className="page-container section-pad-y">
            {/* Meta row */}
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
              <p className="label-caps text-primary-orange/70">{index}</p>
              <p className="label-caps hidden text-primary-orange/70 sm:block">
                {eyebrow}
              </p>
              <Link
                href={backHref}
                className="label-caps text-primary-orange transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-orange"
              >
                ← {backLabel}
              </Link>
            </div>

            {/* Title */}
            <h1
              id="subpage-title"
              className="heading-display mt-8 max-w-[14ch] text-[clamp(2.75rem,7.5vw,6.5rem)] leading-[0.85] tracking-[-0.05em] text-primary-orange md:mt-10"
            >
              {title}
            </h1>

            {/* Intro + actions + image */}
            <div className="mt-10 grid items-end gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12 xl:gap-16">
              <div className="max-w-xl">
                <p className="text-base leading-relaxed text-dark-text/75 md:text-lg md:leading-relaxed">
                  {intro}
                </p>

                {(primaryCta || secondaryCta) && (
                  <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                    {primaryCta && (
                      <Link
                        href={primaryCta.href}
                        className="btn-primary"
                      >
                        {primaryCta.label}
                        <span aria-hidden="true">→</span>
                      </Link>
                    )}
                    {secondaryCta && (
                      <Link
                        href={secondaryCta.href}
                        className="btn-secondary"
                      >
                        {secondaryCta.label}
                      </Link>
                    )}
                  </div>
                )}
              </div>

              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-primary-orange shadow-[var(--shadow-md)] sm:aspect-[16/9] lg:aspect-[5/3]">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                  priority
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-dark-text/40 via-transparent to-dark-text/10"
                  aria-hidden="true"
                />
                <div className="absolute left-4 top-4 border border-primary-orange/25 bg-cream px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-primary-orange md:left-5 md:top-5 md:px-4 md:py-2">
                  MP3 / {eyebrow}
                </div>
              </div>
            </div>
          </div>
        </section>

        {children}
      </main>

      <Footer />
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="label-caps text-primary-orange/65">{children}</p>
  );
}

export function DisplayHeading({
  children,
  light = false,
  className = "",
  id,
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className={`heading-display mt-3 text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.9] tracking-[-0.045em] ${
        light ? "text-warm-white" : "text-primary-orange"
      } ${className}`}
    >
      {children}
    </h2>
  );
}

export function PageCTA({
  title,
  copy,
  href,
  label,
}: {
  title: string;
  copy: string;
  href: string;
  label: string;
}) {
  return (
    <section className="relative overflow-hidden bg-dark-text text-warm-white">
      <div
        className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rotate-12 border-[36px] border-primary-orange/20"
        aria-hidden="true"
      />
      <div className="page-container section-pad-y relative text-center">
        <h2 className="heading-display mx-auto max-w-[16ch] text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.88] tracking-[-0.05em]">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-warm-white/70">
          {copy}
        </p>
        <Link href={href} className="btn-primary mt-8">
          {label}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
