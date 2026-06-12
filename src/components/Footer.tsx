"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const FOOTER_COLUMNS = [
  {
    items: [
      { label: "HOME", href: "#" },
      { label: "SHOP", href: "#" },
      { label: "NEWSLETTER", href: "#" },
    ],
  },
  {
    items: [
      { label: "FAQS", href: "#" },
      { label: "ABOUT", href: "#" },
      { label: "CONTACT", href: "#" },
    ],
  },
  {
    items: [
      { label: "INDEX", href: "#" },
      { label: "PRIVACY", href: "#" },
      { label: "TERMS & CONDITIONS", href: "#" },
    ],
  },
];

const SOCIAL_ICONS = [
  { label: "TikTok", path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.62a8.16 8.16 0 0 0 4.77 1.52V6.69a4.85 4.85 0 0 1-1.84 0z" },
  { label: "Instagram", custom: true },
  { label: "YouTube", path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
];

export function Footer() {
  return (
    <footer
      className="relative w-full overflow-hidden bg-primary-orange paper-texture"
      aria-label="Footer"
    >
      <div className="dust-specks" />

      <div className="relative w-full px-6 pt-20 pb-0 md:px-10 md:pt-28 lg:px-16 lg:pt-32">
        <div className="flex flex-col items-center justify-center pt-6 md:flex-row md:items-center md:justify-between md:pt-0">
          <Reveal>
            <p className="text-[10px] font-bold uppercase tracking-[0.05em] text-warm-white md:text-xs">
              MATCHA PARTY
            </p>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[12.1rem] w-[24.2rem] md:h-[16.1rem] md:w-[28.2rem] lg:h-[20.2rem] lg:w-[36.3rem]"
          >
            <Image
              src="/mp3-logo-new.png"
              alt="MP3 Social"
              fill
              sizes="(min-width: 1024px) 52rem, (min-width: 768px) 40rem, 35rem"
              className="object-contain"
              quality={100}
            />
          </motion.div>

          <Reveal delay={0.1}>
            <p className="text-right text-[10px] font-bold uppercase tracking-[0.05em] text-warm-white md:text-xs">
              IN THIRD SPACES
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 pt-10 pb-8 md:mt-16 md:grid-cols-3 md:gap-12 md:pt-12 md:pb-10">
          {FOOTER_COLUMNS.map((col, i) => (
            <ul key={i} className="flex flex-col gap-2 md:gap-2.5">
              {col.items.map((item) => (
                <li key={item.label}>
                  <motion.a
                    href={item.href}
                    whileHover={{ x: 4 }}
                    className="inline-block text-[10px] font-bold uppercase tracking-[0.05em] text-warm-white transition-opacity hover:opacity-80 md:text-[11px]"
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-2 py-5 text-[9px] font-medium uppercase tracking-[0.05em] text-warm-white/70 md:flex-row md:items-center md:text-[10px]">
          <p>Designed & developed by desgnmate.com</p>
          <p>© 2026 MP3Social. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
