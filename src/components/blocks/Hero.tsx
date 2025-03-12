'use client';

import Image from 'next/image';
import { HeroProps } from '@/lib/types';

export default function Hero({
  title,
  subtitle,
  ctaText,
  ctaLink,
  imageUrl,
  imageAlt,
  layout = 'left',
  backgroundColor = 'bg-white',
  textColor = 'text-gray-900',
  height = 'normal',
  ctaColor = 'bg-blue-600',
  imagePosition = 'right'
}: HeroProps) {
  return (
    <div className={`${backgroundColor} ${height === 'full' ? 'min-h-screen' : 'py-24'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col ${layout === 'center' ? 'items-center text-center' : 'md:flex-row'} gap-8`}>
          <div className={`flex-1 ${layout === 'right' ? 'order-2' : ''}`}>
            <h1 className={`text-4xl font-bold tracking-tight ${textColor} sm:text-5xl md:text-6xl`}>
              {title}
            </h1>
            <p className={`mt-3 text-lg ${textColor} sm:mt-5 sm:text-xl lg:text-lg xl:text-xl`}>
              {subtitle}
            </p>
            <div className="mt-5 sm:mt-8">
              <a
                href={ctaLink}
                className={`${ctaColor} text-white font-medium px-8 py-3 text-base rounded-md hover:opacity-90 inline-block`}
              >
                {ctaText}
              </a>
            </div>
          </div>
          <div className={`flex-1 ${imagePosition === 'left' ? 'order-first' : ''}`}>
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-auto object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 