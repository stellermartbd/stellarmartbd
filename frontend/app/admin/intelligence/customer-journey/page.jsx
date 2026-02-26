'use client';

import { useState } from 'react';
import { 
  FaRoute, FaSearch, FaFilter, FaArrowRight, FaShoppingCart,
  FaHeart, FaEye, FaHome, FaSignInAlt
} from 'react-icons/fa';

const journeyStages = [
  { name: 'Homepage', visitors: 12345, percentage: 100, icon: FaHome },
  { name: 'Product View', visitors: 8234, percentage: 66.7, icon: FaEye },
  { name: 'Add to Cart', visitors: 3456, percentage: 28.0, icon: FaShoppingCart },
  { name: 'Wishlist', visitors: 2134, percentage: 17.3, icon: FaHeart },
  { name: 'Checkout', visitors: 1234, percentage: 10.0, icon: FaSignInAlt },
  { name: 'Purchase', visitors: 567, percentage: 4.6, icon: FaShoppingCart },
];

const customerJourneys = [
  { id: 1, customer: 'Rahim Khan', path: ['Homepage', 'Products', 'Product Detail', 'Cart', 'Checkout', 'Purchase'], duration: '12 min', value: 2500 },
  { id: 2, customer: 'Fatema Begum', path: ['Homepage', 'Category', 'Product Detail', 'Wishlist', 'Cart', 'Purchase'], duration: '25 min', value: 4200 },
  { id: 3, customer: 'Ahmed Hasan', path: ['Homepage', 'Search', 'Product Detail', 'Cart', 'Checkout'], duration: '8 min', value: 0 },
  { id: 4, customer: 'Maria Islam', path: ['Homepage', 'Products', 'Product Detail', 'Cart'], duration: '5 min', value: 0 },
  { id: 5, customer: 'John Doe', path: ['Homepage', 'Category', 'Product Detail', 'Wishlist'], duration: '15 min', value: 0 },
];

export default function CustomerJourneyPage() {
  const [dateRange, setDateRange] = useState('7days');

  const avgTimeOnSite = '8.5 min';
  const bounceRate = '35.2%';
  const avgPagesPerSession = '4.3';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Journey</h1>
          <p className="text-gray-500 mt-1">Track how customers navigate through your store</p>
        </div>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Time on Site</p>
              <p className="text-2xl font-bold text-blue-600">{avgTimeOnSite}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <FaRoute className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Bounce Rate</p>
              <p className="text-2xl font-bold text-amber-600">{bounceRate}</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <FaHome className="text-amber-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pages/Session</p>
              <p className="text-2xl font-bold text-purple-600">{avgPagesPerSession}</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <FaEye className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <p className="text-2xl font-bold text-emerald-600">4.6%</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <FaShoppingCart className="text-emerald-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Funnel */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Customer Journey Funnel</h2>
        <div className="space-y-4">
          {journeyStages.map((stage, index) => (
            <div key={stage.name}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <stage.icon className="text-gray-400" />
                  <span className="font-medium text-gray-900">{stage.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">{stage.visitors.toLocaleString()} visitors</span>
                  <span className="text-gray-500 w-16 text-right">{stage.percentage}%</span>
                </div>
              </div>
              <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                  style={{ width: `${stage.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Journeys */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Recent Customer Journeys</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Journey Path</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Duration</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Value</th>
              </tr>
            </thead>
            <tbody>
              {customerJourneys.map((journey) => (
                <tr key={journey.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-4 px-6">
                    <span className="font-semibold text-gray-900">{journey.customer}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 flex-wrap">
                      {journey.path.map((step, i) => (
                        <span key={i} className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{step}</span>
                          {i < journey.path.length - 1 && <FaArrowRight className="text-gray-400 text-xs" />}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{journey.duration}</td>
                  <td className="py-4 px-6">
                    <span className={`font-semibold ${journey.value > 0 ? 'text-emerald-600' : 'text-gray-400'}`}>
                      {journey.value > 0 ? `Tk ${journey.value.toLocaleString()}` : 'Did not purchase'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
