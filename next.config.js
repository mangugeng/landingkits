/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        domains: ['landingkits.com', 'www.landingkits.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ui-avatars.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'azybkaoytjcgdqrqanss.supabase.co',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'landingkits.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '*.landingkits.com',
                port: '',
                pathname: '/**',
            }
        ],
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        unoptimized: process.env.NODE_ENV === 'development'
    },
    async rewrites() {
        return [
            // Handle subdomain access - catch all paths
            {
                source: '/:path*',
                has: [
                    {
                        type: 'host',
                        value: '(?<subdomain>[^.]+).landingkits.com',
                    },
                ],
                destination: '/_sites/:subdomain',
            },
        ];
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                    {
                        key: 'Cache-Control',
                        value: 'no-store, max-age=0',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;