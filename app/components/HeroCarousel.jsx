"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    title: "Bali Honeymoon & Villas",
    label: "Bali Escape",
    desc: "Beaches · Private Villas · Romantic Experiences",
    image: "/bali.jpg",
    href: "/Destinations/bali",
  },
  {
    title: "Dubai Luxury Holiday",
    label: "Dubai Escape",
    desc: "Shopping · Desert Safari · Luxury Stays",
    image: "/dubai.jpg",
    href: "/Destinations/dubai",
  },
  {
    title: "Thailand Beach Escape",
    label: "Thailand Escape",
    desc: "Islands · Nightlife · Premium Resorts",
    image: "/thailand.jpg",
    href: "/Destinations/thailand",
  },
  {
    title: "Maldives Water Villas",
    label: "Maldives Escape",
    desc: "Water Villas · Honeymoon · Ocean Luxury",
    image: "/maldives.jpg",
    href: "/Destinations/maldives",
  },
  {
    title: "Singapore City Break",
    label: "Singapore Escape",
    desc: "Skyline · Shopping · Family Attractions",
    image: "/singapore.jpg",
    href: "/Destinations/singapore",
  },
  {
    title: "Nepal Mountain Retreat",
    label: "Nepal Escape",
    desc: "Mountains · Temples · Peaceful Holidays",
    image: "/nepal.jpg",
    href: "/Destinations/nepal",
  },
  {
    title: "Europe Dream Holiday",
    label: "Europe Escape",
    desc: "Romance · Culture · Iconic Cities",
    image: "/europe.jpg",
    href: "/Destinations/europe",
  },
  {
    title: "Dubai Desert Luxury",
    label: "Luxury Escape",
    desc: "Desert Safari · Premium Hotels · City Views",
    image: "/dubai2.jpg",
    href: "/Destinations/dubai",
  },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[active];

  const goToPrev = () => {
    setActive((current) => (current === 0 ? slides.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActive((current) => (current + 1) % slides.length);
  };

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute -left-8 -top-8 hidden h-36 w-36 rounded-full bg-[#d4af37]/25 blur-3xl lg:block" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 hidden h-40 w-40 rounded-full bg-sky-400/25 blur-3xl lg:block" />

      <div className="relative overflow-hidden rounded-[38px] border border-white/70 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.22)]">
        <Link
          href={slide.href}
          aria-label={`Explore ${slide.title}`}
          className="group relative block h-[300px] overflow-hidden sm:h-[360px] lg:h-[380px]"
        >
          {slides.map((item, index) => (
            <Image
              key={item.title}
              src={item.image}
              alt={`${item.title} by GlobeGuru Holidays`}
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 460px"
              className={`object-cover transition duration-1000 group-hover:scale-105 ${
                index === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />

          <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-white/20 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-md">
            {slide.label}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#f4d76a]">
              Featured Destination
            </p>

            <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl">
              {slide.title}
            </h2>

            <p className="mt-2 max-w-xs text-sm leading-6 text-white/85">
              {slide.desc}
            </p>

            <div className="mt-4 inline-flex rounded-full bg-[#d4af37] px-5 py-2.5 text-sm font-black text-slate-950">
              Explore Now
            </div>
          </div>
        </Link>

        <button
          type="button"
          onClick={goToPrev}
          aria-label="Previous destination"
          className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/20 text-xl font-black text-white backdrop-blur-md transition hover:bg-white/30"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={goToNext}
          aria-label="Next destination"
          className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/20 text-xl font-black text-white backdrop-blur-md transition hover:bg-white/30"
        >
          ›
        </button>

        <div className="absolute bottom-5 right-5 z-20 flex max-w-[180px] flex-wrap justify-end gap-2">
          {slides.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show ${item.title}`}
              className={`h-2.5 rounded-full transition-all ${
                index === active
                  ? "w-8 bg-[#d4af37]"
                  : "w-2.5 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}