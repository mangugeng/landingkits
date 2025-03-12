import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';

export default async function Page() {
  const headersList = headers()
  const domain = headersList.get('host') || ''
  const subdomain = domain.split('.')[0]
  
  // Jika bukan subdomain landingkits.com, tampilkan halaman utama
  if (!domain.includes('landingkits.com') || subdomain === 'www' || subdomain === 'landingkits') {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">Welcome to LandingKits</h1>
        <p className="text-xl text-gray-600">Create beautiful landing pages in minutes</p>
      </main>
    )
  }

  // Jika subdomain, redirect ke halaman template
  redirect(`/_sites/${subdomain}`)
}
