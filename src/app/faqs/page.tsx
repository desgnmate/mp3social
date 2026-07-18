import { DisplayHeading, PageCTA, SectionLabel, SubpageShell } from "@/components/SubpageShell";

const FAQS = [
  ["Is MP3 Social a club?", "Not exactly. We create sober-friendly music, matcha and community events in spaces that feel somewhere between a cafe, a party and a creative gathering."],
  ["Do I need to be sober?", "No. You only need to respect the room and the people in it. Our events focus on connection and energy without making alcohol the centre of the experience."],
  ["Where are events held?", "Locations change by event. Confirmed details are shared on the event listing and with ticket holders."],
  ["Can I bring MP3 to my event?", "Yes. Our catering team handles office events, launches, weddings, workshops and brand activations."],
  ["Are events all ages?", "Some are. Every listing clearly states its age policy, schedule and entry requirements."],
  ["How do partnerships work?", "Send us the idea, audience and timing through the contact page. We review collaborations that genuinely fit the community."],
];

export default function FAQsPage() {
  return (
    <SubpageShell index="02 / 04" eyebrow="Good to know" title="FAQs" intro="Straight answers about the events, the community and bringing MP3 into your space." image="/community-bg.jpg" imageAlt="MP3 Social crowd">
      <section className="bg-warm-white px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-5xl">
          <SectionLabel>Ask away</SectionLabel>
          <DisplayHeading>THE USEFUL STUFF.</DisplayHeading>
          <div className="mt-16">
            {FAQS.map(([question, answer], index) => (
              <article key={question} className="grid gap-5 border-t border-primary-orange/30 py-8 md:grid-cols-[5rem_1fr_1fr] md:gap-10">
                <span className="text-[10px] font-bold text-primary-orange/50">0{index + 1}</span>
                <h3 className="heading-display text-2xl text-primary-orange">{question}</h3>
                <p className="text-sm leading-relaxed text-dark-text/65">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <PageCTA title="STILL CURIOUS?" copy="Send the question our way and we’ll point you in the right direction." href="/contact" label="Ask us" />
    </SubpageShell>
  );
}
