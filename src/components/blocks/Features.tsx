'use client';

import Image from 'next/image';

interface Feature {
  title: string;
  description: string;
  imageUrl: string;
}

interface FeaturesProps {
  title?: string;
  description?: string;
  features?: string;
  layout?: 'grid' | 'list';
  columns?: '2' | '3' | '4';
}

const Features = ({
  title = 'Fitur Unggulan',
  description = 'Beberapa fitur terbaik yang kami tawarkan',
  features = '[]',
  layout = 'grid',
  columns = '2',
}: FeaturesProps) => {
  let parsedFeatures: Feature[] = [];

  try {
    parsedFeatures = JSON.parse(features);
    if (!Array.isArray(parsedFeatures)) {
      parsedFeatures = [];
    }
  } catch (error) {
    console.error('Error parsing features:', error);
  }

  const getGridCols = () => {
    switch (columns) {
      case '2':
        return 'md:grid-cols-2';
      case '3':
        return 'md:grid-cols-3';
      case '4':
        return 'md:grid-cols-4';
      default:
        return 'md:grid-cols-2';
    }
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            {title}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {description}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className={`
            ${layout === 'grid' 
              ? `grid gap-x-8 gap-y-16 ${getGridCols()}`
              : 'space-y-10'
            }
          `}>
            {parsedFeatures.map((feature) => (
              <div key={feature.title} className={`relative ${layout === 'list' ? 'flex items-start' : ''}`}>
                <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden rounded-lg">
                  <Image
                    src={feature.imageUrl}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold leading-8 text-gray-900">
                    {feature.title}
                  </p>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features; 