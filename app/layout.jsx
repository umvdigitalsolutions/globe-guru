import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./footer";
import Header from "./header";
import { SITE_URL } from "./lib/schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "GlobeGuru Holidays | Luxury Travel Packages & Custom Holidays",
    template: "%s | GlobeGuru Holidays",
  },

  description:
    "GlobeGuru Holidays offers premium domestic and international holiday packages, honeymoon trips, family vacations, luxury stays, adventure tours and custom travel planning.",

  keywords: [
    "GlobeGuru Holidays",
    "luxury travel packages",
    "holiday packages India",
    "international tour packages",
    "honeymoon packages",
    "family vacation packages",
    "Bali honeymoon package",
    "Dubai tour package",
    "Thailand holiday package",
    "Vietnam tour package",
    "Nepal holiday package",
    "custom travel planning",
    "travel agency Ghaziabad",
  ],

  authors: [{ name: "GlobeGuru Holidays" }],
  creator: "GlobeGuru Holidays",
  publisher: "GlobeGuru Holidays",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "GlobeGuru Holidays | Luxury Travel Packages & Custom Holidays",
    description:
      "Plan premium holidays, honeymoon trips, family vacations and international travel experiences with GlobeGuru Holidays.",
    url: SITE_URL,
    siteName: "GlobeGuru Holidays",
    images: [
      {
        url: "/v1.jpg",
        width: 1200,
        height: 630,
        alt: "GlobeGuru Holidays premium travel packages",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "GlobeGuru Holidays | Luxury Travel Packages",
    description:
      "Premium holiday planning, honeymoon packages, family vacations and custom international tours.",
    images: ["/v1.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/globe.png",
    shortcut: "/globe.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative min-h-screen overflow-x-hidden bg-[#f7f3ea] antialiased text-zinc-900`}
      >
        {/* Premium Global Background */}
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(212,175,55,0.16),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(14,165,233,0.14),transparent_28%),linear-gradient(135deg,#fffaf0_0%,#eef7ff_45%,#f7f3ea_100%)]" />

        <div className="pointer-events-none fixed -left-20 -top-20 -z-10 h-80 w-80 rounded-full bg-[#d4af37]/20 blur-3xl" />

        <div className="pointer-events-none fixed bottom-0 right-0 -z-10 h-96 w-96 rounded-full bg-sky-300/20 blur-3xl" />

        <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.22] [background-image:linear-gradient(rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:76px_76px]" />

        <div className="relative z-10">
          <Header />

          <main>{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
