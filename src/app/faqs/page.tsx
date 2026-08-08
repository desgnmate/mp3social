import type { Metadata } from "next";
import Link from "next/link";
import { EditorialHeading, EditorialShell } from "@/components/EditorialShell";
import {
  StandaloneFaqs,
  type StandaloneFaq,
} from "@/components/StandaloneFaqs";

export const metadata: Metadata = {
  title: "FAQs | MP3 Social",
  description:
    "Answers about MP3 Social events, sober-friendly rooms, catering and partnerships.",
};

const FAQS: StandaloneFaq[] = [
  {
    category: "The idea",
    question: "Is MP3 Social a club?",
    answer:
      "Not exactly. We create sober-friendly music, matcha and community events in spaces that sit between a café, a party and a creative gathering.",
  },
  {
    category: "The room",
    question: "Do I need to be sober to come?",
    answer:
      "No. Respect the room and people in it. We build energy around sound, matcha and connection without making alcohol central to the experience.",
  },
  {
    category: "Events",
    question: "Where are events held?",
    answer:
      "Locations change with every event. Confirmed venue, timing, age policy and entry details appear on the event listing and ticket confirmation.",
  },
  {
    category: "Catering",
    question: "Can I bring MP3 to my event?",
    answer:
      "Yes. We cater offices, launches, weddings, workshops, festivals and brand activations. Start with your date, city, guest count and preferred format.",
  },
  {
    category: "Events",
    question: "Are events all ages?",
    answer:
      "Some are. Every event listing states its age policy and entry requirements, so check details before booking.",
  },
  {
    category: "Collaborations",
    question: "How do partnerships work?",
    answer:
      "Send the idea, audience, location and timing. We choose collaborations useful to the community, with a clear reason for everyone to gather.",
  },
];

export default function FAQsPage() {
  return (
    <EditorialShell
      layout="index"
      heroVariant="content"
      compact
      title={
        <>
          Ask us
          <br />
          <span className="text-primary-orange">anything.</span>
        </>
      }
      intro="Short answers for people arriving, collaborating or asking us to build a room."
      image="/hero-bg-web.jpg"
      imageAlt="Crowd gathered at MP3 Social"
      imagePosition="object-[65%_center]"
      primaryCta={{ href: "/contact", label: "Contact us" }}
    >
      <section className="editorial-section">
        <div className="page-container-wide grid gap-16 lg:grid-cols-12 lg:gap-8">
          <aside className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start" data-reveal>
            <EditorialHeading className="max-w-[7ch]">
              Before you hit <span className="text-primary-orange">send.</span>
            </EditorialHeading>
            <p className="mt-7 max-w-sm text-base font-medium leading-relaxed text-dark-text/60">
              No answer here? Send one clear email. We reply within two business days.
            </p>
            <Link href="/contact" className="editorial-text-link mt-8">
              Contact us <span aria-hidden="true">↗</span>
            </Link>
          </aside>

          <div className="lg:col-span-7 lg:col-start-6" data-reveal>
            <StandaloneFaqs items={FAQS} />
          </div>
        </div>
      </section>

      <section className="editorial-section pt-0">
        <div className="fresh-cta-band page-container-wide grid gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-12 lg:items-end">
          <h2 className="section-title-clamp editorial-statement heading-display text-balance leading-[0.88] tracking-[-0.055em] text-warm-white lg:col-span-9" data-reveal>
            Date. City. Guests. <span className="text-warm-white">We handle the rest.</span>
          </h2>
          <Link href="/book-now" className="editorial-button border-warm-white bg-warm-white text-primary-orange hover:border-dark-text lg:col-span-3 lg:justify-self-end">
            Book catering <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </EditorialShell>
  );
}
