interface Testimonial {
  content: string;
  author: string;
  role: string;
  company: string;
  image?: string;
}

interface TestimonialsProps {
  sectionTitle?: string;
  layout?: 'grid' | 'carousel';
  testimonials?: Array<{
    content: string;
    author: string;
    role: string;
    company: string;
    image?: string;
  }>;
}

const defaultTestimonials = [
  {
    content: "This platform has transformed how we create landing pages. It's incredibly easy to use and the results are stunning.",
    author: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    content: "The best landing page builder I've ever used. The components are beautiful and the drag-and-drop interface is seamless.",
    author: "Michael Chen",
    role: "Founder",
    company: "StartupX",
    image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    content: "We've seen a 50% increase in conversion rates since switching to this platform. The customization options are endless.",
    author: "Emily Davis",
    role: "Growth Lead",
    company: "ScaleUp",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];

const Testimonials = ({
  sectionTitle = "What our customers say",
  layout = 'grid',
  testimonials = defaultTestimonials,
}: TestimonialsProps) => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {sectionTitle}
          </h2>
        </div>
        {layout === 'grid' ? (
          <div className="mt-12 space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author} className="lg:col-span-1">
                <div className="h-full flex flex-col justify-between bg-white rounded-lg shadow-lg overflow-hidden p-8">
                  <blockquote>
                    <p className="text-lg text-gray-500">
                      "{testimonial.content}"
                    </p>
                  </blockquote>
                  <div className="mt-8 flex items-center">
                    {testimonial.image && (
                      <div className="flex-shrink-0">
                        <img
                          className="h-12 w-12 rounded-full"
                          src={testimonial.image}
                          alt=""
                        />
                      </div>
                    )}
                    <div className="ml-4">
                      <div className="text-base font-medium text-gray-900">
                        {testimonial.author}
                      </div>
                      <div className="text-base text-gray-500">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 relative">
            <div className="flex overflow-x-auto snap-x snap-mandatory -mx-4 sm:-mx-6 lg:-mx-8 pb-4">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.author}
                  className="flex-none w-full sm:w-1/2 lg:w-1/3 px-4 sm:px-6 lg:px-8 snap-start"
                >
                  <div className="h-full flex flex-col justify-between bg-white rounded-lg shadow-lg overflow-hidden p-8">
                    <blockquote>
                      <p className="text-lg text-gray-500">
                        "{testimonial.content}"
                      </p>
                    </blockquote>
                    <div className="mt-8 flex items-center">
                      {testimonial.image && (
                        <div className="flex-shrink-0">
                          <img
                            className="h-12 w-12 rounded-full"
                            src={testimonial.image}
                            alt=""
                          />
                        </div>
                      )}
                      <div className="ml-4">
                        <div className="text-base font-medium text-gray-900">
                          {testimonial.author}
                        </div>
                        <div className="text-base text-gray-500">
                          {testimonial.role} at {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonials; 