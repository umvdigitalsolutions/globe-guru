import Image from "next/image";
import Link from "next/link";
import JsonLd from "../../components/JsonLd";
import { getPublicContent } from "../../lib/content";
import {
  buildDestinationBreadcrumbSchema,
  buildTouristTripSchema,
} from "../../lib/schema";


export default async function DestinationDetailPage({ params }) {
  const { slug } = await params;

  const destination = (await getPublicContent("destinations")).find((item) => item.slug === slug);

  if (!destination) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-3xl font-bold text-slate-900">
          Destination not found
        </h1>

        <Link
          href="/Destinations"
          className="mt-6 inline-flex rounded-full bg-slate-900 px-6 py-3 font-medium text-white"
        >
          Back to Destinations
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-[#f8fafc] pb-16">
      <JsonLd
        data={[
          buildDestinationBreadcrumbSchema(destination),
          buildTouristTripSchema(destination),
        ]}
      />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[520px] overflow-hidden">
        <Image
          src={destination.image}
          alt={destination.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/10" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-14">
          <Link
            href="/Destinations"
            className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md"
          >
            ← Back to Destinations
          </Link>

          <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
            {destination.location}
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold text-white md:text-6xl">
            {destination.title}
          </h1>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
              {destination.duration}
            </span>

            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
              {destination.bestFor}
            </span>

            <span className="rounded-full bg-sky-400/20 px-4 py-2 text-sm font-semibold text-sky-100 backdrop-blur-md">
              Starting From {destination.price}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto -mt-14 grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-[30px] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-700">
            Overview
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900">
            Why visit {destination.title}?
          </h2>

          <p className="mt-6 text-base leading-8 text-slate-600">
            {destination.longDescription}
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="rounded-[24px] bg-slate-50 p-6">
              <h3 className="text-xl font-bold text-slate-900">Highlights</h3>

              <div className="mt-5 space-y-3">
                {destination.highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm"
                  >
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-500" />
                    <p className="text-sm leading-6 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] bg-slate-50 p-6">
              <h3 className="text-xl font-bold text-slate-900">Inclusions</h3>

              <div className="mt-5 space-y-3">
                {destination.inclusions.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm"
                  >
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <p className="text-sm leading-6 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="h-fit rounded-[30px] bg-slate-950 p-7 text-white shadow-[0_20px_60px_rgba(15,23,42,0.16)] lg:sticky lg:top-24">
          <p className="text-sm uppercase tracking-[0.25em] text-sky-300">
            Book This Package
          </p>

          <h3 className="mt-3 text-3xl font-bold">{destination.price}</h3>

          <p className="mt-2 text-sm text-slate-300">
            Premium holiday planning with curated stays, assistance, and guided
            experiences.
          </p>

          <div className="mt-8 space-y-4 rounded-[24px] border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-sm text-slate-300">Duration</span>
              <span className="font-semibold">{destination.duration}</span>
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-sm text-slate-300">Location</span>
              <span className="font-semibold">{destination.location}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Best For</span>
              <span className="text-right font-semibold">
                {destination.bestFor}
              </span>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <a
              href="https://wa.me/919818994463"
              target="_blank"
              rel="noreferrer"
              className="block rounded-full bg-sky-500 px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-sky-600"
            >
              WhatsApp to Book Now
            </a>

            <a
              href="tel:+919818994463"
              className="block rounded-full border border-white/15 px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Call Now
            </a>
          </div>
        </aside>
      </section>
    </main>
  );
}
