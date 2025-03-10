interface Stat {
  label: string;
  value: string;
  description?: string;
}

interface StatsProps {
  sectionTitle?: string;
  sectionDescription?: string;
  stats?: Stat[];
  layout?: 'grid' | 'row';
  background?: 'white' | 'gray' | 'blue';
}

const defaultStats = [
  {
    label: 'Total Customers',
    value: '35K+',
    description: 'Active users worldwide',
  },
  {
    label: 'Revenue Generated',
    value: '$20M+',
    description: 'For our customers',
  },
  {
    label: 'Success Rate',
    value: '99.9%',
    description: 'Customer satisfaction',
  },
  {
    label: 'Countries',
    value: '150+',
    description: 'Global presence',
  },
];

const Stats = ({
  sectionTitle = 'Our Impact in Numbers',
  sectionDescription = 'We've helped thousands of companies achieve their goals',
  stats = defaultStats,
  layout = 'grid',
  background = 'white',
}: StatsProps) => {
  const bgColors = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    blue: 'bg-blue-700',
  };

  const textColors = {
    white: 'text-gray-900',
    gray: 'text-gray-900',
    blue: 'text-white',
  };

  const descriptionColors = {
    white: 'text-gray-500',
    gray: 'text-gray-500',
    blue: 'text-blue-100',
  };

  return (
    <div className={`${bgColors[background]} py-12 sm:py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className={`text-3xl font-extrabold ${textColors[background]} sm:text-4xl`}>
            {sectionTitle}
          </h2>
          <p className={`mt-3 max-w-2xl mx-auto text-xl ${descriptionColors[background]}`}>
            {sectionDescription}
          </p>
        </div>
        <div className={`mt-10 ${
          layout === 'grid'
            ? 'grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'
            : 'flex flex-wrap justify-center gap-8'
        }`}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`${layout === 'row' ? 'flex-1 min-w-[200px]' : ''} px-4 text-center`}
            >
              <p className={`text-4xl font-extrabold ${textColors[background]}`}>
                {stat.value}
              </p>
              <p className={`mt-2 text-lg font-medium ${textColors[background]}`}>
                {stat.label}
              </p>
              {stat.description && (
                <p className={`mt-1 text-base ${descriptionColors[background]}`}>
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats; 