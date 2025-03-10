interface FooterLink {
  name: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  copyrightText?: string;
  layout?: 'simple' | 'complex';
  logo?: string;
  columns?: Array<{
    title: string;
    links: Array<{
      name: string;
      href: string;
    }>;
  }>;
  socialLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultColumns = [
  {
    title: 'Product',
    links: [
      { name: 'Features', href: '#' },
      { name: 'Pricing', href: '#' },
      { name: 'Templates', href: '#' },
      { name: 'Customers', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentation', href: '#' },
      { name: 'Help Center', href: '#' },
      { name: 'Guides', href: '#' },
      { name: 'API Status', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
      { name: 'Security', href: '#' },
    ],
  },
];

const defaultSocialLinks = [
  { name: 'Facebook', href: '#' },
  { name: 'Twitter', href: '#' },
  { name: 'Instagram', href: '#' },
  { name: 'GitHub', href: '#' },
  { name: 'YouTube', href: '#' },
];

const Footer = ({
  copyrightText = '© 2024 Your Company, Inc. All rights reserved.',
  layout = 'complex',
  logo = 'Your Logo',
  columns = defaultColumns,
  socialLinks = defaultSocialLinks,
}: FooterProps) => {
  if (layout === 'simple') {
    return (
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="text-gray-500 text-xl font-bold">{logo}</div>
            <div className="flex space-x-6">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{item.name}</span>
                  <div className="h-6 w-6">{item.name[0]}</div>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 text-center">
              {copyrightText}
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="text-gray-500 text-xl font-bold">{logo}</div>
            <div className="flex space-x-6">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{item.name}</span>
                  <div className="h-6 w-6">{item.name[0]}</div>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {columns.slice(0, 2).map((column) => (
                <div key={column.title}>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    {column.title}
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {column.links.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {columns.slice(2).map((column) => (
                <div key={column.title}>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    {column.title}
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {column.links.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 