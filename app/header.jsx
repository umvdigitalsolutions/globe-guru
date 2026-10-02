"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

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
          <div className="w-36 shrink-0">
            <Image src="/globe.png" alt="GlobeGuru" width={144} height={96} className="h-16 w-36 object-contain" priority />
          </div>
          
        </Link>

        <nav className="hidden md:flex items-center gap-3 lg:gap-4 xl:gap-6 text-sm font-semibold text-slate-900">
          {navlinks.map((link) => (
            link.type === "button" ? (
              <Link key={link.label} href={link.href} className="px-4 py-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-500">{link.label}</Link>
            ) : (
          <Link key={link.label} href={link.href} className="hover:text-slate-700">{link.label}</Link>
          )))}
        </nav>

        <div className="md:hidden">
          <button type="button" aria-label={open ? "Close menu" : "Open menu"} title={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)} className="p-2 rounded-md bg-white/30 text-slate-900">{open ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>
        <div className={`md:hidden absolute top-full left-0 right-0 bg-white/90 backdrop-blur-lg border-b border-gray-200/30 shadow-lg z-40 transform transition-all duration-500 origin-top ${
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
