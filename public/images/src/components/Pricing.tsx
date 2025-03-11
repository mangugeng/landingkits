const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "Gratis",
      description: "Sempurna untuk memulai",
      features: [
        "1 Landing Page",
        "Template Dasar",
        "Hosting Gratis",
        "Subdomain Custom",
        "Analitik Dasar",
      ],
      cta: "Mulai Gratis",
      popular: false,
    },
    {
      name: "Pro",
      price: "Rp 199.000",
      period: "/bulan",
      description: "Untuk bisnis yang berkembang",
      features: [
        "10 Landing Page",
        "Semua Template Premium",
        "Hosting Premium",
        "Domain Custom",
        "Analitik Lengkap",
        "A/B Testing",
        "Integrasi Email Marketing",
      ],
      cta: "Mulai 14 Hari Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Solusi untuk perusahaan besar",
      features: [
        "Landing Page Unlimited",
        "Template Custom",
        "Hosting Enterprise",
        "Multiple Domain",
        "Analitik Advanced",
        "Priority Support",
        "API Access",
        "Custom Integration",
      ],
      cta: "Hubungi Kami",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Pilih Paket yang Sesuai
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Harga transparan tanpa biaya tersembunyi
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 bg-white border rounded-2xl shadow-lg ${
                plan.popular
                  ? "border-blue-600 ring-2 ring-blue-600 ring-opacity-50"
                  : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide text-white bg-blue-600 transform">
                  Popular
                </span>
              )}

              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-4 flex items-center justify-center">
                  <span className="text-5xl font-extrabold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="ml-2 text-xl font-medium text-gray-500">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="mt-4 text-gray-500">{plan.description}</p>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-3 text-base text-gray-700">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <button
                  className={`w-full px-6 py-3 text-base font-medium rounded-lg ${
                    plan.popular
                      ? "text-white bg-blue-600 hover:bg-blue-700"
                      : "text-blue-600 bg-blue-50 hover:bg-blue-100"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
