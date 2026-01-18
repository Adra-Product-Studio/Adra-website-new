/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // We use local + inline SVG assets only. If you later add remote logos,
    // add the relevant domains here.
    remotePatterns: []
  }
};

export default nextConfig;
