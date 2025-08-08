import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "apod.nasa.gov",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
