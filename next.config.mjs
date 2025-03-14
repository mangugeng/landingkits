/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                port: '',
                pathname: '/mangugeng/assets/**',
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: [
                            "default-src 'self'",
                            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
                            "style-src 'self' 'unsafe-inline'",
                            "img-src 'self' https: data:",
                            "font-src 'self'",
                            "connect-src 'self' https://azybkaoytjcgdqrqanss.supabase.co",
                            "frame-ancestors 'none'",
                            "base-uri 'self'",
                            "form-action 'self'",
                        ].join('; ')
                    }
                ]
            }
        ]
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