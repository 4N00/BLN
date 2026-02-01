import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/config.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "loesnooitgedagt.com",
            },
        ],
        formats: ["image/avif", "image/webp"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 31536000, // Cache for 1 year
        dangerouslyAllowSVG: false,
        contentDispositionType: 'inline',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    compress: true,
    poweredByHeader: false,
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    productionBrowserSourceMaps: true,
    experimental: {
        optimizePackageImports: ["framer-motion", "three", "@react-three/fiber", "@react-three/drei"],
    },
    // Target modern browsers to reduce polyfills
    transpilePackages: [],
    // Enable modern output for smaller bundles
    output: undefined,
};

export default withNextIntl(nextConfig);
