interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  sectionTitle?: string;
  sectionDescription?: string;
  items?: FAQItem[];
  layout?: 'grid' | 'list';
  background?: 'white' | 'gray';
}

const defaultItems = [
  {
    question: "What's included in the free plan?",
    answer: "The free plan includes all the basic features you need to get started, including one landing page, basic components, and community support.",
  },
  {
    question: "How do I upgrade my plan?",
    answer: "You can upgrade your plan at any time from your account settings. Choose the plan that best fits your needs and enter your payment information.",
  },
  {
    question: "Can I cancel my subscription?",
    answer: "Yes, you can cancel your subscription at any time. You'll continue to have access to your plan until the end of your billing period.",
  },
  {
    question: "Do you offer custom solutions?",
    answer: "Yes, we offer custom solutions for enterprise customers. Contact our sales team to learn more about our enterprise plans.",
  },
  {
    question: "How do I get support?",
    answer: "We offer support through our community forum, email, and live chat. Enterprise customers get priority support with dedicated response times.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans. Enterprise customers can also pay by invoice.",
  },
];

const FAQ = ({
  sectionTitle = "Frequently Asked Questions",
  sectionDescription = "Find answers to common questions about our platform",
  items = defaultItems,
  layout = 'grid',
  background = 'white',
}: FAQProps) => {
  const bgColor = background === 'white' ? 'bg-white' : 'bg-gray-50';

  return (
    <div className={`${bgColor} py-12 sm:py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {sectionTitle}
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            {sectionDescription}
          </p>
        </div>
        <div className={`mt-12 ${
          layout === 'grid'
            ? 'grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'
            : 'max-w-3xl mx-auto space-y-8'
        }`}>
          {items.map((item, index) => (
            <div
              key={index}
              className={`${background === 'white' ? 'bg-gray-50' : 'bg-white'} rounded-lg p-6 shadow-sm`}
            >
              <h3 className="text-lg font-medium text-gray-900">
                {item.question}
              </h3>
              <p className="mt-2 text-base text-gray-500">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ; 