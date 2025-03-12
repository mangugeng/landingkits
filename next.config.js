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
};

module.exports = nextConfig; 