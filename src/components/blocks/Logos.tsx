'use client';

import Image from 'next/image';

interface Logo {
  name: string;
  url: string;
  image: string;
}

interface LogosProps {
  title?: string;
  description?: string;
  logos?: string;
}

const defaultLogos: Logo[] = [
  {
    name: 'Google',
    url: 'https://google.com',
    image: '/images/logos/google.png',
  },
  {
    name: 'Microsoft',
    url: 'https://microsoft.com',
    image: '/images/logos/microsoft.png',
  },
  {
    name: 'Amazon',
    url: 'https://amazon.com',
    image: '/images/logos/amazon.png',
  },
  {
    name: 'Apple',
    url: 'https://apple.com',
    image: '/images/logos/apple.png',
  },
  {
    name: 'Meta',
    url: 'https://meta.com',
    image: '/images/logos/meta.png',
  },
  {
    name: 'Netflix',
    url: 'https://netflix.com',
    image: '/images/logos/netflix.png',
  },
];

const generatePlaceholderImage = (name: string, index: number) => {
  const colors = ['2196F3', '00A4EF', 'FF9900', '000000', '1877F2', 'E50914'];
  const colorIndex = index % colors.length;
  return `/images/logos/placeholder-${(index % 6) + 1}.png`;
};

const Logos = ({
  title = 'Dipercaya oleh Perusahaan Terkemuka',
  description = 'Kami bekerja sama dengan beberapa perusahaan paling inovatif di dunia',
  logos = JSON.stringify(defaultLogos),
}: LogosProps) => {
  let parsedLogos: Logo[] = [];

  try {
    const parsed = JSON.parse(logos);
    if (Array.isArray(parsed)) {
      parsedLogos = parsed.map((logo, index) => {
        const name = logo.name || `Company ${index + 1}`;
        return {
          ...logo,
          name,
          url: logo.url || '#',
          image: logo.image || `/images/logos/logo-${index + 1}.png`
        };
      });
    }
  } catch (error) {
    console.error('Error parsing logos:', error);
    parsedLogos = defaultLogos;
  }

  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {(title || description) && (
          <div className="mx-auto max-w-2xl text-center mb-12">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-lg leading-8 text-gray-600">
                {description}
              </p>
            )}
          </div>
        )}
        <div className="mx-auto grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-6">
          {parsedLogos.map((logo, index) => (
            <a
              key={index}
              href={logo.url}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-200"
            >
              <div className="w-full h-12 flex items-center justify-center bg-gray-100 rounded-lg">
                <span className="text-lg font-semibold text-gray-900">{logo.name}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Logos; 