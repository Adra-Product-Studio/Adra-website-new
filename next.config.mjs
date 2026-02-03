/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // We use local + inline SVG assets only. If you later add remote logos,
    // add the relevant domains here.
    remotePatterns: []
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
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
};

export default nextConfig;
