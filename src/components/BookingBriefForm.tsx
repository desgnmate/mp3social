"use client";

import { useState, type FormEvent } from "react";

const SERVICES = [
  {
    value: "Matcha bar",
    label: "Matcha bar",
    note: "Ceremonial drinks, service and the MP3 setup.",
  },
  {
    value: "Matcha + rave",
    label: "Matcha + rave",
    note: "The bar plus sound, styling and room energy.",
  },
];

export function BookingBriefForm() {
  const [service, setService] = useState(SERVICES[0].value);

  const submitBrief = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const date = String(data.get("date") ?? "");
    const city = String(data.get("city") ?? "");
    const guests = String(data.get("guests") ?? "");
    const details = String(data.get("details") ?? "");

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Service: ${service}`,
      `Preferred date: ${date || "Not confirmed"}`,
      `City / venue: ${city}`,
      `Estimated guests: ${guests}`,
      "",
      "Event brief:",
      details,
    ].join("\n");

    window.location.href = `mailto:hello@mp3social.com?subject=${encodeURIComponent(
      `Catering inquiry — ${name || "new event"}`,
    )}&body=${encodeURIComponent(body)}`;
  };

  const fieldClass =
    "mt-2 min-h-12 w-full border-0 border-b border-dark-text/25 bg-transparent px-0 text-base text-dark-text outline-none transition-colors placeholder:text-dark-text/30 focus:border-primary-orange";
  const labelClass =
    "text-[9px] font-bold uppercase tracking-[0.15em] text-dark-text/55";

  return (
    <form onSubmit={submitBrief} className="bg-warm-white p-6 md:p-10 lg:p-12">
      <div className="flex items-center justify-between gap-5 border-b border-dark-text/15 pb-7">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-primary-orange">
            Event brief
          </p>
          <h2 className="heading-display mt-2 text-3xl text-dark-text">
            Start with the shape.
          </h2>
        </div>
        <span className="flex h-11 w-11 items-center justify-center bg-primary-orange text-xs font-black text-warm-white">
          01
        </span>
      </div>

      <fieldset className="mt-8">
        <legend className={labelClass}>What should we bring?</legend>
        <div className="mt-3 grid gap-px bg-dark-text/15 sm:grid-cols-2">
          {SERVICES.map((option) => (
            <label
              key={option.value}
              className={`cursor-pointer p-5 transition-colors ${
                service === option.value
                  ? "bg-primary-orange text-warm-white"
                  : "bg-cream text-dark-text hover:bg-warm-beige"
              }`}
            >
              <input
                type="radio"
                name="service"
                value={option.value}
                checked={service === option.value}
                onChange={() => setService(option.value)}
                className="sr-only"
              />
              <span className="heading-display block text-xl">{option.label}</span>
              <span
                className={`mt-2 block text-xs leading-relaxed ${
                  service === option.value
                    ? "text-warm-white/72"
                    : "text-dark-text/55"
                }`}
              >
                {option.note}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <label>
          <span className={labelClass}>Your name *</span>
          <input
            required
            name="name"
            autoComplete="name"
            placeholder="First and last name"
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>Email *</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@email.com"
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>Preferred date</span>
          <input type="date" name="date" className={fieldClass} />
        </label>
        <label>
          <span className={labelClass}>City / venue *</span>
          <input
            required
            name="city"
            placeholder="Melbourne, venue TBC"
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>Estimated guests *</span>
          <input
            required
            type="number"
            name="guests"
            min="30"
            placeholder="30+"
            className={fieldClass}
          />
        </label>
      </div>

      <label className="mt-8 block">
        <span className={labelClass}>Tell us about the room *</span>
        <textarea
          required
          name="details"
          rows={4}
          placeholder="Event type, audience, timing and the feeling you want..."
          className={`${fieldClass} resize-y py-3`}
        />
      </label>

      <button
        type="submit"
        className="group mt-9 flex min-h-14 w-full items-center justify-between bg-primary-orange px-5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-warm-white transition-colors hover:bg-burnt-orange"
      >
        Open completed email
        <span
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-1"
        >
          ↗
        </span>
      </button>
      <p className="mt-4 text-xs leading-relaxed text-dark-text/45">
        This prepares your brief in your email app. No details are stored on this
        website.
      </p>
    </form>
  );
}
