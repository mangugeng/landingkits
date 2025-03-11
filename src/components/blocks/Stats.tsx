'use client';

import { useEffect, useState, useRef } from 'react';

interface Stat {
  label: string;
  value: string;
  description?: string;
}

interface StatsProps {
  title?: string;
  description?: string;
  stats?: string;
  layout?: 'grid' | 'row';
  background?: 'white' | 'gray' | 'blue';
}

const defaultStats: Stat[] = [
  {
    label: 'Total Customers',
    value: '10000+',
    description: 'Trusted by businesses worldwide',
  },
  {
    label: 'Revenue Generated',
    value: '$100M+',
    description: 'For our customers in 2023',
  },
  {
    label: 'Success Rate',
    value: '99.9%',
    description: 'System uptime and reliability',
  },
  {
    label: 'Countries',
    value: '50+',
    description: 'Global presence and support',
  },
];

const useIntersectionObserver = (
  elementRef: React.RefObject<Element>,
  { threshold = 0, root = null, rootMargin = '0%' }: IntersectionObserverInit
): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    const element = elementRef.current;

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [elementRef, threshold, root, rootMargin]);

  return isVisible;
};

const AnimatedValue = ({ value }: { value: string }) => {
  const [displayValue, setDisplayValue] = useState('0');
  const elementRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(elementRef, { threshold: 0.1 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      
      const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
      const prefix = value.match(/^\D+/) || '';
      const suffix = value.match(/\D+$/) || '';
      
      let start = 0;
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = numericValue / steps;
      const stepDuration = duration / steps;
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= numericValue) {
          setDisplayValue(`${prefix}${numericValue}${suffix}`);
          clearInterval(timer);
        } else {
          setDisplayValue(`${prefix}${Math.floor(start)}${suffix}`);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isVisible, value]);

  return <div ref={elementRef}>{displayValue}</div>;
};

const Stats = ({
  title = 'Statistik Kami',
  description = 'Pencapaian kami dalam angka',
  stats = '[]',
  layout = 'grid',
  background = 'white',
}: StatsProps) => {
  let parsedStats: Stat[] = [];

  try {
    parsedStats = JSON.parse(stats);
    if (!Array.isArray(parsedStats)) {
      parsedStats = [];
    }
  } catch (error) {
    console.error('Error parsing stats:', error);
  }

  const getBackgroundColor = () => {
    switch (background) {
      case 'gray':
        return 'bg-gray-50';
      case 'blue':
        return 'bg-blue-50';
      default:
        return 'bg-white';
    }
  };

  return (
    <div className={`${getBackgroundColor()} py-24 sm:py-32`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg leading-8 text-gray-600">
              {description}
            </p>
          )}
        </div>
        <dl
          className={`mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 sm:mt-20 ${
            layout === 'grid'
              ? 'sm:grid-cols-2 lg:max-w-none lg:grid-cols-4'
              : 'lg:max-w-none lg:grid-cols-1'
          }`}
        >
          {parsedStats.map((stat) => (
            <div
              key={stat.label}
              className={`flex flex-col ${
                layout === 'row'
                  ? 'lg:flex-row lg:items-baseline lg:gap-x-16'
                  : ''
              }`}
            >
              <dt className="text-base leading-7 text-gray-600">{stat.label}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                <AnimatedValue value={stat.value} />
              </dd>
              {stat.description && (
                <p className="mt-2 text-base leading-7 text-gray-600">
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default Stats; 