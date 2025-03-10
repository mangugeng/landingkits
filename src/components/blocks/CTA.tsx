interface CTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundColor?: string;
}

const CTA = ({
  title = "Ready to get started?",
  description = "Join thousands of satisfied customers using our platform.",
  buttonText = "Get Started",
  buttonLink = "#",
  backgroundColor = "bg-blue-600",
}: CTAProps) => {
  return (
    <div className={`${backgroundColor} py-12`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg leading-6 text-white opacity-90">
            {description}
          </p>
          <div className="mt-8">
            <a
              href={buttonLink}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA; 