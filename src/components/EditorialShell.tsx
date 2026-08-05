import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { EditorialMotion } from "@/components/EditorialMotion";
import { Footer } from "@/components/Footer";
import { HeaderLogo } from "@/components/HeaderLogo";

type HeroLayout = "manifesto" | "catalogue" | "index" | "contact" | "brief";

type EditorialShellProps = {
  code?: string;
  eyebrow: string;
  title: ReactNode;
  intro: string;
  image: string;
  imageAlt: string;
  children: ReactNode;
  layout?: HeroLayout;
  compact?: boolean;
  imagePosition?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  tone?: "cream" | "orange" | "ink";
};

const LAYOUTS: Record<
  HeroLayout,
  { grid: string; copy: string; media: string; title: string }
> = {
  manifesto: {
    grid: "lg:grid-cols-12",
    copy: "lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:pt-4",
    media:
      "lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mt-14 lg:min-h-[30rem]",
    title: "max-w-[9ch]",
  },
  catalogue: {
    grid: "lg:grid-cols-12",
    copy: "lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:pb-20",
    media:
      "lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mt-6 lg:min-h-[34rem]",
    title: "max-w-[9ch]",
  },
  index: {
    grid: "lg:grid-cols-12",
    copy: "lg:col-span-8 lg:col-start-5 lg:row-start-1 lg:pl-8",
    media:
      "lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mb-14 lg:min-h-[30rem]",
    title: "max-w-[9ch]",
  },
  contact: {
    grid: "lg:grid-cols-12",
    copy: "lg:col-span-7 lg:col-start-1 lg:row-start-1",
    media:
      "lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mb-12 lg:mt-14 lg:min-h-[30rem]",
    title: "max-w-[10ch]",
  },
  brief: {
    grid: "lg:grid-cols-12",
    copy: "lg:col-span-7 lg:col-start-1 lg:row-start-1",
    media:
      "lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:min-h-[32rem]",
    title: "max-w-[9ch]",
  },
};

export function EditorialShell({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  children,
  layout = "manifesto",
  compact = false,
  imagePosition = "object-center",
  primaryCta,
  secondaryCta,
  tone = "cream",
}: EditorialShellProps) {
  const composition = LAYOUTS[layout];
  const heroTone = tone === "ink" ? "bg-dark-text text-warm-white" : "bg-warm-white text-dark-text";
  const introTone = tone === "ink" ? "text-warm-white/72" : "text-dark-text/70";

  return (
    <div className="min-h-[100dvh] bg-warm-white text-dark-text">
      <HeaderLogo />
      <EditorialMotion>
        <main>
          <section
            className={`relative overflow-hidden border-b border-dark-text/15 ${heroTone}`}
            aria-labelledby="editorial-page-title"
          >
            <div
              className={`page-container-wide grid gap-8 py-10 sm:py-12 lg:gap-8 lg:py-14 ${composition.grid} ${
                compact ? "lg:min-h-[36rem]" : "lg:min-h-[calc(100dvh-80px)]"
              }`}
            >
              <div
                className={`relative z-[1] flex min-w-0 flex-col ${composition.copy}`}
              >
                <p
                  data-hero-reveal
                  className="max-w-max border-b border-primary-orange pb-2 text-xs font-semibold text-primary-orange"
                >
                  {eyebrow}
                </p>

                <h1
                  id="editorial-page-title"
                  data-hero-reveal
                  className={`editorial-hero-title heading-display mt-8 text-balance leading-[0.86] tracking-[-0.068em] sm:mt-10 ${composition.title}`}
                >
                  {title}
                </h1>

                <div className="mt-9 max-w-xl lg:mt-auto lg:pt-10">
                  <p
                    data-hero-reveal
                    className={`max-w-[52ch] text-base font-medium leading-relaxed md:text-lg ${introTone}`}
                  >
                    {intro}
                  </p>

                  {(primaryCta || secondaryCta) && (
                    <div
                      data-hero-reveal
                      className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4"
                    >
                      {primaryCta && (
                        <Link href={primaryCta.href} className="editorial-button">
                          {primaryCta.label}
                          <span aria-hidden="true">↗</span>
                        </Link>
                      )}
                      {secondaryCta && (
                        <Link
                          href={secondaryCta.href}
                          className="editorial-text-link"
                        >
                          {secondaryCta.label}
                          <span aria-hidden="true">↗</span>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div
                data-hero-image
                className={`relative min-h-[22rem] overflow-hidden bg-cream sm:min-h-[28rem] ${composition.media}`}
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
                  className="absolute inset-0 bg-dark-text/5 mix-blend-multiply"
                />
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

export function EditorialKicker({ children }: { children: ReactNode; light?: boolean }) {
  return (
    <p className="max-w-max border-b border-primary-orange pb-2 text-xs font-semibold text-primary-orange">
      {children}
    </p>
  );
}

export function EditorialHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={`editorial-section-title heading-display text-balance leading-[0.88] tracking-[-0.055em] text-dark-text ${className}`}
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
      className={`inline-block pb-1 font-sans font-black italic normal-case leading-[1.08] tracking-[-0.06em] ${className}`}
    >
      {children}
    </span>
  );
}
