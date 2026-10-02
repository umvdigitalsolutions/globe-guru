import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white/40 backdrop-blur-md border-t border-white/30">
      <div className="mx-auto max-w-7xl px-6 py-8 grid gap-8 md:grid-cols-3 text-slate-900">
        <div>
          <h3 className="text-lg font-semibold">GlobeGuru Holidays</h3>
          <p className="mt-2 text-sm text-slate-700">Creative travel planning, curated experiences, lifetime memories.</p>
        </div>

        <div>
          <h4 className="font-medium text-sm">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li><Link href="/Destinations" className="hover:text-slate-900">Destinations</Link></li>
            <li><Link href="/Packages" className="hover:text-slate-900">Packages</Link></li>
            <li><Link href="/Blog" className="hover:text-slate-900">Blog</Link></li>
            <li><Link href="/Reviews" className="hover:text-slate-900">Reviews</Link></li>
            <li><Link href="/About" className="hover:text-slate-900">About</Link></li>
            <li><Link href="/Contact" className="hover:text-slate-900">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-sm">Contact</h4>
          <p className="mt-3 text-sm text-slate-700">info@globeguru.org<br/>+91-9509597199</p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-600">
            <Link href="/privacy-policy" className="hover:text-slate-900">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-slate-900">Terms</Link>
          </div>
          <p className="mt-4 text-xs text-slate-600">© {new Date().getFullYear()} GlobeGuru Holidays</p>
        </div>
      </div>
    </footer>
  );
}
