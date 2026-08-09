"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MENU_ITEMS = [
  { label: "Events", href: "/events" },
  { label: "Catering", href: "/catering" },
  { label: "Shop", href: "/shop" },
  { label: "FAQs", href: "/faqs" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const CATERING_ROUTES = [
  "/catering",
  "/our-way",
  "/whats-included",
  "/book-now",
];

export function HeaderLogo() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isEventsPage = pathname === "/events";
  const isCateringPage = pathname === "/catering";
  const hasImmersiveHero = isEventsPage || isCateringPage;

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 72);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  const transparentHeroHeader = hasImmersiveHero && !scrolled;

  const isActive = (href: string) =>
    href === "/catering"
      ? CATERING_ROUTES.some((route) => pathname.startsWith(route))
      : pathname.startsWith(href);

  return (
    <>
      <header
        className={`z-50 transition-[padding,top] duration-300 ${
          scrolled
            ? "pointer-events-none fixed inset-x-0 top-3 px-3 sm:px-5"
            : hasImmersiveHero
              ? "absolute inset-x-0 top-0"
              : "sticky inset-x-0 top-0 bg-transparent"
        }`}
      >
        <div
          className={`pointer-events-auto mx-auto w-full max-w-[80rem] overflow-hidden transition-[background-color,border-color,box-shadow,border-radius] duration-300 ${
            scrolled
              ? "rounded-[1.25rem] border border-dark-text/10 bg-warm-white/95 text-dark-text shadow-[0_18px_48px_rgba(44,34,27,0.16)] backdrop-blur-xl"
              : transparentHeroHeader
                ? "border border-transparent bg-transparent text-warm-white"
                : "border border-transparent bg-transparent text-dark-text"
          }`}
        >
          <div
            className={`grid grid-cols-[1fr_auto_1fr] items-center px-4 transition-[min-height] duration-300 sm:px-5 lg:px-8 ${
              scrolled ? "min-h-16" : "min-h-[72px] lg:min-h-[80px]"
            }`}
          >
            <Link
              href="/"
              aria-label="MP3 Social home"
              className="relative h-10 w-[86px] shrink-0 lg:h-11 lg:w-[96px]"
            >
              <Image
                src="/mp3-logo-new.png"
                alt="MP3 Social"
                fill
                sizes="96px"
                className="object-contain"
                priority
              />
            </Link>

            <nav
              aria-label="Primary navigation"
              className="hidden items-center gap-1 lg:flex"
            >
              {MENU_ITEMS.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative flex min-h-11 items-center rounded-full px-3 text-xs font-semibold transition-[color,transform] before:pointer-events-none before:absolute before:inset-x-0 before:inset-y-1.5 before:rounded-full before:transition-colors active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-orange ${
                      active
                        ? transparentHeroHeader
                          ? "text-warm-white before:bg-warm-white/20"
                          : "text-primary-orange before:bg-primary-orange/10"
                        : transparentHeroHeader
                          ? "text-warm-white/85 before:bg-transparent hover:text-warm-white hover:before:bg-warm-white/10"
                          : "text-dark-text/75 before:bg-transparent hover:text-primary-orange hover:before:bg-cream/70"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center justify-end gap-2">
              <Link
                href="/book-now"
                className="hidden min-h-11 items-center gap-5 rounded-full border border-primary-orange bg-primary-orange px-5 text-xs font-bold text-warm-white transition-colors hover:border-dark-text hover:bg-dark-text sm:inline-flex"
              >
                Book catering
                <span aria-hidden="true">↗</span>
              </Link>
              <button
                type="button"
                className={`inline-flex min-h-11 min-w-[70px] items-center justify-center rounded-full border px-3 text-xs font-bold transition-colors hover:border-primary-orange hover:text-primary-orange lg:hidden ${
                  transparentHeroHeader
                    ? "border-warm-white/45 text-warm-white"
                    : "border-dark-text/20 text-dark-text"
                }`}
                aria-expanded={menuOpen}
                aria-controls="mobile-primary-navigation"
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? "Close" : "Menu"}
              </button>
            </div>
          </div>

          <div
            id="mobile-primary-navigation"
            className={`overflow-hidden border-t border-dark-text/15 bg-cream transition-[max-height,opacity] duration-300 lg:hidden ${
              menuOpen ? "max-h-[34rem] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <nav
              aria-label="Mobile primary navigation"
              className="grid grid-cols-2 px-4 py-3 sm:px-5"
            >
              {MENU_ITEMS.map((item, index) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-14 items-center justify-between border-b border-dark-text/15 px-1 text-sm font-bold ${
                      index % 2 === 0 ? "mr-3" : "ml-3"
                    } ${active ? "text-primary-orange" : "text-dark-text"}`}
                  >
                    {item.label}
                    <span aria-hidden="true">↗</span>
                  </Link>
                );
              })}
              <Link
                href="/book-now"
                className="col-span-2 mt-4 flex min-h-12 items-center justify-between rounded-full bg-primary-orange px-4 text-xs font-bold text-warm-white sm:hidden"
              >
                Book catering
                <span aria-hidden="true">↗</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {!hasImmersiveHero && scrolled && <div className="h-20" aria-hidden="true" />}
    </>
  );
}
