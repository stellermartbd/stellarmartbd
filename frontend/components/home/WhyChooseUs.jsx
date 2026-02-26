import { FaShippingFast, FaShieldAlt, FaHeadset, FaMoneyBillWave, FaUndo, FaStore } from 'react-icons/fa';

const features = [
  {
    icon: FaShippingFast,
    title: 'Fast Delivery',
    description: 'Free shipping on orders over ৳999 with express delivery options available.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: FaShieldAlt,
    title: 'Secure Payment',
    description: '100% secure payment with bKash, Nagad, Visa, MasterCard & more.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: FaHeadsetCog,
    title: '24/7 Support',
    description: 'Round the clock customer support to assist you with any queries.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: FaMoneyBillWave,
    title: 'Best Prices',
    description: 'Competitive prices with regular discounts and special offers.',
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    icon: FaUndo,
    title: 'Easy Returns',
    description: 'Hassle-free 7-day return policy on most products.',
    color: 'bg-red-100 text-red-600',
  },
  {
    icon: FaStore,
    title: 'Genuine Products',
    description: '100% authentic products directly from authorized distributors.',
    color: 'bg-indigo-100 text-indigo-600',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-title">Why Choose StellarMartBD?</h2>
          <p className="section-subtitle">We provide the best shopping experience</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex gap-4 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <feature.icon size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

}
