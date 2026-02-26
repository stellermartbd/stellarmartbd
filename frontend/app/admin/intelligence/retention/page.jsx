'use client';

import { useState } from 'react';
import { 
  FaUsers, FaChartLine, FaArrowUp, FaArrowDown, FaRedo, FaUserPlus,
  FaUserMinus, FaPercentage
} from 'react-icons/fa';

const retentionData = [
  { month: 'Jan 2024', newCustomers: 234, returning: 567, churned: 45, retentionRate: 75.2 },
  { month: 'Dec 2023', newCustomers: 198, returning: 512, churned: 38, retentionRate: 72.8 },
  { month: 'Nov 2023', newCustomers: 256, returning: 478, churned: 52, retentionRate: 70.1 },
  { month: 'Oct 2023', newCustomers: 189, returning: 445, churned: 41, retentionRate: 71.5 },
  { month: 'Sep 2023', newCustomers: 267, returning: 423, churned: 48, retentionRate: 69.8 },
  { month: 'Aug 2023', newCustomers: 234, returning: 398, churned: 35, retentionRate: 72.3 },
];

const customerSegments = [
  { segment: 'New Customers', count: 234, percentage: 15.2, trend: 'up' },
  { segment: 'Returning Customers', count: 567, percentage: 36.8, trend: 'up' },
  { segment: 'VIP Customers', count: 123, percentage: 8.0, trend: 'up' },
  { segment: 'At Risk', count: 89, percentage: 5.8, trend: 'down' },
  { segment: 'Churned', count: 45, percentage: 2.9, trend: 'stable' },
];

export default function RetentionPage() {
  const [dateRange, setDateRange] = useState('6months');

  const avgRetention = (retentionData.reduce((sum, d) => sum + d.retentionRate, 0) / retentionData.length).toFixed(1);
  const totalCustomers = 1058;
  const vipCustomers = 123;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Retention</h1>
          <p className="text-gray-500 mt-1">Track customer retention and loyalty metrics</p>
        </div>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="3months">Last 3 Months</option>
          <option value="6months">Last 6 Months</option>
          <option value="1year">Last 1 Year</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Retention Rate</p>
              <p className="text-2xl font-bold text-blue-600">{avgRetention}%</p>
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
              <p className="text-sm text-gray-500">Total Customers</p>
              <p className="text-2xl font-bold text-purple-600">{totalCustomers}</p>
              <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                <FaArrowUp className="text-xs" /> +12.5%
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
              <p className="text-sm text-gray-500">VIP Customers</p>
              <p className="text-2xl font-bold text-amber-600">{vipCustomers}</p>
              <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                <FaArrowUp className="text-xs" /> +8.2%
              </div>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <FaUserPlus className="text-amber-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Churn Rate</p>
              <p className="text-2xl font-bold text-red-600">3.2%</p>
              <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
                <FaArrowDown className="text-xs" /> -0.5%
              </div>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
              <FaUserMinus className="text-red-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Customer Segments */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Customer Segments</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {customerSegments.map((segment, index) => (
            <div key={index} className="p-4 border border-gray-100 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{segment.segment}</span>
                {segment.trend === 'up' && <FaArrowUp className="text-emerald-600 text-xs" />}
                {segment.trend === 'down' && <FaArrowDown className="text-red-600 text-xs" />}
                {segment.trend === 'stable' && <span className="text-gray-400">-</span>}
              </div>
              <p className="text-2xl font-bold text-gray-900">{segment.count}</p>
              <p className="text-sm text-gray-500">{segment.percentage}% of total</p>
            </div>
          ))}
        </div>
      </div>

      {/* Retention Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Monthly Retention</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Month</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">New Customers</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Returning</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Churned</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Retention Rate</th>
              </tr>
            </thead>
            <tbody>
              {retentionData.map((row, index) => (
                <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-4 px-6 font-medium text-gray-900">{row.month}</td>
                  <td className="py-4 px-6 text-blue-600">+{row.newCustomers}</td>
                  <td className="py-4 px-6 text-emerald-600">{row.returning}</td>
                  <td className="py-4 px-6 text-red-500">-{row.churned}</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      {row.retentionRate}%
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
