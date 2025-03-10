import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LandingKits - Buat Landing Page Profesional dalam Hitungan Menit",
  description: "Platform all-in-one untuk membuat landing page yang menarik dan konversif. Tanpa perlu coding, mudah digunakan, dan hasil profesional.",
  keywords: "landing page builder, website builder, drag and drop builder, landing page template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
