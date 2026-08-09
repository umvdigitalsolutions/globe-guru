import Link from "next/link";
import { SITE_URL } from "../lib/schema";

export const metadata = {
  title: "Terms and Conditions | GlobeGuru Holidays",
  description:
    "Read the GlobeGuru Holidays terms and conditions for travel enquiries, package quotations, bookings, payments and itinerary changes.",
  alternates: {
    canonical: `${SITE_URL}/terms-and-conditions`,
  },
};

const sections = [
  {
    title: "Travel Enquiries",
    body: "Package details shared by GlobeGuru Holidays are based on the information available at the time of enquiry. Final pricing, availability and inclusions are confirmed only after travel dates, passenger details and supplier availability are checked.",
  },
  {
    title: "Bookings and Payments",
    body: "A booking may require an advance payment or full payment depending on the package, travel date, hotel, airline, visa requirement or supplier policy. Payment terms, cancellation rules and refund eligibility are shared before confirmation wherever applicable.",
  },
  {
    title: "Itinerary Changes",
    body: "Requested changes after confirmation may affect price, availability and cancellation charges. Weather, operational changes, supplier delays, immigration decisions or other circumstances outside our control may require practical itinerary adjustments.",
  },
  {
    title: "Travel Documents",
    body: "Travellers are responsible for carrying valid passports, visas, permits, identification, tickets and any documents required by airlines, hotels, immigration authorities or destination rules. Visa support does not guarantee approval by any authority.",
  },
];

export default function TermsAndConditionsPage() {
  return (
    <main className="relative overflow-hidden bg-[#f7f3ea]">
      <section className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:py-20">
        <Link
          href="/"
          className="inline-flex rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-white"
        >
          Back to Home
        </Link>

        <h1 className="mt-8 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
          Terms and Conditions
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
          These terms outline how GlobeGuru Holidays handles travel enquiries,
          package planning and booking assistance. Specific supplier terms may
          apply to hotels, airlines, cruises, transfers, visas and activities.
        </p>

        <div className="mt-10 space-y-5 rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-black text-slate-950">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {section.body}
              </p>
            </section>
          ))}

          <section>
            <h2 className="text-xl font-black text-slate-950">Contact</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              For questions about a booking or quotation, contact us at{" "}
              <a
                href="mailto:info@globeguru.org"
                className="font-bold text-sky-700 underline decoration-sky-200 underline-offset-4 hover:text-sky-900"
              >
                info@globeguru.org
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
