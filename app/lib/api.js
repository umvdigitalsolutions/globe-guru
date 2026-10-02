import { NextResponse } from "next/server";

export function apiError(error) {
  if (error?.name === "ZodError") {
    return NextResponse.json({ error: error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ") }, { status: 400 });
  }
  if (error?.code === 11000) return NextResponse.json({ error: "This slug or ID already exists." }, { status: 409 });
  if (error instanceof SyntaxError) return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  return NextResponse.json({ error: error.status ? error.message : "The database is unavailable. Please try again shortly." }, { status: error.status || 503 });
}

export async function readJson(request) {
  const text = await request.text();
  if (Buffer.byteLength(text) > 200000) throw Object.assign(new Error("Request is too large."), { status: 413 });
  return JSON.parse(text);
}
