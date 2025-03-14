# LandingKits

Platform landing page multi-tenant yang memungkinkan setiap tenant memiliki landing page mereka sendiri dengan subdomain khusus.

## Fitur

- Multi-tenant dengan subdomain custom
- Landing page yang dapat dikustomisasi
- Integrasi dengan Supabase untuk manajemen data
- Responsive design dengan Tailwind CSS
- SEO friendly dengan Next.js

## Tech Stack

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- Supabase

## Development

1. Clone repository:
```bash
git clone https://github.com/mangugeng/landingkits.git
cd landingkits
```

2. Install dependencies:
```bash
npm install
```

3. Copy file .env.example dan sesuaikan dengan konfigurasi Anda:
```bash
cp .env.example .env
```

4. Jalankan development server:
```bash
npm run dev
```

5. Buka [http://localhost:3000](http://localhost:3000)

## Mengakses Tenant

- Development: `http://localhost:3000/[tenant]`
- Production: `https://[tenant].landingkits.com`

## Deployment

Project ini di-deploy menggunakan Vercel. Setiap push ke branch `main` akan otomatis di-deploy.

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## License

MIT
