import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "backend.urbanregionbd.com",
                pathname: "/Images/**", // ✅ Allow only images from `/Images/`
            },
        ],
    },
};

export default nextConfig;
