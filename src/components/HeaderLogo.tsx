"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU_ITEMS = [
  { label: "Events", href: "/", mobile: false },
  { label: "Catering", href: "/catering", mobile: true },
  { label: "Shop", href: "/shop", mobile: false },
  { label: "FAQs", href: "/faqs", mobile: false },
  { label: "About", href: "/about", mobile: false },
  { label: "Contact", href: "/contact", mobile: true },
];

export function HeaderLogo() {
  const pathname = usePathname();
  const cateringRoutes = ["/catering", "/our-way", "/whats-included", "/book-now"];

  return (
    <header className="absolute left-0 right-0 top-0 z-50 flex h-20 items-center justify-between px-5 md:h-24 md:px-10">
      <Link href="/" aria-label="MP3 Social home" className="relative h-10 w-[88px] shrink-0 md:h-11 md:w-[100px]">
        <Image src="/mp3-logo-new.png" alt="MP3 Social" fill sizes="100px" className="object-contain" priority />
      </Link>

      <nav aria-label="Primary navigation" className="flex items-center gap-1 md:gap-2">
        {MENU_ITEMS.map((item) => {
          const active = item.href === "/"
            ? pathname === "/"
            : item.href === "/catering"
              ? cateringRoutes.some((route) => pathname.startsWith(route))
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`${item.mobile ? "inline-flex" : "hidden md:inline-flex"} min-h-9 items-center border-b px-2 text-[9px] font-bold uppercase tracking-[0.08em] text-primary-orange transition-opacity hover:opacity-55 md:px-3 md:text-[10px] ${active ? "border-primary-orange" : "border-transparent"}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
