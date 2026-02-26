'use client';

import { useState } from 'react';
import { 
  FaChartLine, FaSearch, FaFilter, FaArrowUp, FaArrowDown,
  FaUsers, FaShoppingCart, FaPercentage, FaMoneyBillWave
} from 'react-icons/fa';

const conversionData = [
  { date: '2024-01-15', visitors: 2345, addToCart: 456, checkout: 234, purchase: 178, conversionRate: 7.59 },
  { date: '2024-01-14', visitors: 2198, addToCart: 412, checkout: 198, purchase: 145, conversionRate: 6.60 },
  { date: '2024-01-13', visitors: 2456, addToCart: 489, checkout: 256, purchase: 189, conversionRate: 7.70 },
  { date: '2024-01-12', visitors: 2087, addToCart: 398, checkout: 187, purchase: 134, conversionRate: 6.42 },
  { date: '2024-01-11', visitors: 2234, addToCart: 423, checkout: 212, purchase: 156, conversionRate: 6.98 },
  { date: '2024-01-10', visitors: 2567, addToCart: 512, checkout: 278, purchase: 201, conversionRate: 7.83 },
  { date: '2024-01-09', visitors: 2345, addToCart: 456, checkout: 234, purchase: 178, conversionRate: 7.59 },
];

const funnelStages = [
  { name: 'Visitors', value: 2345, percentage: 100, color: 'blue' },
  { name: 'Add to Cart', value: 456, percentage: 19.4, color: 'purple' },
  { name: 'Checkout', value: 234, percentage: 10.0, color: 'amber' },
  { name: 'Purchase', value: 178, percentage: 7.6, color: 'emerald' },
];

export default function ConversionStatsPage() {
  const [dateRange, setDateRange] = useState('7days');

  const avgConversion = (conversionData.reduce((sum, d) => sum + d.conversionRate, 0) / conversionData.length).toFixed(2);
  const avgVisitors = Math.round(conversionData.reduce((sum, d) => sum + d.visitors, 0) / conversionData.length);
  const avgPurchases = Math.round(conversionData.reduce((sum, d) => sum + d.purchase, 0) / conversionData.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Conversion Stats</h1>
          <p className="text-gray-500 mt-1">Track your conversion funnel performance</p>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Conversion Rate</p>
              <p className="text-2xl font-bold text-blue-600">{avgConversion}%</p>
              <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                <FaArrowUp className="text-xs" /> +2.3%
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <FaPercentage className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Visitors</p>
              <p className="text-2xl font-bold text-purple-600">{avgVisitors.toLocaleString()}</p>
              <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                <FaArrowUp className="text-xs" /> +5.1%
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <FaUsers className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Purchases</p>
              <p className="text-2xl font-bold text-emerald-600">{avgPurchases}</p>
              <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                <FaArrowUp className="text-xs" /> +8.4%
              </div>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <FaShoppingCart className="text-emerald-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Revenue</p>
              <p className="text-2xl font-bold text-amber-600">৳4,56,000</p>
              <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                <FaArrowUp className="text-xs" /> +12.5%
              </div>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <FaMoneyBillWave className="text-amber-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Funnel */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Conversion Funnel</h2>
        <div className="space-y-4">
          {funnelStages.map((stage, index) => (
            <div key={stage.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{stage.name}</span>
                <span className="text-gray-600">{stage.value.toLocaleString()} ({stage.percentage}%)</span>
              </div>
              <div className="h-8 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-${stage.color}-500 rounded-full transition-all`}
                  style={{ width: `${stage.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Daily Conversion Data</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Date</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Visitors</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Add to Cart</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Checkout</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Purchase</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Conversion</th>
              </tr>
            </thead>
            <tbody>
              {conversionData.map((row, index) => (
                <tr key={index} className="border-b border-gray-50">
                  <td className="py-4 px-6 text-gray-900">{row.date}</td>
                  <td className="py-4 px-6 text-gray-600">{row.visitors.toLocaleString()}</td>
                  <td className="py-4 px-6 text-gray-600">{row.addToCart}</td>
                  <td className="py-4 px-6 text-gray-600">{row.checkout}</td>
                  <td className="py-4 px-6 text-gray-900 font-semibold">{row.purchase}</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                      {row.conversionRate}%
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
