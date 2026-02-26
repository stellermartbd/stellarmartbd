'use client';

import { 
  FaSearch, FaRoute, FaUsers, FaChartLine, FaPercentage
} from 'react-icons/fa';

export default function IntelligencePage() {
  const cards = [
    {
      title: 'Search Insights',
      description: 'Analyze customer search behavior and trends',
      icon: FaSearch,
      color: 'blue',
      href: '/admin/intelligence/search-insights'
    },
    {
      title: 'Customer Journey',
      description: 'Track how customers navigate through your store',
      icon: FaRoute,
      color: 'purple',
      href: '/admin/intelligence/customer-journey'
    },
    {
      title: 'Retention',
      description: 'Track customer retention and loyalty metrics',
      icon: FaUsers,
      color: 'emerald',
      href: '/admin/intelligence/retention'
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
    purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
    emerald: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100',
    amber: 'bg-amber-50 text-amber-600 hover:bg-amber-100',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Intelligence</h1>
          <p className="text-gray-500 mt-1">Analytics and insights for better decision making</p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <a
            key={index}
            href={card.href}
            className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div className={`w-14 h-14 rounded-xl ${colorClasses[card.color]} flex items-center justify-center mb-4 transition-colors`}>
              <card.icon className="text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {card.title}
            </h3>
            <p className="text-gray-500">
              {card.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
