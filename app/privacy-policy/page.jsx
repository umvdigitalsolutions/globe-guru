import Link from "next/link";
import { SITE_URL } from "../lib/schema";

export const metadata = {
  title: "Privacy Policy | GlobeGuru Holidays",
  description:
    "Read how GlobeGuru Holidays handles traveller enquiry details, contact information and booking-related information.",
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
};

const sections = [
  {
    title: "Information We Collect",
    body: "When you contact GlobeGuru Holidays, we may collect details such as your name, phone number, email address, destination preference, travel dates, number of travellers, budget and booking requirements.",
  },
  {
    title: "How We Use Information",
    body: "We use enquiry and booking information to respond to requests, prepare quotations, coordinate itineraries, assist with travel services and communicate updates related to your trip.",
  },
  {
    title: "Sharing With Travel Partners",
    body: "Where required for your enquiry or booking, relevant details may be shared with hotels, airlines, visa partners, transfer providers, activity suppliers or other travel service providers.",
  },
  {
    title: "Data Retention",
    body: "We retain enquiry and booking information only as long as needed for travel assistance, customer communication, accounting, legal or operational purposes.",
  },
];

export default function PrivacyPolicyPage() {
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
          Privacy Policy
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
          This policy explains how GlobeGuru Holidays handles information shared
          through travel enquiries, calls, email, WhatsApp and booking
          assistance.
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
            <h2 className="text-xl font-black text-slate-950">
              Privacy Requests
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              To ask about your information or request an update, contact us at{" "}
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
