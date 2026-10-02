import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "../../components/JsonLd";
import { BLOG_POSTS, getBlogPost } from "../../data/blogPosts";
import { buildBreadcrumbSchema, SITE_URL } from "../../lib/schema";

const linkClass =
  "font-bold text-sky-700 underline decoration-sky-200 underline-offset-4 hover:text-sky-900";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `${SITE_URL}/Blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/Blog/${post.slug}`,
      siteName: "GlobeGuru Holidays",
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_IN",
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function buildWhatsAppUrl(text) {
  return `https://wa.me/919509597199?text=${encodeURIComponent(text)}`;
}

function renderInline(children) {
  const parts = Array.isArray(children) ? children : [children];

  return parts.map((part, index) => {
    if (typeof part === "string") {
      return <Fragment key={index}>{part}</Fragment>;
    }

    if (part.type === "strong") {
      return <strong key={index}>{part.text}</strong>;
    }

    if (part.type === "internalLink") {
      return (
        <Link key={index} href={part.href} className={linkClass}>
          {part.text}
        </Link>
      );
    }

    if (part.type === "externalLink") {
      return (
        <a
          key={index}
          href={part.href}
          target="_blank"
          rel="noreferrer"
          className={linkClass}
        >
          {part.text}
        </a>
      );
    }

    return null;
  });
}

function ArticleBlock({ block }) {
  if (block.type === "paragraph") {
    return <p>{renderInline(block.children)}</p>;
  }

  if (block.type === "list") {
    return (
      <ul className="space-y-3">
        {block.items.map((item, index) => (
          <li key={index}>{renderInline(item)}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "orderedList") {
    return (
      <ol className="space-y-4">
        {block.items.map((item, index) => (
          <li key={index}>{renderInline(item)}</li>
        ))}
      </ol>
    );
  }

  return null;
}

function ArticleSection({ section }) {
  return (
    <section className="mt-12 scroll-mt-28">
      <h2 className="text-2xl font-black leading-tight text-slate-950 sm:text-3xl">
        {section.title}
      </h2>
      <div className="mt-5 space-y-5 text-base leading-8 text-slate-700">
        {section.blocks.map((block, index) => (
          <ArticleBlock key={index} block={block} />
        ))}
      </div>
    </section>
  );
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const articleUrl = `${SITE_URL}/Blog/${post.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${SITE_URL}${post.image}`,
    keywords: post.keywords.join(", "),
    articleSection: post.category,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "GlobeGuru Holidays",
      url: `${SITE_URL}/`,
    },
    publisher: {
      "@type": "TravelAgency",
      name: "GlobeGuru Holidays",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/globe.png`,
      },
    },
    mainEntityOfPage: articleUrl,
  };
  const breadcrumbSchema = buildBreadcrumbSchema([
    {
      name: "Home",
      url: `${SITE_URL}/`,
    },
    {
      name: "Blog",
      url: `${SITE_URL}/Blog`,
    },
    {
      name: post.title,
      url: articleUrl,
    },
  ]);

  return (
    <main className="relative overflow-hidden bg-[#f7f3ea]">
      <JsonLd data={[articleSchema, breadcrumbSchema]} />

      <article>
        <header className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/40" />
          </div>

          <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-24">
            <Link
              href="/Blog"
              className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20"
            >
              Back to Blog
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-[#f4d76a]">
              <span>{post.category}</span>
              <span>{formatDate(post.date)}</span>
              <span>{post.readTime}</span>
            </div>

            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
              {post.title}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
              {post.description}
            </p>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:py-16">
          <div className="min-w-0 rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="space-y-5 text-lg leading-8 text-slate-700">
              {post.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {post.sections.map((section) => (
              <ArticleSection key={section.title} section={section} />
            ))}

            <section className="mt-12 rounded-[24px] border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950">
              {post.notice}
            </section>

            {post.sources?.length ? (
              <section className="mt-8">
                <h2 className="text-xl font-black text-slate-950">
                  {post.sourcesTitle}
                </h2>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                  {post.sources.map((source) => (
                    <li key={source.href}>
                      <a
                        href={source.href}
                        target="_blank"
                        rel="noreferrer"
                        className={linkClass}
                      >
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          <aside className="h-fit rounded-[28px] bg-slate-950 p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.16)] lg:sticky lg:top-28">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#f4d76a]">
              Related Package
            </p>

            <h2 className="mt-4 text-2xl font-black">{post.related.title}</h2>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              {post.related.summary}
            </p>

            <Link
              href={post.relatedPackage}
              className="mt-7 inline-flex w-full justify-center rounded-full bg-[#d4af37] px-6 py-4 text-sm font-black text-slate-950 transition hover:bg-[#f4d76a]"
            >
              {post.related.ctaLabel}
            </Link>

            <a
              href={buildWhatsAppUrl(post.related.whatsappText)}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex w-full justify-center rounded-full border border-white/15 bg-white/10 px-6 py-4 text-sm font-black text-white transition hover:bg-white/20"
            >
              Ask on WhatsApp
            </a>
          </aside>
        </div>
      </article>
    </main>
  );
}
