import Image from "next/image";
import Link from "next/link";

const LINKS = [
  { label: "Events", href: "/" },
  { label: "Catering", href: "/catering" },
  { label: "Shop", href: "/shop" },
  { label: "FAQs", href: "/faqs" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-dark-text/10 bg-warm-white text-dark-text">
      <div className="page-container-wide pb-8 pt-3 sm:pt-5">
        <div className="grid gap-10 rounded-[1.5rem] bg-primary-orange px-6 py-10 text-warm-white sm:px-10 sm:py-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-warm-white/65">
              Your room, our energy
            </p>
            <h2 className="heading-display mt-5 max-w-[12ch] text-[clamp(3rem,6vw,5.5rem)] leading-[0.86] tracking-[-0.065em]">
              Come for the matcha. Stay for the room.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-5 lg:col-span-4 lg:justify-end">
            <Link
              href="/book-now"
              className="editorial-button rounded-full border-warm-white bg-warm-white text-primary-orange hover:border-dark-text"
            >
              Book catering <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/#calendar" className="editorial-text-link text-warm-white">
              See events <span aria-hidden="true">↓</span>
            </Link>
          </div>
        </div>

        <div className="grid gap-12 py-14 md:py-16 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <Link
              href="/"
              aria-label="MP3 Social home"
              className="relative block h-20 w-40"
            >
              <Image
                src="/mp3-logo-new.png"
                alt="MP3 Social"
                fill
                sizes="160px"
                className="object-contain object-left"
              />
            </Link>
            <p className="mt-5 max-w-sm text-base font-medium leading-relaxed text-dark-text/60">
              Matcha parties, daytime energy and better reasons to gather.
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3 lg:col-span-4 lg:col-start-7"
          >
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-max border-b border-transparent py-1 text-sm font-semibold transition-colors hover:border-primary-orange hover:text-primary-orange"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="lg:col-span-2 lg:col-start-11">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-dark-text/45">
              General inbox
            </p>
            <Link
              href="mailto:hello@mp3social.com"
              className="mt-4 block text-sm font-bold underline decoration-primary-orange underline-offset-4"
            >
              hello@mp3social.com
            </Link>
            <p className="mt-5 text-sm font-medium leading-relaxed text-dark-text/55">
              Melbourne, with selected-city takeovers.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-dark-text/15 pt-6 text-xs font-medium text-dark-text/50 sm:flex-row sm:justify-between">
          <p>© 2026 MP3 Social. All rights reserved.</p>
          <p>Designed and developed by desgnmate.com</p>
        </div>
      </div>
    </footer>
  );
}
