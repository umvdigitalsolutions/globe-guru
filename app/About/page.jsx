import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About Us | GlobeGuru Holidays",
  description:
    "Learn about GlobeGuru Holidays, a premium travel planning company offering customized domestic and international holiday packages, honeymoon trips, family tours and luxury travel experiences.",
};

export default function AboutPage() {
  const specializations = [
    "Domestic & International Holiday Packages",
    "Honeymoon & Romantic Getaways",
    "Family & Group Tours",
    "Spiritual & Pilgrimage Tours",
    "Luxury & Premium Holidays",
    "Complete Travel Assistance",
  ];

  const reasons = [
    "Personalized Planning",
    "Transparent Pricing",
    "Trusted Network",
    "End-to-End Support",
    "Customer-Centric Approach",
  ];

  const mission = [
    "To provide personalized travel solutions tailored to individual needs.",
    "To maintain transparency in pricing and communication.",
    "To ensure safety, comfort, and convenience at every stage of travel.",
    "To build long-term relationships with our travelers.",
  ];

  return (
    <main className="relative overflow-hidden bg-[#f7f3ea]">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(212,175,55,0.18),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(14,165,233,0.14),transparent_30%)]" />
      <div className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:76px_76px]" />

      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Hero */}
        <div className="grid gap-10 rounded-[36px] border border-white/70 bg-white/70 p-6 shadow-[0_30px_100px_rgba(15,23,42,0.12)] backdrop-blur-2xl md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative mx-auto flex w-full max-w-md justify-center">
            <div className="absolute inset-0 rounded-full bg-[#d4af37]/20 blur-3xl" />
            <div className="relative flex h-72 w-72 items-center justify-center rounded-[36px] border border-white/80 bg-white/80 p-8 shadow-[0_22px_60px_rgba(15,23,42,0.12)] sm:h-80 sm:w-80">
              <Image
                src="/globe.png"
                alt="GlobeGuru Holidays logo"
                width={320}
                height={320}
                priority
                className="object-contain"
              />
            </div>
          </div>

          <div>
            <span className="inline-flex rounded-full border border-[#d4af37]/35 bg-[#fff8df] px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-[#8a6a12]">
              About GlobeGuru Holidays
            </span>

            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Travel planning made{" "}
              <span className="bg-gradient-to-r from-[#b8860b] via-[#d4af37] to-sky-600 bg-clip-text text-transparent">
                personal, premium & effortless
              </span>
            </h1>

            <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
              At <strong>GLOBE Guru Holidays</strong>, we believe travel is
              more than visiting new places. It is about discovering cultures,
              creating lifelong memories and experiencing moments that stay
              with you forever.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/Contact"
                className="rounded-full bg-[#059669] px-7 py-4 text-sm font-black text-white shadow-[0_18px_40px_rgba(5,150,105,0.25)] transition hover:-translate-y-0.5 hover:bg-[#047857]"
              >
                Inquire Now
              </Link>

              <Link
                href="/Packages"
                className="rounded-full border border-slate-300 bg-white px-7 py-4 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-50"
              >
                View Packages
              </Link>
            </div>
          </div>
        </div>

        {/* Story */}
        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[32px] border border-white/70 bg-white/75 p-7 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#9b7513]">
              Our Story
            </p>

            <h2 className="mt-4 text-3xl font-black text-slate-950">
              Built for customized journeys
            </h2>

            <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
              GLOBE Guru Holidays was founded with a simple vision — to provide
              personalized, transparent and hassle-free travel solutions. We
              understand that every traveler is different. Some seek adventure,
              some desire relaxation, while others travel for celebration,
              business or spiritual fulfillment.
            </p>

            <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
              Every itinerary we design reflects your interests, comfort level,
              travel style and budget. Our team combines destination expertise,
              reliable vendor partnerships and meticulous planning to ensure
              every journey is seamless from start to finish.
            </p>
          </article>

          <article className="rounded-[32px] border border-white/70 bg-slate-950 p-7 text-white shadow-[0_18px_55px_rgba(15,23,42,0.16)] sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#f4d76a]">
              Our Vision
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Trusted, transparent and memorable travel
            </h2>

            <p className="mt-5 text-sm leading-8 text-slate-300 sm:text-base">
              Our vision is to become one of the most trusted and
              customer-centric travel brands, known for reliability,
              transparency and memorable travel experiences across domestic and
              international destinations.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-2xl font-black text-[#f4d76a]">100%</p>
                <p className="mt-1 text-sm text-slate-300">
                  Customized Planning
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-2xl font-black text-[#f4d76a]">24/7</p>
                <p className="mt-1 text-sm text-slate-300">
                  Travel Assistance
                </p>
              </div>
            </div>
          </article>
        </section>

        {/* Mission */}
        <section className="mt-10 rounded-[32px] border border-white/70 bg-white/75 p-7 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#9b7513]">
              Our Mission
            </p>

            <h2 className="mt-4 text-3xl font-black text-slate-950">
              Making every trip smooth, safe and memorable
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {mission.map((item, index) => (
              <div
                key={item}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-[#f4d76a]">
                  {index + 1}
                </div>
                <p className="text-sm leading-7 text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Specialization + Why Choose */}
        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[32px] border border-white/70 bg-white/75 p-7 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#9b7513]">
              What We Specialize In
            </p>

            <h2 className="mt-4 text-3xl font-black text-slate-950">
              From beach escapes to spiritual journeys
            </h2>

            <div className="mt-7 grid gap-3">
              {specializations.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold text-slate-700 shadow-sm"
                >
                  ✈ {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[32px] border border-white/70 bg-white/75 p-7 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#9b7513]">
              Why Choose Us
            </p>

            <h2 className="mt-4 text-3xl font-black text-slate-950">
              Designed around your comfort
            </h2>

            <div className="mt-7 grid gap-3">
              {reasons.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold text-slate-700 shadow-sm"
                >
                  ✔ {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        {/* Approach */}
        <section className="mt-10 rounded-[36px] border border-white/10 bg-slate-950 p-7 text-white shadow-[0_30px_90px_rgba(15,23,42,0.22)] sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.32em] text-[#f4d76a]">
                Our Approach
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                We understand your travel purpose first, then design your
                journey.
              </h2>

              <p className="mt-5 text-sm leading-8 text-slate-300 sm:text-base">
                We begin by understanding your travel purpose — leisure,
                celebration, business, pilgrimage or adventure. After analyzing
                your requirements, we design a structured itinerary with
                day-wise planning, accommodation options, activities and travel
                logistics.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/10 p-6 backdrop-blur">
              <h3 className="text-xl font-black text-white">
                Our commitment to quality
              </h3>

              <p className="mt-4 text-sm leading-8 text-slate-300">
                Every destination is carefully selected, every stay is verified,
                and every arrangement is managed with attention to detail. Our
                goal is not just to book a trip, but to create an experience
                that brings you back to us for your next adventure.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-10 rounded-[36px] border border-white/70 bg-white/75 p-7 text-center shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#9b7513]">
            Let’s Explore Together
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
            Whether you dream of beaches, mountains, historical cities or
            spiritual peace — GlobeGuru Holidays is here to guide your journey.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600">
            Because for us, your happiness is the ultimate destination.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/Contact"
              className="rounded-full bg-[#059669] px-8 py-4 text-sm font-black text-white shadow-[0_18px_40px_rgba(5,150,105,0.25)] transition hover:-translate-y-0.5 hover:bg-[#047857]"
            >
              Inquire Now
            </Link>

            <a
              href="https://wa.me/919818994463"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-300 bg-white px-8 py-4 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              WhatsApp Us
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}