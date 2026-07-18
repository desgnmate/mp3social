import { DisplayHeading, SectionLabel, SubpageShell } from "@/components/SubpageShell";

const CONTACTS = [
  { label: "General + partnerships", email: "hello@mp3social.com" },
  { label: "Catering + activations", email: "hello@mp3social.com" },
  { label: "Press + creative", email: "hello@mp3social.com" },
];

export default function ContactPage() {
  return (
    <SubpageShell index="04 / 04" eyebrow="Contact MP3" title="LET’S TALK" intro="A good collaboration usually starts with a clear idea and one very direct email." image="/calendar-bg.jpg" imageAlt="MP3 Social drinks and event details">
      <section className="bg-cream px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>Choose a lane</SectionLabel>
          <DisplayHeading>WHERE SHOULD THIS GO?</DisplayHeading>
          <div className="mt-16">
            {CONTACTS.map((contact, index) => (
              <a key={contact.label} href={`mailto:${contact.email}?subject=${encodeURIComponent(contact.label)}`} className="group grid gap-4 border-t border-primary-orange/30 py-8 transition-colors hover:bg-primary-orange hover:px-5 hover:text-warm-white md:grid-cols-[5rem_1fr_1fr] md:items-center">
                <span className="text-[10px] font-bold opacity-50">0{index + 1}</span>
                <h3 className="heading-display text-2xl md:text-3xl">{contact.label}</h3>
                <span className="break-all text-sm font-semibold md:text-right">{contact.email} <span className="ml-3 transition-transform group-hover:translate-x-1">→</span></span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-dark-text px-5 py-24 text-warm-white md:px-10 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <p className="heading-display text-[clamp(3.5rem,7vw,6rem)] leading-[0.8]">SEND THE IDEA WHILE IT’S FRESH.</p>
          <div className="space-y-5 text-sm leading-relaxed text-warm-white/65">
            <p>Helpful first-email details: what you’re making, who it is for, where it happens, your preferred timing and the part you want MP3 to play.</p>
            <p>We usually reply within two business days.</p>
          </div>
        </div>
      </section>
    </SubpageShell>
  );
}
