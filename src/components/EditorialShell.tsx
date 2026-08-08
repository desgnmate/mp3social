import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { EditorialMotion } from "@/components/EditorialMotion";
import { Footer } from "@/components/Footer";
import { HeaderLogo } from "@/components/HeaderLogo";

type HeroLayout = "manifesto" | "catalogue" | "index" | "contact" | "brief";

type EditorialShellProps = {
  code?: string;
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
  heroVariant?: "immersive" | "content";
};

export function EditorialShell({
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
  heroVariant = "immersive",
}: EditorialShellProps) {
  const titleWidth = layout === "contact" ? "max-w-[10ch]" : "max-w-[9ch]";
  const heroHeight = compact ? "lg:min-h-[32rem]" : "lg:min-h-[34rem]";

  return (
    <div className="min-h-[100dvh] bg-warm-white text-dark-text">
      <HeaderLogo />
      <EditorialMotion>
        <main>
          <section className="bg-warm-white px-3 pb-3 pt-3 sm:px-5 sm:pb-5" aria-labelledby="editorial-page-title">
            {heroVariant === "content" ? (
              <div
                className="content-hero mx-auto w-full max-w-[80rem]"
                data-layout={layout}
                data-tone={tone}
              >
                <div className="content-hero-grid">
                  <div className="content-hero-copy">
                    <h1
                      id="editorial-page-title"
                      data-hero-reveal
                      className="content-hero-title heading-display text-balance"
                    >
                      {title}
                    </h1>

                    <div className="content-hero-details">
                      <p data-hero-reveal>{intro}</p>

                      {(primaryCta || secondaryCta) && (
                        <div data-hero-reveal className="content-hero-actions">
                          {primaryCta && (
                            <Link href={primaryCta.href} className="editorial-button rounded-full">
                              {primaryCta.label}
                              <span aria-hidden="true">↗</span>
                            </Link>
                          )}
                          {secondaryCta && (
                            <Link href={secondaryCta.href} className="editorial-text-link">
                              {secondaryCta.label}
                              <span aria-hidden="true">↗</span>
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div data-hero-image className="content-hero-media">
                    <Image
                      src={image}
                      alt={imageAlt}
                      fill
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      className={`object-cover ${imagePosition}`}
                      priority
                    />
                    <div aria-hidden="true" className="content-hero-overlay" />
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={`fresh-hero relative mx-auto min-h-[34rem] w-full max-w-[80rem] overflow-hidden rounded-[1.5rem] text-warm-white ${heroHeight}`}
                data-layout={layout}
                data-tone={tone}
              >
                <div data-hero-image className="absolute inset-0 bg-cream">
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    sizes="(min-width: 1280px) 1280px, 100vw"
                    className={`object-cover ${imagePosition}`}
                    priority
                  />
                  <div aria-hidden="true" className="fresh-hero-overlay absolute inset-0" />
                </div>

                <div className="relative z-[1] grid min-h-[inherit] gap-8 p-5 sm:p-8 lg:grid-cols-12 lg:p-10">
                  <div className="flex min-w-0 flex-col justify-between lg:col-span-8">
                    <h1
                      id="editorial-page-title"
                      data-hero-reveal
                      className={`editorial-hero-title heading-display mt-20 text-balance leading-[0.84] tracking-[-0.075em] text-warm-white ${titleWidth}`}
                    >
                      {title}
                    </h1>
                  </div>

                  <aside className="fresh-hero-card self-end rounded-[1.25rem] bg-warm-white p-5 text-dark-text shadow-lg sm:p-6 lg:col-span-4">
                    <p data-hero-reveal className="max-w-[42ch] text-sm font-semibold leading-relaxed text-dark-text/70 sm:text-base">
                      {intro}
                    </p>

                    {(primaryCta || secondaryCta) && (
                      <div data-hero-reveal className="mt-6 flex flex-wrap items-center gap-4">
                        {primaryCta && (
                          <Link href={primaryCta.href} className="editorial-button rounded-full">
                            {primaryCta.label}
                            <span aria-hidden="true">↗</span>
                          </Link>
                        )}
                        {secondaryCta && (
                          <Link href={secondaryCta.href} className="editorial-text-link">
                            {secondaryCta.label}
                            <span aria-hidden="true">↗</span>
                          </Link>
                        )}
                      </div>
                    )}
                  </aside>
                </div>
              </div>
            )}
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
      className={`editorial-section-title section-title-clamp heading-display text-balance leading-[0.88] tracking-[-0.055em] text-dark-text ${className}`}
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
