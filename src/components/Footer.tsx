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
    <footer className="border-t border-dark-text/15 bg-warm-white text-dark-text">
      <div className="page-container-wide py-16 md:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <Link
              href="/"
              aria-label="MP3 Social home"
              className="relative block h-28 w-56 sm:h-36 sm:w-72"
            >
              <Image
                src="/mp3-logo-new.png"
                alt="MP3 Social"
                fill
                sizes="288px"
                className="object-contain object-left"
              />
            </Link>
            <p className="mt-6 max-w-sm text-base font-medium leading-relaxed text-dark-text/60">
              Matcha parties, daytime energy and better reasons to gather.
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3 lg:col-span-5 lg:col-start-7"
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

          <div className="lg:col-span-2">
            <p className="text-sm font-semibold text-dark-text/50">General inbox</p>
            <Link
              href="mailto:hello@mp3social.com"
              className="mt-3 block text-sm font-bold underline decoration-primary-orange underline-offset-4"
            >
              hello@mp3social.com
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-dark-text/15 pt-6 text-xs font-medium text-dark-text/50 sm:flex-row sm:justify-between">
          <p>© 2026 MP3 Social. All rights reserved.</p>
          <p>Designed and developed by desgnmate.com</p>
        </div>
      </div>
    </footer>
  );
}
