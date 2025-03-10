interface FeaturesProps {
  sectionTitle?: string;
  sectionDescription?: string;
  layout?: 'grid' | 'list';
  features?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
}

const defaultFeatures = [
  {
    title: 'Easy to use',
    description: 'Our platform is designed to be intuitive and user-friendly.',
    icon: '⚡️'
  },
  {
    title: 'Customizable',
    description: 'Customize every aspect of your landing page to match your brand.',
    icon: '🎨'
  },
  {
    title: 'Fast & Reliable',
    description: 'Built on modern technology for maximum performance.',
    icon: '🚀'
  }
];

const Features = ({
  sectionTitle = "Features",
  sectionDescription = "Everything you need to create amazing landing pages",
  layout = 'grid',
  features = defaultFeatures,
}: FeaturesProps) => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
            {sectionTitle}
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {sectionDescription}
          </p>
        </div>

        <div className={`mt-10 ${layout === 'list' ? 'space-y-10' : ''}`}>
          <dl className={layout === 'grid' 
            ? 'space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10'
            : 'space-y-10'
          }>
            {features.map((feature) => (
              <div key={feature.title} className={`relative ${layout === 'list' ? 'flex items-start' : ''}`}>
                <dt>
                  <div className={`${layout === 'list' ? 'mt-1' : 'absolute'} flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white`}>
                    {feature.icon}
                  </div>
                  <p className={`${layout === 'list' ? 'ml-16' : 'ml-16'} text-lg leading-6 font-medium text-gray-900`}>
                    {feature.title}
                  </p>
                </dt>
                <dd className={`${layout === 'list' ? 'ml-16' : 'mt-2 ml-16'} text-base text-gray-500`}>
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features; 