import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const isMegan = process.env.NEXT_PUBLIC_SITE_TARGET === 'megan';

export const metadata: Metadata = {
  title: isMegan ? "Megan's 40th Birthday Weekend" : "Megan's 40th Surprise!",
  description: isMegan 
    ? "The itinerary for a magical weekend at the Disneyland Resort." 
    : "Join us for a magical weekend at Disneyland for Megan's 40th Birthday!",
};

import SentryInitializer from "@/components/SentryInitializer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`}>
      <body>
        <SentryInitializer />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
