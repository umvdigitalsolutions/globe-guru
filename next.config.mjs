/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/about-us",
        destination: "/About",
        statusCode: 301,
      },
      {
        source: "/forum/termsandcondition",
        destination: "/terms-and-conditions",
        statusCode: 301,
      },
      {
        source: "/forum/privacypolicy",
        destination: "/privacy-policy",
        statusCode: 301,
      },
      {
        source: "/contact-us",
        destination: "/Contact",
        statusCode: 301,
      },
      {
        source: "/forum/:path*",
        destination: "/",
        statusCode: 302,
      },
    ];
  },
};

export default nextConfig;
