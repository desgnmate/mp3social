import type { Metadata } from "next";
import Link from "next/link";
import { EditorialHeading, EditorialShell } from "@/components/EditorialShell";

export const metadata: Metadata = {
  title: "Contact | MP3 Social",
  description:
    "Talk to MP3 Social about events, catering, partnerships and creative ideas.",
};

const CONTACTS = [
  {
    label: "Events + partnerships",
    note: "Collaborations, venues, programming and good reasons to gather.",
    href: "mailto:hello@mp3social.com?subject=Events%20and%20partnerships",
  },
  {
    label: "Catering + activations",
    note: "Matcha bars, rave layers, guest counts and dates worth holding.",
    href: "/book-now",
  },
  {
    label: "Press + creative",
    note: "Editorial, production, talent and ideas needing the right context.",
    href: "mailto:hello@mp3social.com?subject=Press%20and%20creative",
  },
];

export default function ContactPage() {
  return (
    <EditorialShell
      layout="contact"
      heroVariant="content"
      title={
        <>
          Good ideas
          <br />
          <span className="text-primary-orange">start here.</span>
        </>
      }
      intro="Pick the right lane and tell us what you are making, who it serves and when it needs to happen."
      image="/calendar-bg.jpg"
      imageAlt="Matcha drinks and event materials at MP3 Social"
      imagePosition="object-[57%_center]"
      primaryCta={{
        href: "mailto:hello@mp3social.com?subject=Hello%20MP3",
        label: "Email MP3",
      }}
      secondaryCta={{ href: "/book-now", label: "Book catering" }}
    >
      <section className="editorial-section">
        <div className="page-container-wide">
          <div className="grid gap-8 lg:grid-cols-12">
            <EditorialHeading className="max-w-[8ch] lg:col-span-7">
              Send it to the <span className="text-primary-orange">right room.</span>
            </EditorialHeading>
            <p className="max-w-sm self-end text-base font-medium leading-relaxed text-dark-text/60 lg:col-span-4 lg:col-start-9">
              One inbox, three clear routes. Choose yours and include useful context.
            </p>
          </div>

          <div className="fresh-card-grid mt-16 lg:grid-cols-12" data-stagger>
            {CONTACTS.map((contact, index) => (
              <Link
                key={contact.label}
                href={contact.href}
                className={`fresh-card group flex min-h-[19rem] flex-col justify-between p-7 transition-[background-color,color,transform] hover:-translate-y-1 hover:bg-primary-orange hover:text-warm-white sm:p-9 ${
                  index === 0
                    ? "bg-cream lg:col-span-5"
                    : index === 1
                      ? "bg-primary-orange text-warm-white lg:col-span-3"
                      : "bg-cream-beige lg:col-span-4"
                }`}
              >
                <span className="text-2xl transition-transform group-hover:translate-x-1" aria-hidden="true">
                  ↗
                </span>
                <div>
                  <h2 className="heading-display max-w-[12ch] text-3xl leading-[0.95] sm:text-4xl">
                    {contact.label}
                  </h2>
                  <p className="mt-5 max-w-sm text-sm font-medium leading-relaxed opacity-60">
                    {contact.note}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section pt-0">
        <div className="fresh-cta-band page-container-wide grid gap-12 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8" data-reveal>
            <h2 className="section-title-clamp editorial-statement heading-display text-balance leading-[0.88] tracking-[-0.055em] text-warm-white">
              Idea. People.
              <br />
              Place. <span className="text-warm-white">Timing.</span>
            </h2>
          </div>
          <div className="lg:col-span-3 lg:col-start-10" data-reveal>
            <p className="text-base font-medium leading-relaxed text-warm-white/75">
              Tell us what you are making, who it serves, where it happens, preferred timing and MP3&apos;s role.
            </p>
            <p className="mt-6 border-l-2 border-warm-white pl-4 text-sm font-semibold text-warm-white">
              Usually back within two business days.
            </p>
          </div>
        </div>
      </section>
    </EditorialShell>
  );
}
