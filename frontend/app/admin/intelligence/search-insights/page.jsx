'use client';

import { useState } from 'react';
import { 
  FaSearch, FaSearchPlus, FaChartLine, FaArrowUp, FaArrowDown,
  FaTimesCircle, FaCheckCircle
} from 'react-icons/fa';

const searchTerms = [
  { term: 'wireless headphones', searches: 1234, results: 89, conversions: 234, ctr: 18.9, trend: 'up' },
  { term: 'smart watch', searches: 987, results: 156, conversions: 178, ctr: 18.0, trend: 'up' },
  { term: 'bluetooth speaker', searches: 756, results: 67, conversions: 123, ctr: 16.3, trend: 'down' },
  { term: 'usb hub', searches: 543, results: 45, conversions: 89, ctr: 16.4, trend: 'up' },
  { term: 'laptop stand', searches: 432, results: 34, conversions: 67, ctr: 15.5, trend: 'stable' },
  { term: 'phone case', searches: 389, results: 234, conversions: 45, ctr: 11.6, trend: 'down' },
  { term: 'charging cable', searches: 345, results: 178, conversions: 56, ctr: 16.2, trend: 'up' },
];

const noResultsSearches = [
  { term: 'waterproof speaker', searches: 45, date: '2024-01-15' },
  { term: 'gaming mouse rgb', searches: 38, date: '2024-01-14' },
  { term: 'wireless charger fast', searches: 32, date: '2024-01-15' },
  { term: 'laptop bag 15 inch', searches: 28, date: '2024-01-13' },
];

export default function SearchInsightsPage() {
  const [dateRange, setDateRange] = useState('7days');

  const totalSearches = searchTerms.reduce((sum, t) => sum + t.searches, 0);
  const avgCtr = (searchTerms.reduce((sum, t) => sum + t.ctr, 0) / searchTerms.length).toFixed(1);
  const totalConversions = searchTerms.reduce((sum, t) => sum + t.conversions, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Search Insights</h1>
          <p className="text-gray-500 mt-1">Analyze customer search behavior and trends</p>
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
              <p className="text-sm text-gray-500">Total Searches</p>
              <p className="text-2xl font-bold text-gray-900">{totalSearches.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <FaSearch className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg CTR</p>
              <p className="text-2xl font-bold text-purple-600">{avgCtr}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <FaChartLine className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Conversions</p>
              <p className="text-2xl font-bold text-emerald-600">{totalConversions}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <FaCheckCircle className="text-emerald-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">No Results</p>
              <p className="text-2xl font-bold text-amber-600">{noResultsSearches.reduce((s, t) => s + t.searches, 0)}</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <FaTimesCircle className="text-amber-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Search Terms */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Top Search Terms</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Search Term</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Searches</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Results</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Conversions</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">CTR</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Trend</th>
              </tr>
            </thead>
            <tbody>
              {searchTerms.map((item, index) => (
                <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <FaSearch className="text-gray-400" />
                      <span className="font-semibold text-gray-900">{item.term}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{item.searches.toLocaleString()}</td>
                  <td className="py-4 px-6 text-gray-600">{item.results}</td>
                  <td className="py-4 px-6 font-semibold text-emerald-600">{item.conversions}</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      {item.ctr}%
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {item.trend === 'up' && <FaArrowUp className="text-emerald-600" />}
                    {item.trend === 'down' && <FaArrowDown className="text-red-600" />}
                    {item.trend === 'stable' && <span className="text-gray-400">-</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* No Results Searches */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Searches with No Results</h2>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-500 mb-4">These searches returned no results - consider adding these products</p>
          <div className="flex flex-wrap gap-2">
            {noResultsSearches.map((item, index) => (
              <div key={index} className="px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                <span className="font-medium text-gray-900">{item.term}</span>
                <span className="text-amber-600 ml-2">({item.searches} searches)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
