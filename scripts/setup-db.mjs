import { MongoClient } from "mongodb";
import { randomUUID } from "node:crypto";
import { PACKAGES } from "../app/data/packages.js";
import { DESTINATIONS } from "../app/data/destinations.js";
import { BLOG_POSTS } from "../app/data/blogPosts.js";

try { process.loadEnvFile(".env.local"); } catch { /* Deployment may provide environment variables directly. */ }
if (!process.env.MONGODB_URI || !process.env.ADMIN_EMAIL || !/^[a-f0-9]{32}:[a-f0-9]{128}$/.test(process.env.ADMIN_PASSWORD_HASH || "")) {
  console.error("Set MONGODB_URI, ADMIN_EMAIL and a valid ADMIN_PASSWORD_HASH before setup.");
  process.exit(1);
}

const client = new MongoClient(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 8000 });
try {
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || "globeguru_holidays");
  await db.command({ ping: 1 });
  const initialized = await db.collection("settings").findOne({ _id: "content-initialized" });
  for (const [type, records] of Object.entries({ packages: PACKAGES, destinations: DESTINATIONS, blogs: BLOG_POSTS })) {
    const key = type === "packages" ? "id" : "slug";
    await db.collection(type).createIndex({ [key]: 1 }, { unique: true });
    await db.collection(type).createIndex({ published: 1, order: 1 });
    if (!initialized) await db.collection(type).bulkWrite(records.map((record, order) => ({ updateOne: {
      filter: { _id: record[key] },
      update: { $setOnInsert: { ...record, published: true, order, createdAt: new Date(), updatedAt: new Date() } },
      upsert: true,
    } })));
    console.log(`${type}: ${await db.collection(type).countDocuments()} records`);
  }
  await db.collection("admins").createIndex({ email: 1 }, { unique: true });
  await db.collection("admins").updateOne({ email: process.env.ADMIN_EMAIL.toLowerCase() }, { $setOnInsert: {
    _id: randomUUID(), email: process.env.ADMIN_EMAIL.toLowerCase(),
    passwordHash: process.env.ADMIN_PASSWORD_HASH, createdAt: new Date(),
  } }, { upsert: true });
  await db.collection("sessions").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
  await db.collection("rate_limits").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
  await db.collection("reviews").createIndex({ status: 1, createdAt: -1 });
  await db.collection("settings").updateOne({ _id: "content-initialized" }, { $set: { initializedAt: new Date() } }, { upsert: true });
  console.log("MongoDB connected. Collections, indexes and initial admin are ready.");
} catch (error) {
  console.error(`Database setup failed (${error.name}). Check Atlas network access, cluster availability and credentials.`);
  process.exitCode = 1;
} finally {
  await client.close();
}
