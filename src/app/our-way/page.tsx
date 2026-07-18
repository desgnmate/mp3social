import Image from "next/image";
import { DisplayHeading, PageCTA, SectionLabel, SubpageShell } from "@/components/SubpageShell";

const PILLARS = [
  ["01", "People first", "The room is designed around conversation, movement and shared energy—not a logo wall."],
  ["02", "Matcha with intent", "Thoughtful drinks, fast service and a menu that feels special without slowing the event down."],
  ["03", "Sound sets the pace", "The right music gives every arrival, pause and peak its own shape."],
  ["04", "Every detail belongs", "Styling, cups, signage and service all speak the same visual language."],
];

export default function OurWayPage() {
  return (
    <SubpageShell navMode="catering" index="01 / 03" eyebrow="Catering philosophy" title="OUR WAY" intro="We don’t drop off drinks. We build the feeling of a third space around your people." image="/community-bg.jpg" imageAlt="An energetic MP3 Social gathering">
      <section className="bg-warm-white px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div><SectionLabel>The MP3 approach</SectionLabel><DisplayHeading>GOOD ROOMS DON’T HAPPEN BY ACCIDENT.</DisplayHeading></div>
          <div className="grid border-t border-primary-orange/30 sm:grid-cols-2">
            {PILLARS.map(([number, title, copy]) => <article key={number} className="min-h-64 border-b border-primary-orange/30 py-7 pr-5 sm:odd:border-r sm:odd:pr-8 sm:even:pl-8"><span className="text-[10px] font-bold text-primary-orange/50">{number}</span><h3 className="heading-display mt-12 text-2xl text-primary-orange">{title}</h3><p className="mt-4 text-sm leading-relaxed text-dark-text/65">{copy}</p></article>)}
          </div>
        </div>
      </section>
      <section className="grid bg-primary-orange text-warm-white md:grid-cols-2">
        <div className="relative min-h-[480px] md:min-h-[680px]"><Image src="/calendar-bg.jpg" alt="Matcha drinks prepared for an event" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div>
        <div className="flex flex-col justify-center px-5 py-20 md:px-12"><SectionLabel>Built together</SectionLabel><DisplayHeading light>YOUR BRIEF. OUR ENERGY.</DisplayHeading><p className="mt-8 max-w-md text-sm leading-relaxed text-warm-white/70">We begin with who is coming, why they are gathering and how you want them to feel when they leave. The menu and production follow from there.</p></div>
      </section>
      <PageCTA title="SEE WHAT COMES WITH IT." copy="Explore the service layers we can combine for your event." href="/whats-included" label="What’s included" />
    </SubpageShell>
  );
}
