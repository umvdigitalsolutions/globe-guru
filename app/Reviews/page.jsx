import ReviewsSection from "../components/ReviewsSection";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Traveler Reviews",
  description: "Read traveler reviews and share your holiday experience with GlobeGuru Holidays.",
  alternates: { canonical: "/Reviews" },
};

export default async function ReviewsPage({ searchParams }) {
  const params = await searchParams;
  const value = Number(params.page || 1);
  const page = Number.isSafeInteger(value) && value > 0 ? Math.min(value, 100000) : 1;
  return <ReviewsSection fullPage page={page} />;
}
