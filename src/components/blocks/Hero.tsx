'use client';

import Image from 'next/image';

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: string;
  imageAlt?: string;
  layout?: 'left' | 'center';
  backgroundColor?: string;
  textColor?: string;
  height?: 'normal' | 'large';
  ctaColor?: string;
  imagePosition?: 'right' | 'left';
}

const Hero = ({
  title = "Bangun Landing Page Impian Anda",
  subtitle = "Buat landing page yang menarik dalam hitungan menit dengan builder drag-and-drop kami. Tanpa perlu coding.",
  ctaText = "Mulai Sekarang",
  ctaLink = "#",
  imageUrl = "/placeholder-hero.jpg",
  imageAlt = "Hero image",
  layout = 'left',
  backgroundColor = 'bg-white',
  textColor = 'text-gray-900',
  height = 'normal',
  ctaColor = 'bg-blue-600',
  imagePosition = 'right',
}: HeroProps) => {
  return (
    <div className={`relative ${backgroundColor} ${height === 'large' ? 'py-24' : 'py-16'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`relative z-10 grid lg:grid-cols-2 gap-8 items-center ${imagePosition === 'left' ? 'lg:flex-row-reverse' : ''}`}>
          <div className={`text-${layout} lg:text-${layout}`}>
            <h1 className={`text-4xl tracking-tight font-extrabold ${textColor} sm:text-5xl md:text-6xl ${layout === 'center' ? 'mx-auto' : ''}`}>
              {title}
            </h1>
            <p className={`mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl md:mt-5 md:text-xl ${layout === 'center' ? 'mx-auto' : ''}`}>
              {subtitle}
            </p>
            <div className={`mt-5 sm:mt-8 ${layout === 'center' ? 'flex justify-center' : ''}`}>
              <div className="rounded-md shadow">
                <a
                  href={ctaLink}
                  className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white ${ctaColor} hover:opacity-90 transition-opacity duration-200 md:py-4 md:text-lg md:px-10`}
                >
                  {ctaText}
                </a>
              </div>
            </div>
          </div>
          <div className={`relative w-full h-64 sm:h-72 md:h-96 lg:h-full max-h-[600px] ${imagePosition === 'left' ? 'order-first' : ''}`}>
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              priority
              className="object-cover rounded-lg shadow-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-hero.jpg';
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 