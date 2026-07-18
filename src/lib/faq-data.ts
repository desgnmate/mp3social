export type FAQItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Is MP3 Social a club?",
    answer:
      "Not exactly. We create sober-friendly music, matcha and community events in spaces that feel somewhere between a cafe, a party and a creative gathering.",
  },
  {
    question: "Do I need to be sober to come?",
    answer:
      "No. You only need to respect the room and the people in it. Our events focus on connection and energy without making alcohol the centre of the experience.",
  },
  {
    question: "Where are events held?",
    answer:
      "Locations change by event. Confirmed details are shared on the event listing and directly with ticket holders.",
  },
  {
    question: "Can I bring MP3 to my event?",
    answer:
      "Yes. Our catering team handles office events, launches, weddings, workshops and brand activations. Visit the catering page to explore the formats.",
  },
  {
    question: "How do partnerships work?",
    answer:
      "Send us the idea, audience and timing through the contact page. We review collaborations that genuinely fit the community.",
  },
];

export const FAQ_LABELS = [
  "EVENTS",
  "CATERING",
  "COMMUNITY",
] as const;
