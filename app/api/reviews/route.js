import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getDatabase } from "../../lib/mongodb";
import { assertSameOrigin } from "../../lib/admin-auth";
import { reviewSchema } from "../../lib/review-schema";
import { rateLimit } from "../../lib/rate-limit";
import { apiError, readJson } from "../../lib/api";

export async function POST(request) {
  try {
    assertSameOrigin(request);
    const { website, ...data } = reviewSchema.parse(await readJson(request));
    if (website) return NextResponse.json({ ok: true }, { status: 201 });
    const db = await getDatabase();
    await rateLimit(db, `review:${data.email.toLowerCase()}`, 3, 3600);
    await rateLimit(db, "reviews-total", 100, 3600);
    await db.collection("reviews").insertOne({ ...data, _id: randomUUID(), status: "pending", createdAt: new Date(), updatedAt: new Date() });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) { return apiError(error); }
}
