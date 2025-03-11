interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  highlighted?: boolean;
}

interface PricingProps {
  sectionTitle?: string;
  sectionDescription?: string;
  tiers?: PricingTier[];
  style?: 'light' | 'dark';
}

const defaultTiers: PricingTier[] = [
  {
    name: 'Basic',
    price: '$9',
    description: 'Everything you need to get started',
    features: [
      '1 landing page',
      'Basic components',
      'Community support',
      'Monthly updates'
    ],
    buttonText: 'Start for free',
    buttonLink: '#',
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'Best for growing businesses',
    features: [
      'Unlimited landing pages',
      'All components',
      'Priority support',
      'Weekly updates',
      'Custom domains'
    ],
    buttonText: 'Get started',
    buttonLink: '#',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    description: 'For large organizations',
    features: [
      'Everything in Pro',
      'Custom branding',
      'Dedicated support',
      'Daily backups',
      'Advanced analytics'
    ],
    buttonText: 'Contact sales',
    buttonLink: '#',
  },
];

const Pricing = ({
  sectionTitle = 'Simple, transparent pricing',
  sectionDescription = 'Choose the plan that&apos;s right for you',
  tiers = defaultTiers,
  style = 'light',
}: PricingProps) => {
  const bgColor = style === 'light' ? 'bg-white' : 'bg-gray-900';
  const textColor = style === 'light' ? 'text-gray-900' : 'text-white';
  const descriptionColor = style === 'light' ? 'text-gray-500' : 'text-gray-300';

  return (
    <div className={`${bgColor} py-12 sm:py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className={`text-3xl font-extrabold ${textColor} sm:text-4xl`}>
            {sectionTitle}
          </h2>
          <p className={`mt-3 max-w-2xl mx-auto text-xl ${descriptionColor}`}>
            {sectionDescription}
          </p>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`${
                tier.highlighted
                  ? 'border-2 border-blue-500 shadow-xl'
                  : 'border border-gray-200'
              } rounded-lg p-8 ${style === 'light' ? 'bg-white' : 'bg-gray-800'}`}
            >
              <div>
                <h3
                  className={`text-2xl font-semibold ${textColor}`}
                >
                  {tier.name}
                </h3>
                {tier.highlighted && (
                  <p className="absolute top-0 -translate-y-1/2 bg-blue-500 text-white px-3 py-0.5 text-sm font-semibold rounded-full transform">
                    Popular
                  </p>
                )}
                <p className="mt-4 text-sm text-gray-500">{tier.description}</p>
                <p className={`mt-8 ${textColor}`}>
                  <span className="text-4xl font-extrabold">{tier.price}</span>
                  <span className={`text-base font-medium ${descriptionColor}`}>/mo</span>
                </p>
                <ul className="mt-8 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className={`ml-3 ${descriptionColor}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={tier.buttonLink}
                  className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                    tier.highlighted
                      ? 'text-white bg-blue-600 hover:bg-blue-700'
                      : style === 'light'
                      ? 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                      : 'text-blue-300 bg-blue-900 hover:bg-blue-800'
                  }`}
                >
                  {tier.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing; 