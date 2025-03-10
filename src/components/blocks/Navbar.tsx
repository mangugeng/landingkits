interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  logo?: string;
  items?: NavItem[];
  buttonText?: string;
  buttonLink?: string;
  transparent?: boolean;
}

const defaultItems: NavItem[] = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = ({
  logo = '/logo.svg',
  items = defaultItems,
  buttonText = 'Get Started',
  buttonLink = '#',
  transparent = false,
}: NavbarProps) => {
  return (
    <nav className={`${
      transparent ? 'bg-transparent' : 'bg-white'
    } fixed w-full z-50 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img className="h-8 w-auto" src={logo} alt="Logo" />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    transparent
                      ? 'text-white hover:text-gray-200'
                      : 'text-gray-900 hover:text-gray-700'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <a
              href={buttonLink}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                transparent
                  ? 'text-white bg-white/20 hover:bg-white/30'
                  : 'text-white bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {buttonText}
            </a>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                transparent ? 'text-white' : 'text-gray-400'
              } hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500`}
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
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
      <div className="sm:hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`block pl-3 pr-4 py-2 text-base font-medium ${
                transparent
                  ? 'text-white hover:text-gray-200'
                  : 'text-gray-900 hover:text-gray-700'
              }`}
            >
              {item.label}
            </a>
          ))}
          <div className="mt-4 px-3">
            <a
              href={buttonLink}
              className={`block text-center px-4 py-2 border border-transparent text-base font-medium rounded-md ${
                transparent
                  ? 'text-white bg-white/20 hover:bg-white/30'
                  : 'text-white bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 