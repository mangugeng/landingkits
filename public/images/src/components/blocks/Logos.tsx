'use client';

import Image from 'next/image';

interface LogosProps {
  sectionTitle?: string;
  sectionDescription?: string;
  logos?: Array<{
    name: string;
    url: string;
    image: string;
  }>;
}

const defaultLogos = [
  {
    name: 'Company 1',
    url: '#',
    image: '/logos/logo1.svg',
  },
  {
    name: 'Company 2',
    url: '#',
    image: '/logos/logo2.svg',
  },
  {
    name: 'Company 3',
    url: '#',
    image: '/logos/logo3.svg',
  },
  {
    name: 'Company 4',
    url: '#',
    image: '/logos/logo4.svg',
  },
  {
    name: 'Company 5',
    url: '#',
    image: '/logos/logo5.svg',
  },
  {
    name: 'Company 6',
    url: '#',
    image: '/logos/logo6.svg',
  },
];

const Logos = ({
  sectionTitle = 'Trusted by Leading Companies',
  sectionDescription = 'We work with some of the most innovative companies in the world',
  logos = defaultLogos,
}: LogosProps) => {
  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {(sectionTitle || sectionDescription) && (
          <div className="mx-auto max-w-2xl text-center mb-12">
            {sectionTitle && (
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {sectionTitle}
              </h2>
            )}
            {sectionDescription && (
              <p className="mt-4 text-lg leading-8 text-gray-600">
                {sectionDescription}
              </p>
            )}
          </div>
        )}
        <div className="mx-auto grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-6">
          {logos.map((logo, index) => (
            <a
              key={index}
              href={logo.url}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-200"
            >
              <Image
                src={logo.image}
                alt={logo.name}
                width={158}
                height={48}
                className="max-h-12 w-full object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Logos; 