'use client';

import { useState } from 'react';

interface NewsletterProps {
  title?: string;
  description?: string;
  buttonText?: string;
  placeholder?: string;
  layout?: 'center' | 'left';
  background?: 'white' | 'gray' | 'blue';
}

const Newsletter = ({
  title = 'Stay updated with our latest news',
  description = 'Get the latest updates about our products and services delivered directly to your inbox.',
  buttonText = 'Subscribe',
  placeholder = 'Enter your email',
  layout = 'center',
  background = 'white',
}: NewsletterProps) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setErrorMessage('Email is required');
      setStatus('error');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // Here you would typically make an API call to your newsletter service
      // For demo purposes, we'll simulate a successful subscription
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

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
    <div className={`py-16 sm:py-24 ${getBackgroundColor()}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className={`${
            layout === 'center'
              ? 'mx-auto text-center'
              : 'lg:grid lg:grid-cols-2 lg:gap-8'
          }`}
        >
          <div className={layout === 'center' ? 'mx-auto max-w-xl' : ''}>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              {description}
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className={`mt-10 ${layout === 'center' ? 'sm:mx-auto sm:max-w-lg' : ''}`}
          >
            <div className="flex flex-col gap-4 sm:flex-row">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                  status === 'error'
                    ? 'ring-red-300 focus:ring-red-500'
                    : 'ring-gray-300 focus:ring-blue-500'
                } focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                placeholder={placeholder}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`flex-none rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  status === 'loading'
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600'
                }`}
              >
                {status === 'loading' ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </div>
                ) : (
                  buttonText
                )}
              </button>
            </div>
            {status === 'error' && (
              <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
            )}
            {status === 'success' && (
              <p className="mt-2 text-sm text-green-600">
                Thank you for subscribing!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter; 