export const SITE_URL = "https://www.globeguru.org";

const BRAND_NAME = "GlobeGuru Holidays";
const CONTACT_EMAIL = "info@globeguru.org";
const CONTACT_PHONE = "+91-9509597199";
const WHATSAPP_URL = "https://wa.me/919818994463";

export const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: BRAND_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/globe.png`,
  image: `${SITE_URL}/v1.jpg`,
  description:
    "Premium domestic and international holiday planning - luxury travel packages, honeymoon trips, family vacations, adventure tours and custom itineraries.",
  email: CONTACT_EMAIL,
  telephone: CONTACT_PHONE,
  priceRange: "₹₹-₹₹₹",
  areaServed: "Worldwide",
  sameAs: [WHATSAPP_URL],
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "TouristTrip",
        name: "Dubai Luxury Holiday Package",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "TouristTrip",
        name: "Bali Honeymoon & Villas Package",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "TouristTrip",
        name: "Vietnam Adventure Package",
      },
    },
  ],
};

export function buildBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildDestinationBreadcrumbSchema(destination) {
  return buildBreadcrumbSchema([
    {
      name: "Home",
      url: `${SITE_URL}/`,
    },
    {
      name: "Destinations",
      url: `${SITE_URL}/Destinations`,
    },
    {
      name: destination.title,
      url: `${SITE_URL}/Destinations/${destination.slug}`,
    },
  ]);
}

export function buildTouristTripSchema(destination) {
  const price = destination.price.replace(/[^\d]/g, "");
  const touristType = destination.bestFor
    .split(",")
    .map((type) => type.trim())
    .filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: `${destination.title} Holiday Package`,
    description: destination.longDescription,
    url: `${SITE_URL}/Destinations/${destination.slug}`,
    image: `${SITE_URL}${destination.image}`,
    provider: {
      "@type": "TravelAgency",
      name: BRAND_NAME,
      url: `${SITE_URL}/`,
    },
    touristType,
    itinerary: {
      "@type": "ItemList",
      itemListElement: destination.highlights.map((highlight, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: highlight,
      })),
    },
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/Destinations/${destination.slug}`,
      validFrom: "2026-08-09",
    },
  };
}
