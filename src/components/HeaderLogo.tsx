"use client";

import Image from "next/image";

const MENU_ITEMS = [
  { label: "SHOP", href: "#" },
  { label: "FAQS", href: "#" },
  { label: "ABOUT", href: "#" },
  { label: "CONTACT", href: "#" },
];

export function HeaderLogo() {
  return (
    <header className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-4 pt-4 md:px-8 md:pt-6 lg:px-10">
      <a
        href="#"
        aria-label="MP3 Social home"
        className="block"
        style={{ animation: "fade-in 0.6s ease-out 0.1s both" }}
      >
        <div className="relative h-10 w-[88px] md:h-12 md:w-[106px]">
          <Image
            src="/mp3-logo.png"
            alt="MP3 Social"
            fill
            sizes="106px"
            className="object-contain"
            quality={100}
            priority
          />
        </div>
      </a>

      <nav
        className="flex items-center gap-3 md:gap-6"
        style={{ animation: "fade-in 0.6s ease-out 0.2s both" }}
      >
        {MENU_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-[10px] font-semibold uppercase tracking-[0.05em] text-warm-white transition-colors duration-200 hover:text-primary-orange md:text-xs"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
