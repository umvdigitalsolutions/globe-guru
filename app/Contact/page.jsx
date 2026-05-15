import Link from "next/link";

export const metadata = {
  title: "Contact Us | GlobeGuru Holidays",
  description:
    "Contact GlobeGuru Holidays for custom holiday packages, honeymoon trips, family tours, international travel planning and complete travel assistance.",
};

export default function ContactPage() {
  return (
    <main className="relative overflow-hidden bg-[#f7f3ea]">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(212,175,55,0.18),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(14,165,233,0.14),transparent_30%)]" />

      <div className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:76px_76px]" />

      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Header */}
        <header className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-[#d4af37]/35 bg-[#fff8df] px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-[#8a6a12]">
            Contact GlobeGuru Holidays
          </span>

          <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Let’s plan your{" "}
            <span className="bg-gradient-to-r from-[#b8860b] via-[#d4af37] to-sky-600 bg-clip-text text-transparent">
              perfect holiday
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Tell us your destination, travel dates, budget and preferences. Our
            team will help you with a customized travel plan.
          </p>
        </header>

        {/* Contact Cards */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <article className="rounded-[32px] border border-white/70 bg-white/75 p-7 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_25px_75px_rgba(15,23,42,0.14)]">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-xl text-[#f4d76a]">
              ☎
            </div>

            <h2 className="text-xl font-black text-slate-950">Phone</h2>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Speak directly with our travel team for quick assistance.
            </p>

            <a
              href="tel:+919509597199"
              className="mt-5 inline-flex text-lg font-black text-[#059669] transition hover:text-[#047857]"
            >
              +91-9509597199
            </a>

            <p className="mt-2 text-sm text-slate-500">
              Mon–Sat, 9:00 AM — 6:00 PM
            </p>
          </article>

          <article className="rounded-[32px] border border-white/70 bg-white/75 p-7 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_25px_75px_rgba(15,23,42,0.14)]">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-xl text-[#f4d76a]">
              ✉
            </div>

            <h2 className="text-xl font-black text-slate-950">Email</h2>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Send your travel requirement and we will respond with details.
            </p>

            <a
              href="mailto:info@globeguru.org"
              className="mt-5 inline-flex break-all text-lg font-black text-[#059669] transition hover:text-[#047857]"
            >
              info@globeguru.org
            </a>

            <p className="mt-2 text-sm text-slate-500">
              Typical response within 24 hours
            </p>
          </article>

          <article className="rounded-[32px] border border-white/70 bg-white/75 p-7 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_25px_75px_rgba(15,23,42,0.14)]">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-xl text-[#f4d76a]">
              💬
            </div>

            <h2 className="text-xl font-black text-slate-950">WhatsApp</h2>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Get instant help for packages, itinerary planning and quotations.
            </p>

            <a
              href="https://wa.me/919509597199"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex rounded-full bg-[#059669] px-6 py-3 text-sm font-black text-white shadow-[0_14px_30px_rgba(5,150,105,0.25)] transition hover:-translate-y-0.5 hover:bg-[#047857]"
            >
              Chat on WhatsApp
            </a>
          </article>
        </div>

        {/* Address + Quick Inquiry */}
        <section className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[36px] border border-white/70 bg-white/75 p-7 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#9b7513]">
              Address
            </p>

            <h2 className="mt-4 text-3xl font-black text-slate-950">
              Globe Guru Holidays
            </h2>

            <address className="mt-5 not-italic text-base leading-8 text-slate-600">
              Ganesh Nagar, Ratanada,
              <br />
              Jodhpur, Rajasthan,
              <br />
              India
            </address>

            <p className="mt-5 text-sm leading-7 text-slate-500">
              For meetings, documentation, or detailed trip planning, please
              call ahead to schedule an appointment.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="tel:+919509597199"
                className="rounded-full bg-slate-950 px-7 py-4 text-sm font-black text-white shadow-[0_14px_30px_rgba(15,23,42,0.20)] transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Call Now
              </a>

              <a
                href="mailto:info@globeguru.org"
                className="rounded-full border border-slate-300 bg-white px-7 py-4 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-50"
              >
                Send Email
              </a>
            </div>
          </article>

          <article className="overflow-hidden rounded-[36px] border border-white/10 bg-slate-950 p-7 text-white shadow-[0_30px_90px_rgba(15,23,42,0.22)] sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#f4d76a]">
              Quick Inquiry
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight">
              Ready to start your journey?
            </h2>

            <p className="mt-4 text-sm leading-8 text-slate-300 sm:text-base">
              Share your preferred destination, number of travelers, travel
              dates and budget. We will prepare a custom package suggestion for
              you.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
                <p className="text-2xl font-black text-[#f4d76a]">Custom</p>
                <p className="mt-1 text-sm text-slate-300">
                  Tailor-made itinerary
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
                <p className="text-2xl font-black text-[#f4d76a]">Support</p>
                <p className="mt-1 text-sm text-slate-300">
                  End-to-end guidance
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://wa.me/919509597199?text=Hi%20GlobeGuru%20Holidays%2C%20I%20want%20to%20plan%20a%20trip.%20Please%20share%20details."
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#d4af37] px-7 py-4 text-center text-sm font-black text-slate-950 shadow-[0_18px_40px_rgba(212,175,55,0.25)] transition hover:-translate-y-0.5 hover:bg-[#f4d76a]"
              >
                Inquire on WhatsApp
              </a>

              <Link
                href="/Packages"
                className="rounded-full border border-white/15 bg-white/10 px-7 py-4 text-center text-sm font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
              >
                View Packages
              </Link>
            </div>
          </article>
        </section>

        {/* Clean Address Section */}
        <section className="mt-10 rounded-[36px] border border-white/70 bg-white/75 p-7 text-center shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#9b7513]">
            Corporate Address
          </p>

          <h2 className="mt-4 text-3xl font-black text-slate-950">
            Globe Guru Holidays
          </h2>

          <address className="mx-auto mt-5 max-w-2xl not-italic text-base leading-8 text-slate-600 sm:text-lg">
            Ganesh Nagar, Ratanada,
            <br />
            Jodhpur, Rajasthan,
            <br />
            India
          </address>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-500">
            For meetings, documentation, or detailed trip planning, please call
            ahead to schedule an appointment.
          </p>
        </section>
      </section>
    </main>
  );
}