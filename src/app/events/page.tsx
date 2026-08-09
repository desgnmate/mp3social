import { EventsHero } from "@/components/Hero";
import { HeaderLogo } from "@/components/HeaderLogo";
import { Intro } from "@/components/Intro";
import { Calendar } from "@/components/Calendar";
import { FAQ } from "@/components/FAQ";
import { SocialCommunity } from "@/components/SocialCommunity";
import { Footer } from "@/components/Footer";

export default function EventsPage() {
  return (
    <main className="relative w-full">
      <HeaderLogo />
      <EventsHero />
      <Intro />
      <Calendar />
      <FAQ />
      <SocialCommunity />
      <Footer />
    </main>
  );
}
