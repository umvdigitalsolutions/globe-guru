import { z } from "zod";

const text = z.string().trim().min(1).max(500);
const paragraph = z.string().trim().max(20000);
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens.").max(100);
const internalPath = z.string().regex(/^\/(?!\/)[^\s]*$/, "Use a site path starting with /.");
const link = z.string().refine((value) => {
  if (/^\/(?!\/)[^\s]*$/.test(value)) return true;
  try { return new URL(value).protocol === "https:"; } catch { return false; }
}, "Use a site path or HTTPS URL.");
const image = z.string().regex(/^\/(?!\/)[^\s]*$|^https:\/\/images\.unsplash\.com\/[^\s]*$/, "Use a local image path or an images.unsplash.com URL.");
const common = { title: text, published: z.boolean().default(true), order: z.number().int().min(0).max(10000).default(0) };
const strings = z.array(text).max(100);
const inline = z.union([z.string().max(20000), z.object({ type: z.enum(["strong", "em", "internalLink", "externalLink"]), text, href: link.optional() })]);
const children = z.union([paragraph, z.array(inline).max(100)]);
const block = z.union([
  z.object({ type: z.literal("paragraph"), children }),
  z.object({ type: z.enum(["list", "orderedList"]), items: z.array(children).max(100) }),
]);

export const contentSchemas = {
  packages: z.object({
    ...common, id: slug, days: z.number().int().min(1).max(365).nullable(), tag: text,
    image: image.optional().or(z.literal("")), desc: paragraph.min(1),
    points: strings.default([]), comingSoon: z.boolean().default(false),
  }),
  destinations: z.object({
    ...common, slug, image, description: paragraph.min(1), longDescription: paragraph.min(1),
    price: text, duration: text, location: text, bestFor: text,
    highlights: strings, inclusions: strings,
  }),
  blogs: z.object({
    ...common, slug, image, description: paragraph.min(1),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((s) => !Number.isNaN(Date.parse(s)) && new Date(s).toISOString().slice(0, 10) === s, "Enter a valid date."),
    category: text, destination: z.string().max(100).default(""), relatedPackage: internalPath,
    keywords: strings, readTime: text, intro: z.array(paragraph).max(100),
    sections: z.array(z.object({ title: text, blocks: z.array(block).max(100) })).max(100),
    notice: paragraph.default(""), sourcesTitle: text.default("Sources"),
    sources: z.array(z.object({ label: text, href: link })).max(100).default([]),
    related: z.object({ title: text, summary: paragraph, ctaLabel: text, whatsappText: paragraph }),
  }),
};
