import "server-only";
import { cookies } from "next/headers";
import { getDatabase } from "./mongodb";
import { hashToken } from "./auth-crypto";

export const SESSION_COOKIE = "globeguru_admin";
export const SESSION_SECONDS = 60 * 60 * 8;

export async function getAdmin() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const db = await getDatabase();
  const session = await db.collection("sessions").findOne({
    _id: hashToken(token), expiresAt: { $gt: new Date() },
  });
  if (!session) return null;
  const admin = await db.collection("admins").findOne({ _id: session.adminId });
  return admin ? { email: admin.email } : null;
}

export function assertSameOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) {
    throw Object.assign(new Error("Request origin is not allowed."), { status: 403 });
  }
}

export async function requireAdmin(request) {
  if (request.method !== "GET") assertSameOrigin(request);
  const admin = await getAdmin();
  if (!admin) throw Object.assign(new Error("Please sign in."), { status: 401 });
  return admin;
}
