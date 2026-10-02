import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin, SESSION_COOKIE } from "../../../lib/admin-auth";
import { getDatabase } from "../../../lib/mongodb";
import { hashPassword, verifyPassword } from "../../../lib/auth-crypto";
import { apiError, readJson } from "../../../lib/api";
import { rateLimit } from "../../../lib/rate-limit";

export async function POST(request) {
  try {
    const user = await requireAdmin(request);
    const { currentPassword, newPassword } = z.object({ currentPassword: z.string().max(256), newPassword: z.string().min(12).max(256) }).parse(await readJson(request));
    const db = await getDatabase();
    await rateLimit(db, `password:${user.email}`, 10, 900);
    const admin = await db.collection("admins").findOne({ email: user.email });
    if (!verifyPassword(currentPassword, admin.passwordHash)) return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
    await db.collection("admins").updateOne({ _id: admin._id }, { $set: { passwordHash: hashPassword(newPassword), updatedAt: new Date() } });
    await db.collection("sessions").deleteMany({ adminId: admin._id });
    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE, "", { maxAge: 0, path: "/", httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production" });
    return response;
  } catch (error) { return apiError(error); }
}
