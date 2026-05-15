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

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute -left-8 -top-8 hidden h-36 w-36 rounded-full bg-[#d4af37]/25 blur-3xl lg:block" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 hidden h-40 w-40 rounded-full bg-sky-400/25 blur-3xl lg:block" />

      <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_22px_60px_rgba(15,23,42,0.16)] sm:rounded-[38px] sm:shadow-[0_30px_90px_rgba(15,23,42,0.22)]">
        <Link
          href={slide.href}
          aria-label={`Explore ${slide.title}`}
          className="group relative block h-[260px] overflow-hidden sm:h-[360px] lg:h-[380px]"
        >
          {slides.map((item, index) => (
            <Image
              key={item.title}
              src={item.image}
              alt={`${item.title} by GlobeGuru Holidays`}
              fill
              priority={index === 0}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 460px"
              className={`object-cover transition duration-1000 group-hover:scale-105 ${
                index === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />

          <div className="absolute left-4 top-4 rounded-full border border-white/25 bg-white/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md sm:left-5 sm:top-5 sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.22em]">
            {slide.label}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f4d76a] sm:text-xs sm:tracking-[0.28em]">
              Featured Destination
            </p>

            <h2 className="mt-2 max-w-[82%] text-xl font-black leading-tight text-white sm:text-3xl">
              {slide.title}
            </h2>

            <p className="mt-2 max-w-[82%] text-xs leading-5 text-white/85 sm:max-w-xs sm:text-sm sm:leading-6">
              {slide.desc}
            </p>

            <div className="mt-3 inline-flex rounded-full bg-[#d4af37] px-4 py-2 text-xs font-black text-slate-950 sm:mt-4 sm:px-5 sm:py-2.5 sm:text-sm">
              Explore Now
            </div>
          </div>
        </Link>

        {/* Premium Slide Progress */}
        <div className="absolute bottom-4 right-4 z-20 w-[92px] sm:bottom-5 sm:right-5 sm:w-[130px]">
          <div className="mb-2 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.18em] text-white/85">
            <span>{String(active + 1).padStart(2, "0")}</span>
            <span>{String(slides.length).padStart(2, "0")}</span>
          </div>

          <div className="h-1 overflow-hidden rounded-full bg-white/30 backdrop-blur">
            <div
              className="h-full rounded-full bg-[#d4af37] transition-all duration-700"
              style={{
                width: `${((active + 1) / slides.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}