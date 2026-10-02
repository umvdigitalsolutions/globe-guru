import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { requireAdmin } from "../../../../lib/admin-auth";
import { getDatabase } from "../../../../lib/mongodb";
import { contentSchemas } from "../../../../lib/content-schema";
import { apiError, readJson } from "../../../../lib/api";

async function context(request, params) {
  await requireAdmin(request);
  const { type } = await params;
  if (!Object.hasOwn(contentSchemas, type)) throw Object.assign(new Error("Not found."), { status: 404 });
  const db = await getDatabase();
  return { collection: db.collection(type), schema: contentSchemas[type] };
}

export async function GET(request, { params }) {
  try {
    const { collection } = await context(request, params);
    return NextResponse.json({ records: await collection.find().sort({ order: 1, createdAt: -1 }).toArray() }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return apiError(error); }
}

export async function POST(request, { params }) {
  try {
    const { collection, schema } = await context(request, params);
    const data = schema.parse(await readJson(request));
    const record = { ...data, _id: randomUUID(), createdAt: new Date(), updatedAt: new Date() };
    await collection.insertOne(record);
    return NextResponse.json({ record }, { status: 201 });
  } catch (error) { return apiError(error); }
}

export async function PUT(request, { params }) {
  try {
    const { collection, schema } = await context(request, params);
    const body = await readJson(request);
    if (typeof body._id !== "string" || body._id.length > 100) throw Object.assign(new Error("Invalid record ID."), { status: 400 });
    const data = schema.parse(body);
    const result = await collection.updateOne({ _id: body._id }, { $set: { ...data, updatedAt: new Date() } });
    if (!result.matchedCount) return NextResponse.json({ error: "Record not found." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) { return apiError(error); }
}

export async function DELETE(request, { params }) {
  try {
    const { collection } = await context(request, params);
    const { _id } = await readJson(request);
    if (typeof _id !== "string" || _id.length > 100) throw Object.assign(new Error("Invalid record ID."), { status: 400 });
    const result = await collection.deleteOne({ _id });
    if (!result.deletedCount) return NextResponse.json({ error: "Record not found." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) { return apiError(error); }
}
