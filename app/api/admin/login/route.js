import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getDatabase } from "../../../lib/mongodb";
import { assertSameOrigin, SESSION_COOKIE, SESSION_SECONDS } from "../../../lib/admin-auth";
import { verifyPassword, hashToken } from "../../../lib/auth-crypto";
import { rateLimit } from "../../../lib/rate-limit";
import { apiError, readJson } from "../../../lib/api";

export async function POST(request) {
  try {
    assertSameOrigin(request);
    const { email, password } = z.object({ email: z.email().max(254), password: z.string().min(1).max(256) }).parse(await readJson(request));
    const db = await getDatabase();
    await rateLimit(db, "login-total", 60, 60);
    await rateLimit(db, `login:${email.toLowerCase()}`, 10, 900);
    const admin = await db.collection("admins").findOne({ email: email.toLowerCase() });
    const valid = verifyPassword(password, admin?.passwordHash || `00000000000000000000000000000000:${"0".repeat(128)}`);
    if (!admin || !valid) return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
    const token = randomBytes(32).toString("hex");
    await db.collection("sessions").insertOne({ _id: hashToken(token), adminId: admin._id, expiresAt: new Date(Date.now() + SESSION_SECONDS * 1000) });
    const response = NextResponse.json({ email: admin.email });
    response.cookies.set(SESSION_COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: SESSION_SECONDS });
    return response;
  } catch (error) { return apiError(error); }
}
