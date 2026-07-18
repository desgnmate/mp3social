import { DisplayHeading, SectionLabel, SubpageShell } from "@/components/SubpageShell";

const STEPS = [
  ["01", "Send the basics", "Your date, venue, guest count and event type."],
  ["02", "Build the format", "We recommend a service plan and optional production layers."],
  ["03", "Lock it in", "Approve the scope, secure the date and let us run the room."],
];

export default function BookNowPage() {
  return (
    <SubpageShell navMode="catering" index="03 / 03" eyebrow="Catering inquiry" title="BOOK NOW" intro="Give us the shape of the day. We’ll come back with a clear, custom plan." image="/community-bg.jpg" imageAlt="Crowd enjoying an MP3 Social event">
      <section className="bg-warm-white px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>Three easy steps</SectionLabel>
          <DisplayHeading>FROM IDEA TO EVENT.</DisplayHeading>
          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {STEPS.map(([number, title, copy]) => (
              <article key={number} className="rounded-md border border-primary-orange/15 bg-cream p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-primary-orange text-xs font-bold text-warm-white">{number}</span>
                <h3 className="heading-display mt-16 text-2xl text-primary-orange">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-dark-text/65">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-dark-text px-5 py-24 text-warm-white md:px-10 md:py-36">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
          <div><SectionLabel>Start here</SectionLabel><DisplayHeading light>TELL US ABOUT THE ROOM.</DisplayHeading><p className="mt-7 max-w-md text-sm leading-relaxed text-warm-white/60">The quickest route is email. Include your preferred date, venue, estimated guests and anything you already know about the vibe.</p></div>
          <div className="rounded-md bg-primary-orange p-8 md:p-10"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-warm-white/60">Catering inquiries</p><a href="mailto:hello@mp3social.com?subject=Catering%20inquiry" className="mt-6 block break-all text-2xl font-black uppercase tracking-[-0.04em] md:text-4xl">hello@mp3social.com</a><p className="mt-8 border-t border-warm-white/25 pt-6 text-sm text-warm-white/70">We usually reply within two business days.</p></div>
        </div>
      </section>
    </SubpageShell>
  );
}
