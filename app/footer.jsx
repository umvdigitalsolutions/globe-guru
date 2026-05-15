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
            <li><a href="#destinations" className="hover:text-slate-900">Destinations</a></li>
            <li><a href="#packages" className="hover:text-slate-900">Packages</a></li>
            <li><a href="#about" className="hover:text-slate-900">About</a></li>
            <li><a href="#contact" className="hover:text-slate-900">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-sm">Contact</h4>
          <p className="mt-3 text-sm text-slate-700">info@globeguru.org<br/>+91-9509597199</p>
          <p className="mt-4 text-xs text-slate-600">© {new Date().getFullYear()} GlobeGuru Holidays</p>
        </div>
      </div>
    </footer>
  );
}
