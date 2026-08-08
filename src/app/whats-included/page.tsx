import { DisplayHeading, PageCTA, SectionLabel, SubpageShell } from "@/components/SubpageShell";

const INCLUDED = [
  { title: "Matcha bar", items: ["Ceremonial-grade matcha", "Two signature drinks", "Dedicated barista team", "Cups, ice and service ware"] },
  { title: "Sound", items: ["Professional JBL system", "Wireless microphones", "Curated MP3 playlist", "Optional live DJ"] },
  { title: "Space", items: ["Service furniture", "Menu and bar signage", "Lighting direction", "Optional florals and photo moment"] },
  { title: "Production", items: ["Run-of-show planning", "Supplier coordination", "On-site event lead", "Setup, service and reset"] },
];

export default function WhatsIncludedPage() {
  return (
    <SubpageShell navMode="catering" index="02 / 03" title="WHAT’S INCLUDED" intro="Start with the bar, then add the sound, styling and production your room needs." image="/calendar-bg.jpg" imageAlt="MP3 Social matcha service setup">
      <section className="bg-cream px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-6xl"><SectionLabel>Mix and match</SectionLabel><DisplayHeading>ONE TEAM. EVERY LAYER.</DisplayHeading>
          <div className="mt-16 grid gap-5 md:grid-cols-2">{INCLUDED.map((group, index) => <article key={group.title} className={`rounded-md border border-primary-orange/15 p-7 md:p-10 ${index === 0 || index === 3 ? "bg-primary-orange text-warm-white" : "bg-warm-white"}`}><span className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-50">0{index + 1}</span><h3 className="heading-display mt-10 text-3xl md:text-4xl">{group.title}</h3><ul className="mt-8 space-y-3 border-t border-current/20 pt-6">{group.items.map((item) => <li key={item} className="flex items-center justify-between gap-4 text-sm"><span>{item}</span><span className="opacity-40">+</span></li>)}</ul></article>)}</div>
        </div>
      </section>
      <section className="bg-primary-orange px-5 py-24 text-warm-white md:px-10 md:py-32"><div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-3"><div><p className="heading-display text-6xl">30+</p><p className="mt-3 text-xs uppercase tracking-[0.14em] text-warm-white/60">Guests from</p></div><div><p className="heading-display text-6xl">2—6H</p><p className="mt-3 text-xs uppercase tracking-[0.14em] text-warm-white/60">Typical service window</p></div><div><p className="heading-display text-6xl">100%</p><p className="mt-3 text-xs uppercase tracking-[0.14em] text-warm-white/60">Customisable</p></div></div></section>
      <PageCTA title="READY TO SHAPE THE ROOM?" copy="Tell us your date, guest count and the layers you have in mind." href="/book-now" label="Book now" />
    </SubpageShell>
  );
}
