"use client";

import Image from "next/image";
import Link from "next/link";

export default function FeaturedCard({
  title,
  desc,
  img,
  href = "/Destinations/vietnam",
}) {
  const handleWhatsApp = () => {
    const waText = encodeURIComponent(
      `Hi, I'm interested in ${title}. Could you share more details?`
    );

    window.open(
      `https://wa.me/919818994463?text=${waText}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className="relative z-10 w-full">
      <div className="pointer-events-none absolute -left-8 -top-8 hidden h-36 w-36 rounded-full bg-[#d4af37]/25 blur-3xl lg:block" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 hidden h-40 w-40 rounded-full bg-sky-400/25 blur-3xl lg:block" />

      <div className="relative overflow-hidden rounded-[36px] border border-white/25 bg-slate-950 shadow-[0_35px_100px_rgba(15,23,42,0.28)]">
        <div className="grid min-h-[420px] lg:grid-cols-[1.35fr_0.65fr]">
          {/* Image Side */}
          <Link
            href={href}
            aria-label={`Explore ${title}`}
            className="group relative min-h-[300px] overflow-hidden sm:min-h-[380px] lg:min-h-[500px]"
          >
            <Image
              src={img}
              alt={`${title} luxury holiday package by GlobeGuru Holidays`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 70vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-slate-950/70" />

            <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-white backdrop-blur-md sm:left-7 sm:top-7">
              Featured Escape
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2 sm:bottom-7 sm:left-7">
              <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                Premium Stay
              </span>

              <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                Curated Itinerary
              </span>

              <span className="rounded-full border border-[#d4af37]/40 bg-[#d4af37]/25 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#ffe98a] backdrop-blur-md">
                Best Seller
              </span>
            </div>
          </Link>

          {/* Content Side */}
          <div className="relative flex flex-col justify-center p-6 text-white sm:p-8 lg:p-10">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#d4af37]/10 blur-3xl" />

            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#f4d76a]">
                Luxury Holiday
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                {title}
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                {desc}
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-lg font-black text-[#f4d76a]">5D/4N</p>
                  <p className="mt-1 text-xs text-slate-300">Duration</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-lg font-black text-[#f4d76a]">Custom</p>
                  <p className="mt-1 text-xs text-slate-300">Plan</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-lg font-black text-[#f4d76a]">Assist</p>
                  <p className="mt-1 text-xs text-slate-300">Support</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="rounded-full bg-[#d4af37] px-6 py-3 text-sm font-black text-slate-950 shadow-[0_16px_35px_rgba(212,175,55,0.25)] transition hover:-translate-y-0.5 hover:bg-[#f4d76a]"
                >
                  Enquire Now
                </button>

                <Link
                  href={href}
                  className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
                >
                  Explore Package
                </Link>

                <Link
                  href={href}
                  className="rounded-full border border-white/15 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden">
          <div className="grid gap-6 px-6 py-6 sm:px-8 lg:grid-cols-2">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.18em] text-[#9b7513]">
                Package Includes
              </h3>

              <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
                <li>• Premium hotel stays</li>
                <li>• Curated sightseeing tours</li>
                <li>• Local transfers</li>
                <li>• Personalized travel support</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.18em] text-[#9b7513]">
                Why Choose This
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Perfect for travelers looking for a stylish and comfortable
                holiday with handpicked experiences. Every package can be
                customized according to your dates, budget and preferences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
