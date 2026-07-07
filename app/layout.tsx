import type { Metadata, Viewport } from "next";
import {
  Instrument_Serif,
  Newsreader,
  JetBrains_Mono,
  Caveat,
} from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import GrainOverlay from "@/components/GrainOverlay";
import KonamiCode from "@/components/KonamiCode";
import ChatWidget from "@/components/ChatWidget";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Newsreader({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  style: ["normal", "italic"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const hand = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vaishnavi Dubey — Field Journal",
  description:
    "The working notebook of Vaishnavi Dubey — developer, writer, occasional fixer of things. Entries on craft, side-projects, and what I'm learning out loud.",
  metadataBase: new URL("https://vaishnavi-dubey.vercel.app"),
  openGraph: {
    title: "Vaishnavi Dubey — Field Journal",
    description:
      "The working notebook of a developer who builds for the web.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B102B",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${display.variable} ${body.variable} ${mono.variable} ${hand.variable} dark`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <ScrollProgress />
          <GrainOverlay />
          <CustomCursor />
          <KonamiCode />
          <Navbar />
          <main>{children}</main>
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
