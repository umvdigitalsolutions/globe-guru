"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/Destinations?q=${encodeURIComponent(q)}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 w-full max-w-xl"
    >
      <div className="flex items-center gap-2 rounded-full border border-white/60 bg-white/80 p-2 shadow-lg backdrop-blur-md transition focus-within:shadow-xl">
        
        {/* INPUT */}
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search destinations, e.g. Bali"
          className="flex-1 bg-transparent px-4 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
        >
          Search
        </button>
      </div>
    </form>
  );
}