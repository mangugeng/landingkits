/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    async rewrites() {
        return {
            beforeFiles: [
                // Handle tenant subdomains in development
                {
                    source: '/:path*',
                    has: [
                        {
                            type: 'host',
                            value: '(?<tenant>[^.]+).landingkits.test:3000',
                        },
                    ],
                    destination: '/:tenant/:path*',
                },
            ],
        }
    },
}

export default nextConfig 