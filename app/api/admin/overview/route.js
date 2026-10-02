import { NextResponse } from "next/server";
import { requireAdmin } from "../../../lib/admin-auth";
import { getDatabase } from "../../../lib/mongodb";
import { apiError } from "../../../lib/api";

export async function GET(request) {
  try {
    await requireAdmin(request);
    const db = await getDatabase();
    const counts = {};
    for (const type of ["packages", "destinations", "blogs", "reviews"]) counts[type] = await db.collection(type).countDocuments();
    counts.pendingReviews = await db.collection("reviews").countDocuments({ status: "pending" });
    return NextResponse.json({ counts, recent: await db.collection("reviews").find().sort({ createdAt: -1 }).limit(5).toArray(), database: "connected" }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return apiError(error); }
}
