import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "MP3 Social — Matcha Party in Third Spaces",
  description:
    "An underground creative community and indie event collective. Sober is the new wasted. Not a club. Not a cafe. Somewhere in between.",
  keywords: [
    "MP3 Social",
    "indie events",
    "matcha party",
    "third spaces",
    "underground",
    "creative community",
  ],
  openGraph: {
    title: "MP3 Social",
    description: "Not a club. Not a cafe. Somewhere in between.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-warm-white text-dark-text">
        <div className="film-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
