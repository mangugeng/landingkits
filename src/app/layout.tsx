import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SupabaseProvider } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: '%s | LandingKits',
    default: 'LandingKits - Platform Landing Page Multi-tenant',
  },
  description: "Buat landing page profesional untuk bisnis Anda dengan mudah",
  metadataBase: new URL('http://landingkits.test:3000'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/icon" type="image/png" sizes="32x32" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <SupabaseProvider>
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}
