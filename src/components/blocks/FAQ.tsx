'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  sectionTitle?: string;
  sectionDescription?: string;
  items?: string;
  layout?: 'grid' | 'list';
  background?: 'white' | 'gray';
}

const defaultItems: FAQItem[] = [
  {
    question: 'Is there a free plan available?',
    answer:
      'Yes, we offer a free plan that includes basic features. You can use it as long as you want with no obligation to upgrade.',
  },
  {
    question: 'Can I change my plan later?',
    answer:
      'Absolutely! You can upgrade or downgrade your plan at any time. Changes to billing will be prorated.',
  },
  {
    question: 'How do I cancel my subscription?',
    answer:
      'You can cancel your subscription at any time from your account settings. Once cancelled, you\'ll have access until the end of your billing period.',
  },
  {
    question: 'Do you offer custom solutions?',
    answer:
      'Yes, we provide custom solutions for enterprises. Contact our sales team to discuss your specific needs.',
  },
  {
    question: 'What kind of support do you offer?',
    answer:
      'We offer 24/7 email support for all plans, and priority phone support for premium plans. Our average response time is under 2 hours.',
  },
  {
    question: 'Which payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans.',
  },
];

const FAQ = ({
  sectionTitle = 'Frequently asked questions',
  sectionDescription = 'Find answers to common questions about our services.',
  items = JSON.stringify(defaultItems),
  layout = 'grid',
  background = 'white',
}: FAQProps) => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  let parsedItems: FAQItem[] = [];

  try {
    parsedItems = JSON.parse(items);
    if (!Array.isArray(parsedItems)) {
      parsedItems = defaultItems;
    }
  } catch (error) {
    console.error('Error parsing FAQ items:', error);
    parsedItems = defaultItems;
  }

  const toggleItem = (index: number) => {
    setOpenItems((current) =>
      current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index]
    );
  };

  const isItemOpen = (index: number) => openItems.includes(index);

  return (
    <div
      className={`${
        background === 'gray' ? 'bg-gray-50' : 'bg-white'
      } py-24 sm:py-32`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {sectionTitle}
          </h2>
          {sectionDescription && (
            <p className="mt-4 text-lg leading-8 text-gray-600">
              {sectionDescription}
            </p>
          )}
        </div>
        <div
          className={`mx-auto mt-16 max-w-4xl ${
            layout === 'grid'
              ? 'grid grid-cols-1 gap-8 sm:grid-cols-2'
              : 'space-y-8'
          }`}
        >
          {parsedItems.map((item, index) => (
            <div
              key={index}
              className={`${
                background === 'gray' ? 'bg-white' : 'bg-gray-50'
              } rounded-2xl px-6 py-4`}
            >
              <button
                onClick={() => toggleItem(index)}
                className="flex w-full items-start justify-between text-left"
              >
                <span className="text-base font-semibold leading-7 text-gray-900">
                  {item.question}
                </span>
                <span className="ml-6 flex h-7 items-center">
                  <svg
                    className={`h-6 w-6 transform text-gray-600 transition-transform duration-200 ${
                      isItemOpen(index) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </button>
              <div
                className={`mt-2 overflow-hidden transition-all duration-200 ${
                  isItemOpen(index) ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <p className="text-base leading-7 text-gray-600">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ; 