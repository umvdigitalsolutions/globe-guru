import Image from "next/image";
import Link from "next/link";
import SearchBar from "./components/SearchBar";
import FeaturedCard from "./components/FeaturedCard";
import HeroCarousel from "./components/HeroCarousel";
import { DESTINATIONS } from "./data/destinations";

export const metadata = {
  title:
    "GlobeGuru Holidays | Luxury Travel Packages & Custom Holiday Planning",
  description:
    "Plan premium domestic and international holidays with GlobeGuru Holidays. Explore luxury travel packages, honeymoon trips, family vacations, adventure tours, beach escapes and custom itineraries.",
  keywords: [
    "GlobeGuru Holidays",
    "luxury travel packages",
    "holiday packages India",
    "international tour packages",
    "honeymoon packages",
    "family vacation packages",
    "custom travel planning",
    "Dubai tour package",
    "Bali honeymoon package",
    "Vietnam tour package",
    "Thailand holiday package",
    "Nepal holiday package",
    "travel agency Ghaziabad",
    "premium travel planner",
  ],
  authors: [{ name: "GlobeGuru Holidays" }],
  creator: "GlobeGuru Holidays",
  publisher: "GlobeGuru Holidays",
  alternates: {
    canonical: "https://globeguruholidays.com",
  },
  openGraph: {
    title:
      "GlobeGuru Holidays | Luxury Travel Packages & Custom Holiday Planning",
    description:
      "Discover curated holidays, premium stays, honeymoon packages, family vacations and international travel experiences with GlobeGuru Holidays.",
    url: "https://globeguruholidays.com",
    siteName: "GlobeGuru Holidays",
    images: [
      {
        url: "/v1.jpg",
        width: 1200,
        height: 630,
        alt: "GlobeGuru Holidays Luxury Travel Packages",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GlobeGuru Holidays | Luxury Travel Packages",
    description:
      "Premium holiday planning, honeymoon trips, family vacations and custom international tour packages.",
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
};

const categories = [
  {
    title: "Tropical Escapes",
    desc: "Private beaches, island stays, sunset cruises and slow luxury.",
  },
  {
    title: "City Breaks",
    desc: "Iconic skylines, shopping, culture, fine dining and nightlife.",
  },
  {
    title: "Adventure Trails",
    desc: "Mountains, road trips, curated thrills and unforgettable routes.",
  },
];

export default function Home() {
  const featuredDestinations = DESTINATIONS.slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "GlobeGuru Holidays",
    url: "https://globeguruholidays.com",
    logo: "https://globeguruholidays.com/logo.png",
    image: "https://globeguruholidays.com/v1.jpg",
    description:
      "GlobeGuru Holidays offers luxury travel packages, honeymoon trips, family vacations, international tours and custom holiday planning.",
    telephone: "+919818994463",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2060 Romano Tower, Mahagun Mascot, Crossing Republik",
      addressLocality: "Ghaziabad",
      addressRegion: "Uttar Pradesh",
      postalCode: "201016",
      addressCountry: "IN",
    },
    areaServed: [
      "India",
      "Dubai",
      "Bali",
      "Thailand",
      "Vietnam",
      "Nepal",
      "Singapore",
      "Maldives",
      "Europe",
    ],
    priceRange: "₹₹",
    sameAs: [],
  };

  return (
    <main className="overflow-hidden bg-[#f7f3ea] text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden px-3 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(212,175,55,0.22),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(14,165,233,0.18),transparent_30%),linear-gradient(135deg,#fffaf0_0%,#eef7ff_48%,#f7f3ea_100%)]" />

        <div className="absolute inset-0 opacity-[0.28] [background-image:linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:56px_56px] sm:[background-size:72px_72px]" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-6 sm:gap-8">
          {/* Top Content */}
          <div className="relative z-10 overflow-hidden rounded-[28px] border border-white/70 bg-white/70 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-2xl sm:rounded-[36px] sm:p-8 md:p-10">
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#d4af37]/20 blur-3xl sm:h-40 sm:w-40" />
            <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-sky-300/20 blur-3xl sm:h-44 sm:w-44" />

            <div className="relative">
              <span className="inline-flex w-fit items-center rounded-full border border-[#d4af37]/35 bg-[#fff8df] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a6a12] sm:px-4 sm:text-[11px] sm:tracking-[0.24em]">
                Curated Luxury Holidays
              </span>

              <div className="mt-5 sm:mt-6">
                {/* Heading + Carousel */}
                <div className="grid gap-6 lg:grid-cols-[1fr_390px] lg:items-center xl:grid-cols-[1fr_460px]">
                  <div>
                    <h1 className="text-[2.35rem] font-black leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                      Travel beyond ordinary with{" "}
                      <span className="bg-gradient-to-r from-[#b8860b] via-[#d4af37] to-sky-600 bg-clip-text text-transparent">
                        GlobeGuru Holidays
                      </span>
                    </h1>

                    <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-lg sm:leading-8">
                      Handpicked stays, premium itineraries, local experiences
                      and complete assistance — crafted for travelers who want
                      comfort, class and unforgettable memories.
                    </p>
                  </div>

                  <div className="w-full">
                    <HeroCarousel />
                  </div>
                </div>

                {/* Search Destination */}
                <div className="mt-7 w-full max-w-3xl rounded-3xl border border-white/70 bg-white/85 p-2.5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-3">
                  <SearchBar />
                </div>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((item) => (
                  <article
                    key={item.title}
                    className="group rounded-3xl border border-white/70 bg-white/75 p-5 shadow-[0_15px_40px_rgba(15,23,42,0.06)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_20px_55px_rgba(15,23,42,0.12)]"
                  >
                    <div className="mb-4 h-1.5 w-10 rounded-full bg-gradient-to-r from-[#d4af37] to-sky-500 transition group-hover:w-16" />

                    <h2 className="text-base font-bold text-slate-950">
                      {item.title}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.desc}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
                <Link
                  href="/Destinations"
                  aria-label="Explore GlobeGuru holiday destinations"
                  className="w-full rounded-full bg-slate-950 px-7 py-4 text-center text-sm font-bold text-white shadow-[0_16px_35px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 hover:bg-[#111827] sm:w-auto"
                >
                  Explore Destinations
                </Link>

                <Link
                  href="/Contact"
                  aria-label="Plan a custom holiday with GlobeGuru Holidays"
                  className="w-full rounded-full border border-slate-300 bg-white/80 px-7 py-4 text-center text-sm font-bold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white sm:w-auto"
                >
                  Plan Your Trip
                </Link>
              </div>

              <div className="mt-8 grid gap-3 rounded-[24px] border border-white/10 bg-slate-950 p-5 text-white shadow-[0_22px_60px_rgba(15,23,42,0.22)] sm:grid-cols-3 sm:rounded-[28px] sm:p-6">
                <div className="rounded-2xl bg-white/5 p-4 sm:bg-transparent sm:p-0">
                  <p className="text-2xl font-black text-[#f4d76a]">200+</p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    Travel plans curated
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-4 sm:bg-transparent sm:p-0">
                  <p className="text-2xl font-black text-[#f4d76a]">Custom</p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    Designed to your style
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-4 sm:bg-transparent sm:p-0">
                  <p className="text-2xl font-black text-[#f4d76a]">Trusted</p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    Support from start to finish
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vietnam Featured Image */}
          <div className="relative z-10">
            <FeaturedCard
              title="Vietnam Adventure"
              desc="5 days · 4 nights · premium stays, curated sightseeing and luxury travel experiences."
              img="/v1.jpg"
              href="/Destinations/vietnam"
            />
          </div>
        </div>
      </section>

      {/* PREMIUM DESTINATIONS */}
      <section
        id="destinations"
        className="relative overflow-hidden bg-[#07111f] py-16 text-white sm:py-20 md:py-28"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.16),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.16),transparent_30%)]" />

        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:58px_58px] sm:[background-size:76px_76px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#f4d76a] sm:text-xs sm:tracking-[0.38em]">
                Premium Destinations
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-6xl">
                Discover your next luxury escape
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                From tropical retreats to iconic international city breaks,
                every package is designed with elegance, comfort and personal
                attention.
              </p>
            </div>

            <Link
              href="/Destinations"
              aria-label="View all GlobeGuru holiday destinations"
              className="inline-flex w-full justify-center rounded-full border border-white/15 bg-white/10 px-7 py-4 text-sm font-bold text-white shadow-lg backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-[#d4af37] hover:text-slate-950 sm:w-fit"
            >
              View All Destinations
            </Link>
          </div>

          <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {featuredDestinations.map((destination) => (
              <Link
                key={destination.slug}
                href={`/Destinations/${destination.slug}`}
                aria-label={`View ${destination.title} tour package`}
                className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.06] shadow-[0_25px_80px_rgba(0,0,0,0.25)] backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:border-[#d4af37]/45 hover:bg-white/[0.09] sm:rounded-[32px]"
              >
                <div className="relative h-64 shrink-0 overflow-hidden sm:h-72">
                  <Image
                    src={destination.image}
                    alt={`${destination.title} holiday package by GlobeGuru Holidays`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-[#07111f]/35 to-transparent" />

                  <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/25 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md sm:left-5 sm:top-5 sm:px-4 sm:text-[11px]">
                    {destination.location}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <h3 className="line-clamp-2 text-xl font-black text-white sm:text-2xl">
                          {destination.title}
                        </h3>

                        <p className="mt-2 text-sm font-medium text-slate-200">
                          {destination.duration}
                        </p>
                      </div>

                      <div className="w-fit shrink-0 rounded-full border border-[#d4af37]/35 bg-[#d4af37]/20 px-4 py-2 text-sm font-bold text-[#ffe98a] backdrop-blur-md">
                        {destination.price}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="line-clamp-3 min-h-[76px] text-sm leading-7 text-slate-300 sm:min-h-[84px]">
                    {destination.description}
                  </p>

                  <div className="mt-5 flex min-h-[68px] flex-wrap content-start gap-2 sm:min-h-[74px]">
                    {destination.highlights.slice(0, 3).map((item) => (
                      <span
                        key={item}
                        className="h-fit rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-5">
                    <span className="text-sm font-semibold text-slate-300">
                      Explore Package
                    </span>

                    <span className="rounded-full bg-white px-4 py-2.5 text-sm font-bold text-slate-950 transition group-hover:bg-[#d4af37] sm:px-5">
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="relative bg-[#f7f3ea] py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(212,175,55,0.16),transparent_28%),radial-gradient(circle_at_85%_80%,rgba(14,165,233,0.12),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#9b7513] sm:text-xs sm:tracking-[0.35em]">
              Why Travel With Us
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
              Premium planning for smooth, memorable holidays
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              GlobeGuru Holidays focuses on comfort, personal attention and
              reliable travel support so every journey feels effortless.
            </p>
          </div>

          <div className="mt-10 grid auto-rows-fr gap-5 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
            <article className="flex h-full flex-col rounded-[28px] border border-white/70 bg-white/75 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur sm:rounded-[30px] sm:p-7">
              <div className="mb-5 h-1.5 w-12 rounded-full bg-gradient-to-r from-[#d4af37] to-sky-500" />

              <h3 className="text-xl font-black text-slate-950">
                Custom Itineraries
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Every trip is planned according to your travel style, budget,
                comfort and preferred experiences.
              </p>
            </article>

            <article className="flex h-full flex-col rounded-[28px] border border-white/70 bg-white/75 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur sm:rounded-[30px] sm:p-7">
              <div className="mb-5 h-1.5 w-12 rounded-full bg-gradient-to-r from-[#d4af37] to-sky-500" />

              <h3 className="text-xl font-black text-slate-950">
                Handpicked Stays
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                We help you choose comfortable hotels, premium stays and
                destination experiences that suit your trip.
              </p>
            </article>

            <article className="flex h-full flex-col rounded-[28px] border border-white/70 bg-white/75 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur sm:col-span-2 sm:rounded-[30px] sm:p-7 lg:col-span-1">
              <div className="mb-5 h-1.5 w-12 rounded-full bg-gradient-to-r from-[#d4af37] to-sky-500" />

              <h3 className="text-xl font-black text-slate-950">
                End-to-End Support
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                From planning to travel assistance, our team helps you enjoy a
                smooth and confident holiday experience.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#f7f3ea] pb-16 sm:pb-20">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950 px-5 py-10 text-white shadow-[0_30px_90px_rgba(15,23,42,0.22)] sm:rounded-[36px] sm:px-8 sm:py-12 md:px-14 md:py-16">
            <div className="absolute -left-12 -top-12 h-44 w-44 rounded-full bg-[#d4af37]/20 blur-3xl" />
            <div className="absolute -bottom-16 right-0 h-48 w-48 rounded-full bg-sky-400/20 blur-3xl" />

            <div className="relative">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#f4d76a] sm:text-xs sm:tracking-[0.35em]">
                Plan With GlobeGuru
              </p>

              <h2 className="mt-4 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Let us craft your perfect holiday with premium planning and
                personal assistance.
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                Whether it is a honeymoon, family vacation, international group
                tour, or a luxury escape, we help you travel with comfort and
                confidence.
              </p>

              <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
                <a
                  href="https://wa.me/919818994463"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Contact GlobeGuru Holidays on WhatsApp"
                  className="w-full rounded-full bg-[#d4af37] px-8 py-4 text-center text-sm font-black text-slate-950 shadow-[0_18px_40px_rgba(212,175,55,0.25)] transition hover:-translate-y-0.5 hover:bg-[#f4d76a] sm:w-auto"
                >
                  WhatsApp Us
                </a>

                <a
                  href="tel:+919818994463"
                  aria-label="Call GlobeGuru Holidays"
                  className="w-full rounded-full border border-white/15 px-8 py-4 text-center text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10 sm:w-auto"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}