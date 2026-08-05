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
      eyebrow="Contact MP3"
      layout="contact"
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

          <div className="mt-16 grid gap-px overflow-hidden bg-dark-text/15 lg:grid-cols-12" data-stagger>
            {CONTACTS.map((contact, index) => (
              <Link
                key={contact.label}
                href={contact.href}
                className={`group flex min-h-[19rem] flex-col justify-between bg-warm-white p-7 transition-colors hover:bg-primary-orange hover:text-warm-white sm:p-9 ${
                  index === 0
                    ? "lg:col-span-5"
                    : index === 1
                      ? "lg:col-span-3"
                      : "lg:col-span-4"
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

      <section className="editorial-section border-y border-dark-text/15">
        <div className="page-container-wide grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8" data-reveal>
            <h2 className="editorial-statement heading-display text-balance leading-[0.88] tracking-[-0.055em]">
              Idea. People.
              <br />
              Place. <span className="text-primary-orange">Timing.</span>
            </h2>
          </div>
          <div className="lg:col-span-3 lg:col-start-10" data-reveal>
            <p className="text-base font-medium leading-relaxed text-dark-text/65">
              Tell us what you are making, who it serves, where it happens, preferred timing and MP3&apos;s role.
            </p>
            <p className="mt-6 border-l-2 border-primary-orange pl-4 text-sm font-semibold text-primary-orange">
              Usually back within two business days.
            </p>
          </div>
        </div>
      </section>
    </EditorialShell>
  );
}
