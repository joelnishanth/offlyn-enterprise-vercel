import { withWorkflow } from "workflow/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.offlyn.ai",
      },
    ],
  },
};

export default withWorkflow(nextConfig);
