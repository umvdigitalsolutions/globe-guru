import { getDatabase } from "../lib/mongodb";
import Reviews from "./Reviews";
import { redirect } from "next/navigation";

export default async function ReviewsSection({ fullPage = false, page = 1 }) {
  let reviews = [];
  let summary = { count: 0, average: 0 };
  let unavailable = false;
  const pageSize = fullPage ? 12 : 6;
  try {
    const db = await getDatabase();
    const collection = db.collection("reviews");
    const results = await Promise.all([
      collection.find({ status: "approved" }, { projection: { _id: 1, name: 1, destination: 1, rating: 1, message: 1 } }).sort({ createdAt: -1, _id: -1 }).skip((page - 1) * pageSize).limit(pageSize).toArray(),
      collection.aggregate([{ $match: { status: "approved" } }, { $group: { _id: "$rating", count: { $sum: 1 } } }]).toArray(),
    ]);
    reviews = results[0];
    const count = results[1].reduce((sum, group) => sum + group.count, 0);
    summary = { count, average: count ? results[1].reduce((sum, group) => sum + group._id * group.count, 0) / count : 0 };
  } catch { unavailable = true; }
  const lastPage = Math.max(1, Math.ceil(summary.count / pageSize));
  if (fullPage && !unavailable && page > lastPage) redirect(lastPage === 1 ? "/Reviews" : `/Reviews?page=${lastPage}`);
  return <Reviews reviews={reviews} fullPage={fullPage} summary={summary} page={page} pageSize={pageSize} unavailable={unavailable} />;
}
