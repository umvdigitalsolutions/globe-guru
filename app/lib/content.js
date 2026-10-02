import "server-only";
import { connection } from "next/server";
import { getDatabase } from "./mongodb";
import { PACKAGES } from "../data/packages";
import { DESTINATIONS } from "../data/destinations";
import { BLOG_POSTS } from "../data/blogPosts";

const defaults = { packages: PACKAGES, destinations: DESTINATIONS, blogs: BLOG_POSTS };

export async function getPublicContent(type) {
  await connection();
  if (!process.env.MONGODB_URI) return defaults[type];
  try {
    const db = await getDatabase();
    const ready = await db.collection("settings").findOne({ _id: "content-initialized" });
    if (!ready) return defaults[type];
    const records = await db.collection(type).find({ published: true }).sort({ order: 1, createdAt: 1 }).toArray();
    return records.map(({ _id, createdAt, updatedAt, ...record }) => record);
  } catch {
    // Keep the travel site available during a temporary database outage.
    return defaults[type];
  }
}

export async function getPublicPost(slug) {
  return (await getPublicContent("blogs")).find((post) => post.slug === slug);
}
