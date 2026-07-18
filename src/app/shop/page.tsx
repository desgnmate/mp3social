import Image from "next/image";
import { DisplayHeading, PageCTA, SectionLabel, SubpageShell } from "@/components/SubpageShell";

const DROPS = [
  { title: "Event passes", note: "Entry to our next morning rave and community sessions.", image: "/sticker-1.png" },
  { title: "Matcha kits", note: "The MP3 serve for your kitchen, desk or next pre-game.", image: "/sticker-2.png" },
  { title: "Small-run merch", note: "Wearable evidence that you were there before everyone else.", image: "/sticker-4.png" },
];

export default function ShopPage() {
  return (
    <SubpageShell index="01 / 04" eyebrow="MP3 store" title="THE SHOP" intro="Small drops, good objects and passes to wherever we’re gathering next." image="/calendar-bg.jpg" imageAlt="MP3 Social drinks and branded cups">
      <section className="bg-cream px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>Coming in small runs</SectionLabel>
          <DisplayHeading>THINGS FOR THE THIRD SPACE.</DisplayHeading>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {DROPS.map((drop, index) => (
              <article key={drop.title} className="rounded-md border border-primary-orange/15 bg-warm-white p-5">
                <div className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-sm ${index === 1 ? "bg-primary-orange" : "bg-warm-beige"}`}><div className="relative h-2/3 w-2/3"><Image src={drop.image} alt="" fill sizes="260px" className="object-contain drop-shadow-xl" /></div></div>
                <div className="px-2 py-7"><h3 className="heading-display text-3xl text-primary-orange">{drop.title}</h3><p className="mt-4 text-sm leading-relaxed text-dark-text/60">{drop.note}</p><span className="mt-7 inline-block rounded-sm border border-primary-orange px-4 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-primary-orange">Drop soon</span></div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <PageCTA title="WANT FIRST DIBS?" copy="Ask to join the drop list and we’ll let you know before the next release lands." href="/contact" label="Contact us" />
    </SubpageShell>
  );
}
