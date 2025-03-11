import Image from 'next/image';

interface NavItem {
  label: string;
  link: string;
}

interface NavbarProps {
  logo?: string;
  logoAlt?: string;
  menuItems?: string;
  buttonText?: string;
  buttonLink?: string;
  isPreview?: boolean;
}

const Navbar = ({
  logo = '/images/logo.svg',
  logoAlt = 'LandingKits Logo',
  menuItems = '[]',
  buttonText = 'Mulai Sekarang',
  buttonLink = '#',
  isPreview = false,
}: NavbarProps) => {
  let items: NavItem[] = [];

  try {
    items = JSON.parse(menuItems);
    if (!Array.isArray(items)) {
      items = [];
    }
  } catch (error) {
    console.error('Error parsing menuItems:', error);
  }

  // Jika bukan mode preview, render navbar dengan posisi relative
  const navClassName = isPreview 
    ? "bg-white fixed w-full z-50 top-0 left-0 border-b border-gray-200" 
    : "bg-white w-full border-b border-gray-200";

  return (
    <nav className={navClassName}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Image
              src={logo}
              alt={logoAlt}
              width={150}
              height={32}
              className="h-8 w-auto text-blue-600"
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {items.map((item) => (
              <a
                key={item.link}
                href={item.link}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
            <a
              href={buttonLink}
              className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {buttonText}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Buka menu utama</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div className="hidden md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {items.map((item) => (
            <a
              key={item.link}
              href={item.link}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              {item.label}
            </a>
          ))}
          <a
            href={buttonLink}
            className="block w-full px-5 py-3 text-center font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 