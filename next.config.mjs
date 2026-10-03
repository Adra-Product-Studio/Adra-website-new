/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // The two small local logos do not need a server-side image fetch/decoder.
    unoptimized: true,
    remotePatterns: []
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()"
          },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          // Match the existing production host policy without claiming subdomains.
          { key: "Strict-Transport-Security", value: "max-age=63072000" }
        ]
      }
    ];
  },
  async redirects() {
    return [
      { source: "/home", destination: "/#home", permanent: true },
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/startups", destination: "/#startups", permanent: true },
      { source: "/enterprises", destination: "/#enterprises", permanent: true },
      { source: "/capabilities", destination: "/#capabilities", permanent: true },
      { source: "/engagement", destination: "/#engagement", permanent: true },
      { source: "/clients", destination: "/#clients", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true }
    ];
  }
};

export default nextConfig;
