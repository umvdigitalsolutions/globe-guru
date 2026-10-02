import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { assertSameOrigin, SESSION_COOKIE } from "../../../lib/admin-auth";
import { getDatabase } from "../../../lib/mongodb";
import { hashToken } from "../../../lib/auth-crypto";
import { apiError } from "../../../lib/api";

export async function POST(request) {
  try {
    assertSameOrigin(request);
    const token = (await cookies()).get(SESSION_COOKIE)?.value;
    if (token) {
      const db = await getDatabase();
      await db.collection("sessions").deleteOne({ _id: hashToken(token) });
    }
    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE, "", { maxAge: 0, path: "/", httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production" });
    return response;
  } catch (error) { return apiError(error); }
}
