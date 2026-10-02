"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function DestinationsView({ destinations }) {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [animate, setAnimate] = useState(false);

  const openModal = (destination) => {
    setSelectedDestination(destination);
    setTimeout(() => setAnimate(true), 20);
  };

  const closeModal = () => {
    setAnimate(false);
    setTimeout(() => {
      setSelectedDestination(null);
    }, 250);
  };

  useEffect(() => {
    if (selectedDestination) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [selectedDestination]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.25),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.18),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
            GlobeGuru Holidays
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
            Explore Premium Destinations Across The World
          </h1>
          <p className="mt-6 max-w-2xl text-sm text-slate-300 sm:text-base md:text-lg">
            Handpicked holidays designed for comfort, style, and unforgettable
            travel experiences.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-700">
              Featured Packages
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl md:text-4xl">
              Choose your next journey
            </h2>
          </div>
          <p className="max-w-xl text-sm text-slate-600 sm:text-base">
            Click on any destination to explore package details, highlights,
            inclusions, and booking options.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {destinations.map((destination) => (
            <Link
              key={destination.slug}
              href={`/Destinations/${destination.slug}`}
              className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white text-left shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_70px_rgba(15,23,42,0.14)]"
            >
              <div className="relative h-64 overflow-hidden sm:h-72">
                <Image
                  src={destination.image}
                  alt={destination.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md sm:left-5 sm:top-5 sm:px-4">
                  {destination.location}
                </div>
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-bold text-white sm:text-2xl">
                      {destination.title}
                    </h3>
                    <span className="rounded-full bg-sky-400/20 px-3 py-2 text-xs font-semibold text-sky-100 backdrop-blur-md sm:px-4 sm:text-sm">
                      {destination.duration}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <p className="line-clamp-3 text-sm leading-7 text-slate-600">
                  {destination.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {destination.highlights.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      Starting From
                    </p>
                    <p className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                      {destination.price}
                    </p>
                  </div>

                  <span className="rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition group-hover:bg-sky-600 sm:px-5">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {selectedDestination && (
        <div className="fixed inset-0 z-[9999] bg-white">
          <div
            className={`absolute inset-0 transition-all duration-300 ${
              animate ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              type="button"
              onClick={closeModal}
              className="fixed right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-lg font-bold text-slate-900 shadow-lg"
            >
              ×
            </button>

            <div className="h-full overflow-y-auto">
              {/* Hero */}
              <section className="relative h-[320px] overflow-hidden sm:h-[420px] md:h-[520px]">
                <Image
                  src={selectedDestination.image}
                  alt={selectedDestination.title}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/10" />

                <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-8 sm:px-6 md:px-8 md:pb-12">
                  <p className="text-xs uppercase tracking-[0.3em] text-sky-300 sm:text-sm">
                    {selectedDestination.location}
                  </p>

                  <h2 className="mt-3 max-w-4xl text-3xl font-bold text-white sm:text-5xl md:text-6xl">
                    {selectedDestination.title}
                  </h2>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                      {selectedDestination.duration}
                    </span>
                    <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                      {selectedDestination.bestFor}
                    </span>
                    <span className="rounded-full bg-sky-400/20 px-4 py-2 text-sm font-semibold text-sky-100 backdrop-blur-md">
                      Starting From {selectedDestination.price}
                    </span>
                  </div>
                </div>
              </section>

              {/* Overview */}
              <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:px-8">
                <div className="rounded-[28px] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-700">
                    Overview
                  </p>

                  <h3 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
                    Why visit {selectedDestination.title}?
                  </h3>

                  <p className="mt-5 max-w-5xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                    {selectedDestination.longDescription}
                  </p>
                </div>
              </section>

              {/* Quick Info */}
              <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 md:px-8">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-[24px] bg-slate-50 p-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Duration
                    </p>
                    <h4 className="mt-2 text-2xl font-bold text-slate-900">
                      {selectedDestination.duration}
                    </h4>
                  </div>

                  <div className="rounded-[24px] bg-slate-50 p-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Best For
                    </p>
                    <h4 className="mt-2 text-2xl font-bold text-slate-900">
                      {selectedDestination.bestFor}
                    </h4>
                  </div>

                  <div className="rounded-[24px] bg-slate-950 p-6 text-white">
                    <p className="text-xs uppercase tracking-[0.2em] text-sky-300">
                      Package Price
                    </p>
                    <h4 className="mt-2 text-2xl font-bold">
                      {selectedDestination.price}
                    </h4>
                  </div>
                </div>
              </section>

              {/* Highlights + Inclusions */}
              <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-8">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-[24px] bg-slate-50 p-5 sm:p-6">
                    <h4 className="text-xl font-bold text-slate-900">
                      Highlights
                    </h4>

                    <div className="mt-5 space-y-3">
                      {selectedDestination.highlights.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm"
                        >
                          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-500" />
                          <p className="text-sm leading-6 text-slate-700">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[24px] bg-slate-50 p-5 sm:p-6">
                    <h4 className="text-xl font-bold text-slate-900">
                      Inclusions
                    </h4>

                    <div className="mt-5 space-y-3">
                      {selectedDestination.inclusions.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm"
                        >
                          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                          <p className="text-sm leading-6 text-slate-700">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Booking CTA */}
              <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 md:px-8">
                <div className="rounded-[28px] bg-slate-950 p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.16)] sm:p-8">
                  <p className="text-sm uppercase tracking-[0.25em] text-sky-300">
                    Book This Package
                  </p>

                  <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-3xl">
                      <h3 className="text-3xl font-bold sm:text-4xl">
                        {selectedDestination.price}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                        Premium holiday planning with curated stays,
                        sightseeing, assistance, and personalized travel
                        support for a seamless experience.
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <a
                        href={`https://wa.me/919818994463?text=${encodeURIComponent(
                          `Hi, I want details for ${selectedDestination.title}.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-sky-500 px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-sky-600"
                      >
                        WhatsApp to Book Now
                      </a>

                      <a
                        href="tel:+919818994463"
                        className="rounded-full border border-white/15 px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                      >
                        Call Now
                      </a>

                      <button
                        type="button"
                        onClick={closeModal}
                        className="rounded-full border border-white/15 px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                      >
                        Back to Destinations
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
