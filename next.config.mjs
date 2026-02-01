/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "loesnooitgedagt.com",
            },
        ],
    },
};

export default nextConfig;
