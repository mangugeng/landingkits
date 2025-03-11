'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Review {
  id: number;
  content: string;
  author: {
    name: string;
    role: string;
    company: string;
    image: string;
  };
}

interface ReviewsProps {
  sectionTitle?: string;
  sectionDescription?: string;
  layout?: 'grid' | 'carousel';
  reviews?: Review[];
}

const defaultReviews: Review[] = [
  {
    id: 1,
    content:
      'Landingkits has transformed how we create landing pages. The drag-and-drop interface is intuitive, and the components are beautifully designed. It has saved us countless hours of development time.',
    author: {
      name: 'Sarah Chen',
      role: 'Marketing Director',
      company: 'TechCorp',
      image: '/reviews/avatar1.jpg',
    },
  },
  {
    id: 2,
    content:
      'As a startup founder, I needed a quick way to test different landing page variations. Landingkits made it possible to create professional-looking pages in minutes, helping us validate our ideas faster.',
    author: {
      name: 'Michael Rodriguez',
      role: 'CEO',
      company: 'StartupX',
      image: '/reviews/avatar2.jpg',
    },
  },
  {
    id: 3,
    content:
      'The customization options are fantastic. We can maintain our brand identity while leveraging pre-built components. The responsive design works flawlessly across all devices.',
    author: {
      name: 'Emily Johnson',
      role: 'Design Lead',
      company: 'CreativeAgency',
      image: '/reviews/avatar3.jpg',
    },
  },
  {
    id: 4,
    content:
      'Integration with our existing tech stack was seamless. The export options and clean code output made it easy for our development team to take over when needed.',
    author: {
      name: 'David Kim',
      role: 'CTO',
      company: 'WebSolutions',
      image: '/reviews/avatar4.jpg',
    },
  },
];

const Reviews = ({
  sectionTitle = 'What Our Customers Say',
  sectionDescription = 'Hear from our satisfied customers about their experience with our platform',
  layout = 'grid',
  reviews = defaultReviews,
}: ReviewsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((current) =>
      current === reviews.length - 1 ? 0 : current + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((current) =>
      current === 0 ? reviews.length - 1 : current - 1
    );
  };

  if (layout === 'carousel') {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {sectionTitle}
            </h2>
            {sectionDescription && (
              <p className="mt-4 text-lg leading-8 text-gray-600">
                {sectionDescription}
              </p>
            )}
          </div>
          <div className="relative mt-16">
            <div className="overflow-hidden">
              <div
                className="transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${activeIndex * 100}%)`,
                }}
              >
                <div className="flex">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="w-full flex-shrink-0 px-4 md:px-8"
                    >
                      <figure className="relative isolate rounded-2xl bg-white p-6 shadow-xl shadow-gray-900/10">
                        <blockquote className="text-gray-900">
                          <p className="text-lg font-semibold leading-7">
                            "{review.content}"
                          </p>
                        </blockquote>
                        <figcaption className="mt-6 flex items-center gap-x-4">
                          <Image
                            src={review.author.image}
                            alt={review.author.name}
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-full bg-gray-50"
                          />
                          <div>
                            <div className="font-semibold">
                              {review.author.name}
                            </div>
                            <div className="text-gray-600">
                              {review.author.role} at {review.author.company}
                            </div>
                          </div>
                        </figcaption>
                      </figure>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 rounded-full bg-white p-2 shadow-lg"
            >
              <svg
                className="h-5 w-5 text-gray-900"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full bg-white p-2 shadow-lg"
            >
              <svg
                className="h-5 w-5 text-gray-900"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {sectionTitle}
          </h2>
          {sectionDescription && (
            <p className="mt-4 text-lg leading-8 text-gray-600">
              {sectionDescription}
            </p>
          )}
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {reviews.map((review) => (
            <figure
              key={review.id}
              className="relative isolate rounded-2xl bg-white p-6 shadow-xl shadow-gray-900/10"
            >
              <blockquote className="text-gray-900">
                <p className="text-lg font-semibold leading-7">
                  "{review.content}"
                </p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-x-4">
                <Image
                  src={review.author.image}
                  alt={review.author.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full bg-gray-50"
                />
                <div>
                  <div className="font-semibold">{review.author.name}</div>
                  <div className="text-gray-600">
                    {review.author.role} at {review.author.company}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews; 