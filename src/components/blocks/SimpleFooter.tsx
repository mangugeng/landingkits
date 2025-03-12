'use client';

import Image from 'next/image';

interface Link {
  label: string;
  link: string;
}

interface SimpleFooterProps {
  logo?: string;
  copyrightText?: string;
  links?: string;
}

const defaultLinks: Link[] = [
  { label: 'About', link: '#' },
  { label: 'Blog', link: '#' },
  { label: 'Privacy', link: '#' },
  { label: 'Terms', link: '#' },
];

const SimpleFooter = ({
  logo = '/logo.svg',
  copyrightText = '© 2024 Your Company, Inc. All rights reserved.',
  links = JSON.stringify(defaultLinks),
}: SimpleFooterProps) => {
  let parsedLinks: Link[] = [];

  try {
    parsedLinks = JSON.parse(links);
    if (!Array.isArray(parsedLinks)) {
      parsedLinks = defaultLinks;
    }
  } catch (error) {
    console.error('Error parsing footer links:', error);
    parsedLinks = defaultLinks;
  }

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {parsedLinks.map((link) => (
            <a
              key={link.label}
              href={link.link}
              className="text-gray-500 hover:text-gray-600"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          {logo && (
            <div className="flex justify-center md:justify-start">
              <Image
                src={logo}
                alt="Company Logo"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
            </div>
          )}
          <p className="mt-8 text-center text-sm leading-5 text-gray-500 md:text-left">
            {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter; 