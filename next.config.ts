import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    reactStrictMode: true,
    sassOptions: {
        additionalData: `$var: red;`,
        implementation: 'sass-embedded',
    },
    transpilePackages: ['react-draft-wysiwyg', 'draft-js'],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "backend.urbanregionbd.com",
                pathname: "/Images/**", // ✅ Allow only images from `/Images/`
            },
            {
                protocol: "http",
                hostname: "localhost",
                pathname: "/carousel_images/**", // ✅ Allow only images from `/carousel_images/`
            },
            {
                protocol: "http",
                hostname: "192.168.0.104",
                pathname: "/carousel_images/**", // ✅ Allow images from your LAN backend
            },
            {
                protocol: "http",
                hostname: "10.16.0.116",
                pathname: "/**", // ✅ Allow only images from `/Images/`
            },
            {
                protocol: "http",
                hostname: "192.168.0.101",
                pathname: "/**", // ✅ Allow only images from `/Images/`
            },
            {
                protocol: "http",
                hostname: "192.168.8.93",
                pathname: "/**", // ✅ Allow only images from `/Images/`
            },
        ],
    },
};

export default nextConfig;
