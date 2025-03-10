interface PricingProps {
  sectionTitle?: string;
  sectionDescription?: string;
  style?: 'light' | 'dark';
  tiers?: Array<{
    name: string;
    price: string;
    description: string;
    features: string[];
    buttonText?: string;
    buttonLink?: string;
    highlighted?: boolean;
  }>;
}

const defaultTiers = [
  {
    name: 'Hobby',
    price: '$0',
    description: 'Perfect for side projects',
    features: [
      '1 landing page',
      'Basic components',
      'Community support',
    ],
    buttonText: 'Start for free',
    buttonLink: '#',
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'For professional creators',
    features: [
      'Unlimited landing pages',
      'All components',
      'Priority support',
      'Custom domain',
    ],
    buttonText: 'Start free trial',
    buttonLink: '#',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    description: 'For large teams',
    features: [
      'Everything in Pro',
      'Custom branding',
      'Dedicated support',
      'Analytics',
    ],
    buttonText: 'Contact sales',
    buttonLink: '#',
  },
];

const Pricing = ({
  sectionTitle = "Pricing Plans",
  sectionDescription = "Choose the perfect plan for your needs",
  style = 'light',
  tiers = defaultTiers,
}: PricingProps) => {
  const bgColor = style === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const textColor = style === 'dark' ? 'text-white' : 'text-gray-900';
  const textColorSecondary = style === 'dark' ? 'text-gray-300' : 'text-gray-500';
  const borderColor = style === 'dark' ? 'border-gray-700' : 'border-gray-200';

  return (
    <div className={`${bgColor} py-12`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className={`text-3xl font-extrabold ${textColor} sm:text-4xl`}>
            {sectionTitle}
          </h2>
          <p className={`mt-3 max-w-2xl mx-auto text-xl ${textColorSecondary} sm:mt-4`}>
            {sectionDescription}
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-lg shadow-sm divide-y ${borderColor} ${
                tier.highlighted
                  ? 'border-2 border-blue-500 relative'
                  : `border ${borderColor}`
              } ${style === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 right-0 left-0 mx-auto w-32 rounded-full px-3 py-1 text-sm leading-5 text-white text-center bg-blue-500 transform -translate-y-1/2">
                  Most Popular
                </div>
              )}
              <div className={`p-6 ${style === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-t-lg`}>
                <h3 className={`text-lg leading-6 font-medium ${textColor}`}>
                  {tier.name}
                </h3>
                <p className="mt-4">
                  <span className={`text-4xl font-extrabold ${textColor}`}>
                    {tier.price}
                  </span>
                  <span className={`text-base font-medium ${textColorSecondary}`}>
                    /month
                  </span>
                </p>
                <p className={`mt-1 text-sm ${textColorSecondary}`}>{tier.description}</p>
                <a
                  href={tier.buttonLink}
                  className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                    tier.highlighted
                      ? 'text-white bg-blue-600 hover:bg-blue-700'
                      : style === 'dark'
                      ? 'text-white bg-gray-700 hover:bg-gray-600'
                      : 'text-blue-700 bg-blue-50 hover:bg-blue-100'
                  }`}
                >
                  {tier.buttonText}
                </a>
              </div>
              <div className={`px-6 pt-6 pb-8 ${style === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-b-lg`}>
                <h4 className={`text-sm font-medium ${textColor} tracking-wide uppercase`}>
                  What's included
                </h4>
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <svg
                        className={`flex-shrink-0 h-5 w-5 ${style === 'dark' ? 'text-green-400' : 'text-green-500'}`}
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
                      <span className={`text-sm ${textColorSecondary}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing; 