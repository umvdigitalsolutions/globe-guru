"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();

    const query = q.trim();

    if (!query) {
      router.push("/Destinations");
      return;
    }

    router.push(`/Destinations?q=${encodeURIComponent(query)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex w-full flex-col gap-3 rounded-[26px] border border-white/70 bg-white/90 p-2.5 shadow-[0_16px_40px_rgba(15,23,42,0.10)] backdrop-blur-xl transition focus-within:shadow-[0_20px_55px_rgba(15,23,42,0.14)] sm:flex-row sm:items-center sm:rounded-full">
        {/* INPUT */}
        <div className="flex min-w-0 flex-1 items-center rounded-2xl bg-slate-50 px-4 py-3 sm:rounded-full">
          <span className="mr-3 text-lg text-slate-400">⌕</span>

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search destinations, e.g. Bali"
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none sm:text-base"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full shrink-0 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-3.5 text-sm font-black text-white shadow-[0_14px_30px_rgba(5,150,105,0.24)] transition hover:-translate-y-0.5 hover:opacity-95 sm:w-auto sm:rounded-full"
        >
          Search
        </button>
      </div>
    </form>
  );
}