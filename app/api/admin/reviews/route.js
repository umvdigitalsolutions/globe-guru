import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "../../../lib/admin-auth";
import { getDatabase } from "../../../lib/mongodb";
import { reviewSchema } from "../../../lib/review-schema";
import { apiError, readJson } from "../../../lib/api";
import { randomUUID } from "node:crypto";

export async function GET(request) {
  try {
    await requireAdmin(request);
    const db = await getDatabase();
    return NextResponse.json({ records: await db.collection("reviews").find().sort({ createdAt: -1 }).limit(1000).toArray() }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return apiError(error); }
}

export async function POST(request) {
  try {
    await requireAdmin(request);
    const { website, ...data } = reviewSchema.parse(await readJson(request));
    const db = await getDatabase();
    await db.collection("reviews").insertOne({ ...data, _id: randomUUID(), status: "approved", createdAt: new Date(), updatedAt: new Date() });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) { return apiError(error); }
}

export async function PATCH(request) {
  try {
    await requireAdmin(request);
    const { _id, status } = z.object({ _id: z.string().min(1).max(100), status: z.enum(["pending", "approved", "hidden"]) }).parse(await readJson(request));
    const db = await getDatabase();
    const result = await db.collection("reviews").updateOne({ _id }, { $set: { status, updatedAt: new Date() } });
    if (!result.matchedCount) return NextResponse.json({ error: "Review not found." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) { return apiError(error); }
}

export async function DELETE(request) {
  try {
    await requireAdmin(request);
    const { _id } = z.object({ _id: z.string().min(1).max(100) }).parse(await readJson(request));
    const db = await getDatabase();
    const result = await db.collection("reviews").deleteOne({ _id });
    if (!result.deletedCount) return NextResponse.json({ error: "Review not found." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) { return apiError(error); }
}
