"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Star, X, Send, LoaderCircle, MessageSquarePlus, ArrowLeft, ArrowRight } from "lucide-react";

export default function Reviews({ reviews, fullPage = false, summary = { count: 0, average: 0 }, page = 1, pageSize = 6, unavailable = false }) {
  const dialog = useRef(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const Heading = fullPage ? "h1" : "h2";
  const ratingLabels = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];
  const pages = Math.max(1, Math.ceil(summary.count / pageSize));
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const body = { ...Object.fromEntries(new FormData(form)), rating };
    if (!rating) { setError("Please choose a star rating."); return; }
    setStatus("sending"); setError("");
    try {
      const response = await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setStatus("sent"); form.reset();
    } catch (err) { setError(err.message || "Could not submit your review."); setStatus("idle"); }
  }
  return <section className={`bg-white px-4 py-14 sm:px-6 ${fullPage ? "min-h-[65vh]" : ""}`}>
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Heading className="text-2xl font-bold text-zinc-900">Traveler reviews</Heading>
        <div className="flex flex-wrap items-center gap-4">
          {!fullPage && <Link href="/Reviews" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600">All reviews <ArrowRight size={15} /></Link>}
          <button type="button" onClick={() => { setStatus("idle"); setError(""); setRating(0); setHoverRating(0); dialog.current.showModal(); }} className="inline-flex items-center gap-2 rounded-md border border-zinc-200 px-4 py-2.5 text-sm font-semibold text-emerald-700"><MessageSquarePlus size={17} /> Write a review</button>
        </div>
      </div>
      {summary.count > 0 && <div className="mt-6 flex flex-wrap items-center gap-3 border-b border-zinc-200 pb-6"><Star size={24} className="text-amber-500" fill="currentColor" /><strong className="text-2xl text-zinc-900">{summary.average.toFixed(1)}<span className="ml-1 text-sm font-normal text-zinc-500">/ 5</span></strong><span className="text-sm text-zinc-500">Based on {summary.count} {summary.count === 1 ? "review" : "reviews"}</span></div>}
      {reviews.length > 0 ? <div className="mt-7 grid gap-5 md:grid-cols-3">{reviews.map((review) => <article key={review._id} className="rounded-lg border border-zinc-200 p-5">
        <div className="flex gap-1 text-amber-500" aria-label={`${review.rating} out of 5 stars`}>{Array.from({ length: 5 }, (_, i) => <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} />)}</div>
        <p className="mt-4 whitespace-pre-line break-words text-sm leading-7 text-zinc-700">{review.message}</p>
        <p className="mt-5 text-sm font-semibold text-zinc-900">{review.name}</p><p className="mt-1 text-xs text-zinc-500">{review.destination}</p>
      </article>)}</div> : <p className="mt-5 text-sm text-zinc-500">{unavailable ? "Reviews are temporarily unavailable. Please try again shortly." : summary.count ? "No reviews on this page." : "No ratings yet. Share your travel experience."}</p>}
      {fullPage && pages > 1 && <nav aria-label="Review pages" className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200 pt-5">
        {page > 1 ? <Link href={`/Reviews?page=${page - 1}`} className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700"><ArrowLeft size={16} />Previous</Link> : <span />}
        <span className="text-sm text-zinc-500">Page {page} of {pages}</span>
        {page < pages ? <Link href={`/Reviews?page=${page + 1}`} className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">Next<ArrowRight size={16} /></Link> : <span />}
      </nav>}
    </div>
    <dialog ref={dialog} className="review-dialog m-auto w-[calc(100%-32px)] max-w-lg rounded-lg bg-white p-6 text-zinc-900 backdrop:bg-black/40">
      <div className="flex items-center justify-between gap-4"><h2 className="text-xl font-bold">Your travel experience</h2><button type="button" aria-label="Close review form" title="Close" onClick={() => dialog.current.close()}><X size={22} /></button></div>
      {status === "sent" ? <p role="status" className="mt-6 text-emerald-700">Thank you. Your review has been submitted for approval.</p> : <form onSubmit={submit} className="admin-form mt-5">
        <label>Name<input name="name" minLength={2} maxLength={120} autoComplete="name" required /></label>
        <label>Email<input name="email" type="email" maxLength={254} autoComplete="email" required /></label>
        <label>Destination<input name="destination" minLength={2} maxLength={200} required /></label>
        <fieldset><legend className="mb-2 text-sm font-medium">Rating</legend><div className="flex flex-wrap items-center gap-3"><div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>{[1, 2, 3, 4, 5].map((value) => <label key={value} title={`${value} ${value === 1 ? "star" : "stars"}: ${ratingLabels[value]}`} onMouseEnter={() => setHoverRating(value)} className="cursor-pointer p-1">
          <input type="radio" name="rating" value={value} checked={rating === value} onChange={() => setRating(value)} required className="peer sr-only" aria-label={`${value} ${value === 1 ? "star" : "stars"}`} />
          <Star size={28} fill={value <= (hoverRating || rating) ? "currentColor" : "none"} className="rounded-sm text-amber-500 peer-focus-visible:outline-2 peer-focus-visible:outline-emerald-600" />
        </label>)}</div><span className="min-w-20 text-sm text-zinc-600" aria-live="polite">{rating ? `${rating}/5 · ${ratingLabels[rating]}` : "Not rated"}</span></div></fieldset>
        <label>Review<textarea name="message" rows={4} minLength={10} maxLength={2000} required /></label>
        <div hidden><input name="website" tabIndex={-1} autoComplete="off" /></div>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button disabled={status === "sending"} className="admin-button"><Send size={16} />{status === "sending" ? <LoaderCircle size={16} className="animate-spin" /> : "Submit review"}</button>
      </form>}
    </dialog>
  </section>;
}
