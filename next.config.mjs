/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    workerThreads: true,
    webpackBuildWorker: false,
  },
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        pathname: "/photo-*",
        protocol: "https",
      },
      {
        hostname:"www.onlc.com",
        pathname: "/blog/wp-content/uploads/**",
        protocol: "https",
      }
    ],
  },
};

export default nextConfig;
