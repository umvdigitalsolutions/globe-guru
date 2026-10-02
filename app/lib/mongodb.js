import "server-only";
import { MongoClient } from "mongodb";

export async function getDatabase() {
  if (!process.env.MONGODB_URI) throw new Error("MongoDB is not configured.");
  if (!globalThis.globeMongoPromise) {
    const client = new MongoClient(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    globalThis.globeMongoPromise = client.connect().catch((error) => {
      globalThis.globeMongoPromise = null;
      throw error;
    });
  }
  const client = await globalThis.globeMongoPromise;
  return client.db(process.env.MONGODB_DB || "globeguru_holidays");
}
