import Link from "next/link";
import Image from "next/image";

const PACKAGES = [
  {
    id: "honeymoon",
    title: "Honeymoon Package",
    days: 6,
    tag: "Romantic Escape",
    image: "/package-honeymoon.jpg",
    desc: "Romantic stays, candlelight dinners, private transfers and curated experiences for two.",
  },
  {
    id: "budget",
    title: "Budget Package",
    days: 5,
    tag: "Smart Travel",
    image: "/package-budget.jpg",
    desc: "Affordable stays, group transfers and local-experience recommendations to stretch your travel budget.",
  },
  {
    id: "luxury",
    title: "Luxury Package",
    days: 8,
    tag: "5★ Premium",
    image: "/package-luxury.jpg",
    desc: "5-star hotels, private guides, exclusive experiences and premium transfers.",
  },
  {
    id: "premium",
    title: "Premium Package",
    days: 7,
    tag: "Most Flexible",
    image: "/package-premium.jpg",
    desc: "High-comfort hotels, handpicked tours and flexible add-ons for a tailored trip.",
  },
  {
    id: "relax",
    title: "Relax Package",
    days: 4,
    tag: "Wellness",
    image: "/package-relax.jpg",
    desc: "Wellness-focused escapes with spas, yoga sessions and slow-paced itineraries.",
  },
  {
    id: "group",
    title: "Group Package",
    days: 6,
    tag: "Group Friendly",
    image: "/package-group.jpg",
    desc: "Coordinated group travel with shared transport, group activities and local guides.",
  },
  {
    id: "school-college",
    title: "School & College Trips",
    days: 4,
    tag: "Student Tours",
    image: "/school-college-trips.jpg",
    desc: "Safe, supervised educational trips with group transport, stays, meals, sightseeing and activity planning for schools and colleges.",
  },
  {
    id: "corporate",
    title: "Corporate Package",
    days: 3,
    tag: "Business Travel",
    image: "/package-corporate.jpg",
    desc: "Business-friendly itineraries, meeting-ready hotels and efficient transfers.",
  },
  {
    id: "solo",
    title: "Solo Trip Package",
    days: 5,
    tag: "Safe & Curated",
    image: "/package-solo.jpg",
    desc: "Safe solo-traveler options with recommended activities and social meetups.",
  },
  {
    id: "couple-safety",
    title: "Wedding & Travel Safety Package",
    days: null,
    tag: "Coming Soon",
    desc: "Confidential assistance for consenting adults planning to marry, including safe stay, travel support, marriage-related assistance, legal guidance where required, and honeymoon arrangements.",
    points: [
      "Safe Hotel Stay",
      "Transportation Assistance",
      "Marriage Assistance",
      "Legal Guidance",
      "Honeymoon Planning",
      "Police Protection",
    ],
    comingSoon: true,
  },
];

export const metadata = {
  title: "Travel Packages | GlobeGuru Holidays",
  description:
    "Explore honeymoon packages, budget tours, luxury holidays, premium trips, school and college trips, corporate travel, group packages and solo trip packages by GlobeGuru Holidays.",
};

