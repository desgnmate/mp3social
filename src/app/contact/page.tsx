import type { Metadata } from "next";
import Link from "next/link";
import {
  EditorialHeading,
  EditorialKicker,
  EditorialSerif,
  EditorialShell,
} from "@/components/EditorialShell";

export const metadata: Metadata = {
  title: "Contact — MP3 Social",
  description:
    "Talk to MP3 Social about events, catering, partnerships and creative ideas.",
};

type ContactRoute = {
  number: string;
  label: string;
  note: string;
  subject?: string;
  href?: string;
};

const CONTACTS: ContactRoute[] = [
  {
    number: "01",
    label: "Events + partnerships",
    note: "Collaborations, venues, programming and good reasons to gather.",
    subject: "Events and partnerships",
  },
  {
    number: "02",
    label: "Catering + activations",
    note: "Matcha bars, rave layers, guest counts and dates worth holding.",
    href: "/book-now",
  },
  {
    number: "03",
    label: "Press + creative",
    note: "Editorial, production, talent and ideas that need the right context.",
    subject: "Press and creative",
  },
];

export default function ContactPage() {
  return (
    <EditorialShell
      code="HELLO / 004"
      eyebrow="Contact MP3"
      title={
        <>
          GOOD IDEAS
          <br />
          <EditorialSerif className="text-primary-orange">
            start here.
          </EditorialSerif>
        </>
      }
      intro="A useful collaboration usually starts with a clear thought and one direct message. Pick the right lane and tell us what you’re making."
      image="/calendar-bg.jpg"
      imageAlt="MP3 Social matcha drinks and event materials"
      imagePosition="object-[58%_center]"
      primaryCta={{
        href: "mailto:hello@mp3social.com?subject=Hello%20MP3",
        label: "Email MP3",
      }}
      secondaryCta={{ href: "/book-now", label: "Book catering" }}
    >
      <section className="bg-warm-white px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-6xl">
          <div
            data-reveal
            className="grid gap-10 border-b border-primary-orange/30 pb-12 md:grid-cols-[0.7fr_1.3fr] md:items-end"
          >
            <EditorialKicker>Choose a lane</EditorialKicker>
            <EditorialHeading>
              SEND IT TO THE
              <br />
              <EditorialSerif className="text-primary-orange">
                right room.
              </EditorialSerif>
            </EditorialHeading>
          </div>

          <div data-stagger>
            {CONTACTS.map((contact) => {
              const href =
                contact.href ??
                `mailto:hello@mp3social.com?subject=${encodeURIComponent(
                  contact.subject ?? contact.label,
                )}`;

              return (
                <Link
                  key={contact.number}
                  href={href}
                  className="group grid gap-4 border-b border-primary-orange/30 py-8 transition-[background-color,padding] hover:bg-primary-orange hover:px-5 hover:text-warm-white md:grid-cols-[4rem_1fr_1fr_auto] md:items-center md:gap-8 md:py-10"
                >
                  <span className="text-[10px] font-bold opacity-50">
                    {contact.number}
                  </span>
                  <h2 className="heading-display text-2xl md:text-3xl">
                    {contact.label}
                  </h2>
                  <p className="max-w-md text-sm leading-relaxed opacity-60">
                    {contact.note}
                  </p>
                  <span
                    aria-hidden="true"
                    className="text-xl transition-transform group-hover:translate-x-1"
                  >
                    ↗
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-dark-text px-5 py-24 text-warm-white md:px-10 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div data-reveal>
            <EditorialKicker light>The useful first email</EditorialKicker>
            <EditorialHeading light className="mt-8">
              IDEA. PEOPLE.
              <br />
              PLACE. TIMING.
            </EditorialHeading>
          </div>
          <div
            data-reveal
            className="border-l border-primary-orange pl-6 text-sm leading-relaxed text-warm-white/62 md:pl-8"
          >
            <p>
              Tell us what you’re making, who it is for, where it happens, your
              preferred timing and the part you want MP3 to play.
            </p>
            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.14em] text-primary-orange">
              Usually back within two business days
            </p>
          </div>
        </div>
      </section>
    </EditorialShell>
  );
}
