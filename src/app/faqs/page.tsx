import type { Metadata } from "next";
import Link from "next/link";
import {
  EditorialHeading,
  EditorialKicker,
  EditorialSerif,
  EditorialShell,
} from "@/components/EditorialShell";
import {
  StandaloneFaqs,
  type StandaloneFaq,
} from "@/components/StandaloneFaqs";

export const metadata: Metadata = {
  title: "FAQs — MP3 Social",
  description:
    "Answers about MP3 Social events, sober-friendly rooms, catering and partnerships.",
};

const FAQS: StandaloneFaq[] = [
  {
    category: "The idea",
    question: "Is MP3 Social a club?",
    answer:
      "Not exactly. We create sober-friendly music, matcha and community events in spaces that sit somewhere between a café, a party and a creative gathering.",
  },
  {
    category: "The room",
    question: "Do I need to be sober to come?",
    answer:
      "No. You only need to respect the room and the people in it. We build energy around sound, matcha and connection without making alcohol the centre of the experience.",
  },
  {
    category: "Events",
    question: "Where are events held?",
    answer:
      "Locations change with every event. Confirmed venue, timing, age policy and entry details are shared on the event listing and with ticket holders.",
  },
  {
    category: "Catering",
    question: "Can I bring MP3 to my event?",
    answer:
      "Yes. We cater offices, launches, weddings, workshops, festivals and brand activations. Start with your date, city, guest count and whether you want a matcha bar or the full rave layer.",
  },
  {
    category: "Events",
    question: "Are the events all ages?",
    answer:
      "Some are. Every event listing clearly states its age policy and any entry requirements, so check the details before you book.",
  },
  {
    category: "Collaborations",
    question: "How do partnerships work?",
    answer:
      "Send us the idea, audience, location and timing. We say yes to collaborations that feel useful to the community and give everyone a real reason to be in the room.",
  },
];

export default function FAQsPage() {
  return (
    <EditorialShell
      code="INFO / 002"
      eyebrow="The useful stuff"
      tone="orange"
      compact
      title={
        <>
          ASK US
          <br />
          <EditorialSerif>anything.</EditorialSerif>
        </>
      }
      intro="Short answers to the things people ask before they arrive, collaborate, or ask us to build a room."
      image="/community-bg.jpg"
      imageAlt="A crowd gathered at an MP3 Social event"
      imagePosition="object-[62%_center]"
      primaryCta={{ href: "/book-now", label: "Book the matcha bar" }}
    >
      <section className="bg-warm-white px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <aside data-reveal className="lg:sticky lg:top-28 lg:self-start">
            <EditorialKicker>Quick answers</EditorialKicker>
            <EditorialHeading className="mt-7">
              BEFORE
              <br />
              YOU HIT
              <br />
              <EditorialSerif className="text-primary-orange">
                send.
              </EditorialSerif>
            </EditorialHeading>
            <p className="mt-7 max-w-sm text-sm leading-relaxed text-dark-text/60">
              Can’t find the answer? Send one clear email. We usually reply
              within two business days.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-7 text-[10px] font-extrabold uppercase tracking-[0.14em] text-primary-orange underline decoration-primary-orange/30 underline-offset-8"
            >
              Ask something else <span aria-hidden="true">↗</span>
            </Link>
          </aside>

          <div data-reveal>
            <StandaloneFaqs items={FAQS} />
          </div>
        </div>
      </section>

      <section className="bg-dark-text px-5 py-20 text-warm-white md:px-10 md:py-28">
        <div
          data-reveal
          className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <EditorialKicker light>Catering questions</EditorialKicker>
            <h2 className="heading-display mt-6 max-w-[14ch] text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.82]">
              DATE. CITY. GUESTS.
              <br />
              WE’LL HANDLE THE REST.
            </h2>
          </div>
          <Link
            href="/book-now"
            className="inline-flex min-h-14 shrink-0 items-center gap-10 bg-primary-orange px-6 text-[10px] font-extrabold uppercase tracking-[0.14em] text-warm-white transition-colors hover:bg-burnt-orange"
          >
            Start a brief <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </EditorialShell>
  );
}
