import Image from "next/image";
import Link from "next/link";
import JsonLd from "../components/JsonLd";
import { getPublicContent } from "../lib/content";
import { SITE_URL } from "../lib/schema";

export const metadata = {
  title: "Travel Blog | GlobeGuru Holidays",
  description:
    "Read GlobeGuru Holidays travel guides, visa updates, destination planning tips and package advice for Indian travelers.",
  alternates: {
    canonical: `${SITE_URL}/Blog`,
  },
  openGraph: {
    title: "Travel Blog | GlobeGuru Holidays",
    description:
      "Travel guides, visa updates and destination planning tips from GlobeGuru Holidays.",
    url: `${SITE_URL}/Blog`,
    siteName: "GlobeGuru Holidays",
    images: [
      {
        url: "/images/blog/vietnam-evisa-guide.jpg",
        width: 1200,
        height: 630,
        alt: "Vietnam travel guide by GlobeGuru Holidays",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Travel Blog",
  url: `${SITE_URL}/Blog`,
  publisher: {
    "@type": "TravelAgency",
    name: "GlobeGuru Holidays",
    url: `${SITE_URL}/`,
  },
};

function formatDate(date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default async function BlogPage() {
  const BLOG_POSTS = await getPublicContent("blogs");
  const schema = { ...blogSchema, mainEntity: BLOG_POSTS.map((post) => ({
    "@type": "BlogPosting", headline: post.title, description: post.description,
    url: `${SITE_URL}/Blog/${post.slug}`, datePublished: post.date,
    image: post.image.startsWith("/") ? `${SITE_URL}${post.image}` : post.image,
  })) };
  return (
    <main className="relative overflow-hidden bg-[#f7f3ea]">
      <JsonLd data={schema} />

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.20),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.18),transparent_32%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f4d76a]">
            GlobeGuru Travel Blog
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Smart travel guides for smoother holidays
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Visa guidance, destination tips and practical planning notes for
            Indian travelers.
          </p>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
        <div className="grid auto-rows-fr gap-6 md:grid-cols-2 xl:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/Blog/${post.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white/80 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_25px_75px_rgba(15,23,42,0.14)]"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/25 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md">
                  {post.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  <span>{formatDate(post.date)}</span>
                  <span>{post.readTime}</span>
                </div>

                <h2 className="mt-4 text-2xl font-black leading-tight text-slate-950">
                  {post.title}
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {post.description}
                </p>

                <div className="mt-auto pt-6">
                  <span className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition group-hover:bg-[#d4af37] group-hover:text-slate-950">
                    Read Guide
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
