interface NewsletterProps {
  title?: string;
  description?: string;
  buttonText?: string;
  placeholder?: string;
  layout?: 'center' | 'left';
  background?: 'white' | 'gray' | 'blue';
}

const Newsletter = ({
  title = "Subscribe to our newsletter",
  description = "Get the latest updates and news delivered to your inbox.",
  buttonText = "Subscribe",
  placeholder = "Enter your email",
  layout = 'center',
  background = 'white',
}: NewsletterProps) => {
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
        <div className={layout === 'center' ? 'text-center' : ''}>
          <h2 className={`text-3xl font-extrabold ${textColors[background]} sm:text-4xl`}>
            {title}
          </h2>
          <p className={`mt-3 ${layout === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'} text-xl ${descriptionColors[background]}`}>
            {description}
          </p>
          <form className={`mt-8 ${layout === 'center' ? 'sm:flex sm:justify-center' : 'sm:flex'}`}>
            <div className={`${layout === 'center' ? 'min-w-0 max-w-lg flex-1' : 'min-w-0 flex-1'}`}>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder={placeholder}
                className="block w-full px-4 py-3 text-base text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className={`mt-3 sm:mt-0 ${layout === 'center' ? 'sm:ml-3' : 'sm:flex-shrink-0 sm:ml-3'}`}>
              <button
                type="submit"
                className={`block w-full px-4 py-3 font-medium rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm ${
                  background === 'blue'
                    ? 'text-blue-600 bg-white hover:bg-gray-50 focus:ring-white'
                    : 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                }`}
              >
                {buttonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter; 