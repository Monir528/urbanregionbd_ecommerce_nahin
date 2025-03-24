import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
        ],
    },
};

export default nextConfig;
