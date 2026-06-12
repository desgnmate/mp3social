export type CalendarEvent = {
  month: number;
  date: number;
  title: string;
  time: string;
  location: string;
  description: string;
  tags: string[];
};

export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    month: 4,
    date: 9,
    title: "CHAPEL TAKEOVER",
    time: "Fri, May 9 · 8:00 PM",
    location: "MP3 Social · Main Hall",
    description:
      "An immersive night of live vocals, candlelight and curated sound. Limited capacity. Doors open 30 minutes before showtime.",
    tags: ["LIVE MUSIC", "CANDLELIT", "21+"],
  },
  {
    month: 4,
    date: 14,
    title: "MATCHA PARTY",
    time: "Thu, May 14 · 7:00 PM",
    location: "MP3 Social · Garden Bar",
    description:
      "Matcha, mocktails, and a full DJ set. Sip, slow down, and meet the people behind your favourite local tea brands.",
    tags: ["MOCKTAILS", "POP-UP", "ALL AGES"],
  },
  {
    month: 4,
    date: 18,
    title: "ART GALLERY TAKEOVER",
    time: "Mon, May 18 · 6:30 PM",
    location: "MP3 Social · Loft Gallery",
    description:
      "A one-night-only exhibition featuring emerging artists from the neighbourhood. Walk-through, then stay for the afterparty.",
    tags: ["ART", "EXHIBITION", "AFTERPARTY"],
  },
];

export const MONTHS = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
] as const;

export type CalendarCell =
  | { empty: true; day: null }
  | { empty: false; day: number };

export function getMonthDays(monthIndex: number, year: number): CalendarCell[] {
  const firstDay = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells: CalendarCell[] = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push({ empty: true, day: null });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ empty: false, day: d });
  }
  while (cells.length < 42) {
    cells.push({ empty: true, day: null });
  }
  return cells;
}
