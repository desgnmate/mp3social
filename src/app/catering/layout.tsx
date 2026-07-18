import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Matcha Rave Catering | MP3 Social",
  description:
    "Ceremonial matcha, a full-service mobile bar, DJ-ready sound, styling and event production for rooms starting at 30.",
  openGraph: {
    title: "Matcha Rave Catering | MP3 Social",
    description:
      "Bring the crowd. MP3 Social brings the matcha bar, sound, styling and crew.",
    type: "website",
    images: [
      {
        url: "/catering-og.png",
        alt: "MP3 Social Matcha Rave Catering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Matcha Rave Catering | MP3 Social",
    description:
      "Ceremonial matcha at volume. Built for parties, launches and sober-friendly raves.",
    images: ["/catering-og.png"],
  },
};

export default function CateringLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
