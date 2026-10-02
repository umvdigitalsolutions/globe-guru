import "server-only";
import { hashToken } from "./auth-crypto";

export async function rateLimit(db, key, limit, seconds) {
  const bucket = Math.floor(Date.now() / (seconds * 1000));
  const record = await db.collection("rate_limits").findOneAndUpdate(
    { _id: hashToken(`${key}:${bucket}`) },
    { $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date((bucket + 2) * seconds * 1000) } },
    { upsert: true, returnDocument: "after" },
  );
  if (record.count > limit) throw Object.assign(new Error("Too many attempts. Please try again later."), { status: 429 });
}
