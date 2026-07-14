/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        pathname: "/photo-*",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
