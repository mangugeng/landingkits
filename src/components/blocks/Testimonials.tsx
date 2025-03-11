'use client';

import Image from 'next/image';

interface Testimonial {
  name: string;
  text: string;
  role: string;
  company: string;
  imageUrl: string;
}

interface TestimonialsProps {
  title?: string;
  testimonials?: string;
  layout?: 'grid' | 'carousel';
}

const Testimonials = ({
  title = 'Testimoni Pelanggan',
  testimonials = '[]',
  layout = 'grid',
}: TestimonialsProps) => {
  let parsedTestimonials: Testimonial[] = [];
  
  try {
    parsedTestimonials = JSON.parse(testimonials);
    if (!Array.isArray(parsedTestimonials)) {
      parsedTestimonials = [];
    }
  } catch (error) {
    console.error('Error parsing testimonials:', error);
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
        </div>
        <div className={`mx-auto mt-16 ${layout === 'grid' ? 'grid gap-8 sm:grid-cols-2 lg:grid-cols-3' : 'space-y-8'}`}>
          {parsedTestimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="relative bg-white p-6 shadow-sm ring-1 ring-gray-900/5 rounded-lg"
            >
              <div className="flex items-center gap-x-4 mb-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.imageUrl}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm font-semibold leading-6 text-blue-600">
                    {testimonial.role} di {testimonial.company}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-6">{testimonial.text}</p>
              <svg
                className="absolute top-6 right-6 h-8 w-8 fill-slate-200"
                viewBox="0 0 24 24"
              >
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials; 