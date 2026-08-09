"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);
  const navlinks = [
    { href: "/", label: "Home" },
    { href: "/Destinations", label: "Destinations" },
    { href: "/Packages", label: "Packages" },
    { href: "/Blog", label: "Blog" },
    { href: "/About", label: "About Us" },
    { href: "/Contact", label: "Contact", type: "button" }
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white/40 backdrop-blur-md border-b border-white/30 shadow-sm">
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 font-semibold text-lg text-slate-900">
          <div className="w-75 h-15">
            <Image src="/globe.png" alt="GlobeGuru" width={120} height={120} className="object-contain" priority />
          </div>
          
        </Link>

        <nav className="hidden md:flex items-center gap-6 font-semibold text-slate-900">
          {navlinks.map((link) => (
            link.type === "button" ? (
              <Link key={link.label} href={link.href} className="px-4 py-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-500">{link.label}</Link>
            ) : (
          <Link key={link.label} href={link.href} className="hover:text-slate-700">{link.label}</Link>
          )))}
        </nav>

        <div className="md:hidden">
          <button aria-label="open menu" onClick={() => setOpen((v) => !v)} className="p-2 rounded-md bg-white/30 text-slate-900">☰</button>
        </div>
      </div>
        <div className={`md:hidden absolute top-20 left-0 right-0 bg-white/90 backdrop-blur-lg border-b border-gray-200/30 shadow-lg z-40 transform transition-all duration-500 origin-top ${
            open
              ? 'opacity-100 translate-y-0 visible animate-in slide-in-from-top-2 fade-in'
              : 'opacity-0 -translate-y-2 invisible animate-out slide-out-to-top-2 fade-out'
          }`}
        >
          <div className="px-6 py-4 flex flex-col gap-3 text-slate-900">
            {navlinks.map((link) => (
              link.type === "button" ? (
                <Link key={link.label} href={link.href} onClick={() => setOpen(false)} className="px-4 py-2 rounded-full bg-emerald-600 text-white text-center hover:bg-emerald-500">{link.label}</Link>
              ) : (
                <Link key={link.label} href={link.href} onClick={() => setOpen(false)} className="font-medium">{link.label}</Link>
              )
            ))}
          </div>
        </div>
    </header>
  );
}