export default function PackagesPage() {
  return (
    <main className="relative overflow-hidden bg-[#f7f3ea]">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(212,175,55,0.18),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(14,165,233,0.14),transparent_30%)]" />

      <div className="absolute inset-0 opacity-[0.24] [background-image:linear-gradient(rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:76px_76px]" />

      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Header */}
        <header className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-[#d4af37]/35 bg-[#fff8df] px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-[#8a6a12]">
            GlobeGuru Holidays
          </span>

          <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Curated Travel{" "}
            <span className="bg-gradient-to-r from-[#b8860b] via-[#d4af37] to-sky-600 bg-clip-text text-transparent">
              Packages
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Choose from our carefully designed package types. Every trip can be
            customized according to your destination, travel dates, budget and
            comfort preference.
          </p>
        </header>

        {/* Packages Grid */}
        <div className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PACKAGES.map((p) => (
            <article
              key={p.id}
              className={
                p.comingSoon
                  ? "flex h-full flex-col overflow-hidden rounded-[30px] border border-dashed border-slate-300 bg-white/55 p-6"
                  : "group flex h-full flex-col overflow-hidden rounded-[30px] border border-white/70 bg-white/75 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_25px_75px_rgba(15,23,42,0.14)]"
              }
            >
              {p.image ? (
                <Image
                  src={p.image}
                  alt={`${p.title} image`}
                  width={900}
                  height={563}
                  className="-mx-2 mb-5 aspect-[16/10] w-[calc(100%+1rem)] rounded-[24px] object-cover shadow-[0_14px_34px_rgba(15,23,42,0.12)]"
                />
              ) : null}

              <div className="mb-5 flex items-center justify-between gap-3">
                <span
                  className={
                    p.comingSoon
                      ? "rounded-full border border-slate-300 bg-slate-100 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500"
                      : "rounded-full border border-[#d4af37]/30 bg-[#fff8df] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#8a6a12]"
                  }
                >
                  {p.tag}
                </span>

                {p.days ? (
                  <span className="rounded-full bg-slate-950 px-3 py-1.5 text-xs font-black text-white">
                    {p.days}D
                  </span>
                ) : null}
              </div>

              {p.comingSoon ? (
                <div className="mb-5 h-1.5 w-12 rounded-full bg-slate-300" />
              ) : (
                <div className="mb-5 h-1.5 w-12 rounded-full bg-gradient-to-r from-[#d4af37] to-sky-500 transition-all duration-300 group-hover:w-20" />
              )}

              <h2 className="text-xl font-black leading-tight text-slate-950">
                {p.title}
              </h2>

              <p
                className={
                  p.comingSoon
                    ? "mt-3 text-[13px] leading-6 text-slate-600"
                    : "mt-3 min-h-[112px] text-sm leading-7 text-slate-600"
                }
              >
                {p.desc}
              </p>

              {p.points ? (
                <ul className="mt-3 list-disc pl-5 text-[13px] leading-5 text-slate-600">
                  {p.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}

              {p.comingSoon ? (
                <div className="mt-auto border-t border-dashed border-slate-300 pt-5">
                  <span className="text-[13px] font-bold text-slate-400">
                    Service Under Development
                  </span>
                </div>
              ) : (
                <div className="mt-auto border-t border-slate-200 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-500">
                      Typical Duration
                    </span>

                    <span className="text-sm font-black text-slate-950">
                      {p.days} day{p.days > 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Single Inquire Button */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/Contact"
            className="rounded-full bg-[#059669] px-10 py-4 text-center text-base font-black text-white shadow-[0_18px_40px_rgba(5,150,105,0.25)] transition hover:-translate-y-0.5 hover:bg-[#047857]"
          >
            Inquire Now
          </Link>
        </div>

        {/* Custom Mix CTA */}
        <section className="mt-14 overflow-hidden rounded-[36px] border border-white/10 bg-slate-950 p-7 text-white shadow-[0_30px_90px_rgba(15,23,42,0.22)] sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.32em] text-[#f4d76a]">
                Need a custom mix?
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                Combine luxury, relax, adventure or budget elements into one
                perfect itinerary.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Tell us your travel dates, destination preference, number of
                travelers and budget. We will create a personalized package for
                you.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href="/Contact"
                className="rounded-full bg-[#d4af37] px-7 py-4 text-center text-sm font-black text-slate-950 shadow-[0_18px_40px_rgba(212,175,55,0.25)] transition hover:-translate-y-0.5 hover:bg-[#f4d76a]"
              >
                Get Custom Quote
              </Link>

              <a
                href="https://wa.me/919818994463"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 bg-white/10 px-7 py-4 text-center text-sm font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
