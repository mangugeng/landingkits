import Image from 'next/image';

interface Testimonial {
  content: string;
  author: {
    name: string;
    role: string;
    company: string;
    image: string;
  };
}

interface TestimonialsProps {
  sectionTitle?: string;
  testimonials?: Testimonial[];
  layout?: 'grid' | 'carousel';
}

const defaultTestimonials: Testimonial[] = [
  {
    content: "This platform has transformed how we build landing pages. It&apos;s intuitive, fast, and the results are professional.",
    author: {
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      company: 'TechCorp',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    content: "We&apos;ve seen a 50% increase in conversion rates since using this tool. The customization options are exactly what we needed.",
    author: {
      name: 'Michael Chen',
      role: 'CEO',
      company: 'GrowthStart',
      image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
];

const Testimonials = ({
  sectionTitle = 'What Our Customers Say',
  testimonials = defaultTestimonials,
  layout = 'grid',
}: TestimonialsProps) => {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {sectionTitle}
          </h2>
        </div>
        <div className={`mt-12 ${
          layout === 'grid'
            ? 'grid grid-cols-1 gap-8 lg:grid-cols-2'
            : 'space-y-8'
        }`}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-white p-8 border border-gray-200 rounded-lg"
            >
              <div className="relative">
                <svg
                  className="absolute -top-2 -left-2 h-8 w-8 text-gray-200 transform -translate-x-2 -translate-y-2"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="relative text-lg text-gray-600">
                  {testimonial.content}
                </p>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <Image
                    className="h-10 w-10 rounded-full"
                    src={testimonial.author.image}
                    alt={testimonial.author.name}
                    width={40}
                    height={40}
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {testimonial.author.name}
                  </p>
                  <div className="text-sm text-gray-500">
                    {testimonial.author.role} at {testimonial.author.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials; 