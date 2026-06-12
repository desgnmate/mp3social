"use client"

import { useRef } from "react"
import Image from "next/image"
import { ImageTrail } from "@/components/ui/image-trail"
import { FAQ } from "@/components/FAQ"
import { SocialCommunity } from "@/components/SocialCommunity"
import { Footer } from "@/components/Footer"

const images = [
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
  "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d",
].map(url => `${url}?auto=format&fit=crop&w=300&q=80`)

const TRUSTED_BY = [
  "MILKLAB",
  "JBL",
  "REDBULL",
  "MATCHA SOCIETY",
  "KIYOCHA MATCHA",
]

export default function CateringPage() {
  const heroRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative min-h-screen bg-cream">
      {/* Header */}
      <header className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-4 pt-4 md:px-8 md:pt-6 lg:px-10">
        <a href="/" aria-label="MP3 Social home" className="block">
          <div className="relative h-10 w-[88px] md:h-12 md:w-[106px]">
            <Image src="/mp3-logo-new.png" alt="MP3 Social" fill sizes="106px" className="object-contain" quality={100} priority />
          </div>
        </a>
        <nav className="flex items-center gap-3 md:gap-6">
          {["ABOUT", "EVENT", "DRINKS"].map((item) => (
            <a key={item} href="#" className="text-[10px] font-semibold uppercase tracking-[0.05em] text-primary-orange transition-colors duration-200 hover:opacity-70 md:text-xs">
              {item}
            </a>
          ))}
        </nav>
      </header>

      {/* Hero Section with Image Trail */}
      <div className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-cream" ref={heroRef}>
        <div className="absolute inset-0 z-0">
          <ImageTrail containerRef={heroRef}>
            {images.map((url, index) => (
              <div key={index} className="flex relative overflow-hidden w-24 h-24 md:w-32 md:h-32 rounded-lg shadow-lg">
                <img src={url} alt={`Catering event ${index + 1}`} className="object-cover absolute inset-0" />
              </div>
            ))}
          </ImageTrail>
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <h1 className="heading-display text-center text-[clamp(2rem,8vw,6rem)] leading-[1.05] text-primary-orange">
            MATCHA
            <br />
            PARTY
            <br />
            IN THIRD
            <br />
            SPACES
          </h1>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="bg-primary-orange py-4 md:py-6">
        <p className="text-center text-[8px] font-bold uppercase tracking-[0.3em] text-warm-white mb-2 md:mb-3">
          TRUSTED BY
        </p>
        <div className="flex items-center justify-center gap-4 md:gap-8 lg:gap-12 flex-wrap px-4">
          {TRUSTED_BY.map((brand) => (
            <span key={brand} className="text-[10px] font-bold uppercase tracking-[0.1em] text-warm-white md:text-xs">
              {brand}
            </span>
          ))}
        </div>
      </div>

      {/* FAQs Section — using same component as main page */}
      <FAQ />

      {/* Social Media / Image Section — using same component as main page */}
      <SocialCommunity />

      {/* Footer — using same component as main page */}
      <Footer />
    </div>
  )
}
