import type { NextConfig } from "next";
import withPWA from "next-pwa";

const withPWAConfig = withPWA({
  dest: "public", // Destination directory for the PWA files
  disable: false,// Disable PWA in development
  register: true, // Register the service worker automatically
  skipWaiting: true, // Activate service worker immediately
});

const nextConfig: NextConfig = {
  // Your other Next.js config options here (e.g., reactStrictMode, swcMinify)
  reactStrictMode: true,
};

// Wrap the Next.js config with the PWA config
export default withPWAConfig(nextConfig as any);