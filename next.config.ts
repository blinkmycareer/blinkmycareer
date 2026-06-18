import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Interim: the app is fully static (no server code yet), so we export a
  // static site and deploy it to Firebase Hosting on the free Spark plan —
  // no billing required. When the server-side AI engine lands we'll remove
  // `output: "export"` and move to Firebase App Hosting (SSR, Blaze).
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
