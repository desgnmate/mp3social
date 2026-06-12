"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Hero } from "@/components/Hero";
import { HeaderLogo } from "@/components/HeaderLogo";
import { Intro } from "@/components/Intro";
import { Calendar } from "@/components/Calendar";
import { FAQ } from "@/components/FAQ";
import { SocialCommunity } from "@/components/SocialCommunity";
import { Footer } from "@/components/Footer";
import { Loader } from "@/components/Loader";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [contentHidden, setContentHidden] = useState(false);
  const router = useRouter();
  const choiceRef = useRef<"events" | "catering" | null>(null);

  const handleSelect = (choice: "events" | "catering") => {
    choiceRef.current = choice;
    if (choice === "catering") {
      setContentHidden(true);
    }
  };

  const handleComplete = () => {
    if (choiceRef.current === "catering") {
      router.push("/catering");
    } else {
      setLoaded(true);
    }
  };

  return (
    <>
      {!loaded && (
        <Loader onComplete={handleComplete} onSelect={handleSelect} />
      )}
      <main
        className="relative w-full"
        style={{ visibility: contentHidden ? "hidden" : "visible" }}
      >
        <HeaderLogo />
        {/* One continuous orange background for hero + intro */}
        <div className="relative bg-primary-orange">
          <Hero />
          <Intro />
        </div>
        <Calendar />
        <FAQ />
        <SocialCommunity />
        <Footer />
      </main>
    </>
  );
}
