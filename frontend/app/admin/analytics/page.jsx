'use client';

import { useState } from 'react';
import { 
  FaChartLine, FaChartBar, FaUsers, FaEye, FaShoppingCart,
  FaDollarSign, FaArrowUp, FaArrowDown, FaCalendar, FaFilter,
  FaDesktop, FaMobileAlt, FaTabletAlt
} from 'react-icons/fa';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('7days');

  const stats = [
    { 
      title: 'Total Revenue', 
      value: '৳2,45,890', 
      change: '+12.5%', 
      isPositive: true,
      icon: FaDollarSign,
      color: 'blue'
    },
    { 
      title: 'Total Orders', 
      value: '1,234', 
      change: '+8.2%', 
      isPositive: true,
      icon: FaShoppingCart,
      color: 'emerald'
    },
    { 
      title: 'Total Visitors', 
      value: '45,678', 
      change: '+15.3%', 
      isPositive: true,
      icon: FaEye,
      color: 'purple'
    },
    { 
      title: 'Conversion Rate', 
      value: '3.2%', 
      change: '-0.4%', 
      isPositive: false,
      icon: FaChartLine,
      color: 'amber'
    },
  ];

  const topProducts = [
    { name: 'Wireless Headphones Pro', sales: 234, revenue: 583, trend: '+12%' },
    { name: 'Smart Watch Band 5', sales: 189, revenue: 377, trend: '+8%' },
    { name: 'Bluetooth Speaker Mini', sales: 156, revenue: 203, trend: '+15%' },
    { name: 'USB Hub 7-Port', sales: 98, revenue: 69, trend: '+5%' },
    { name: 'Laptop Stand Aluminum', sales: 67, revenue: 100, trend: '+22%' },
  ];

  const trafficSources = [
    { source: 'Organic Search', visitors: 18256, percentage: 40 },
    { source: 'Direct', visitors: 13650, percentage: 30 },
    { source: 'Social Media', visitors: 6834, percentage: 15 },
    { source: 'Referral', visitors: 4550, percentage: 10 },
    { source: 'Email', visitors: 2382, percentage: 5 },
  ];

  const deviceStats = [
    { device: 'Desktop', icon: FaDesktop, percentage: 55, color: 'blue' },
    { device: 'Mobile', icon: FaMobileAlt, percentage: 38, color: 'emerald' },
    { device: 'Tablet', icon: FaTabletAlt, percentage: 7, color: 'purple' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500 mt-1">Track your store performance and insights</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="1year">Last 1 Year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <FaFilter className="text-gray-500" />
            Filters
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className={`flex items-center gap-1 mt-2 text-sm ${stat.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                  {stat.isPositive ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />}
                  <span>{stat.change}</span>
                  <span className="text-gray-400">vs last period</span>
                </div>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-50 rounded-xl flex items-center justify-center`}>
                <stat.icon className={`text-${stat.color}-600 text-xl`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart Placeholder */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-500 rounded-full"></span> Revenue</span>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {[65, 45, 78, 52, 90, 68, 85].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-500"
                  style={{ height: `${height * 2.5}px` }}
                ></div>
                <span className="text-xs text-gray-400">Day {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Traffic Sources</h2>
          <div className="space-y-4">
            {trafficSources.map((source, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{source.source}</span>
                  <span className="text-sm text-gray-500">{source.visitors.toLocaleString()} visitors</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all"
                    style={{ width: `${source.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Products */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Selling Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 text-xs font-semibold text-gray-500 uppercase">Product</th>
                  <th className="text-left py-3 text-xs font-semibold text-gray-500 uppercase">Sales</th>
                  <th className="text-left py-3 text-xs font-semibold text-gray-500 uppercase">Revenue</th>
                  <th className="text-left py-3 text-xs font-semibold text-gray-500 uppercase">Trend</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={index} className="border-b border-gray-50">
                    <td className="py-4">
                      <span className="font-medium text-gray-900">{product.name}</span>
                    </td>
                    <td className="py-4 text-gray-600">{product.sales}</td>
                    <td className="py-4">
                      <span className="font-semibold text-gray-900">৳{product.revenue}k</span>
                    </td>
                    <td className="py-4">
                      <span className="text-emerald-600 text-sm font-medium">{product.trend}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Device Stats */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Device Breakdown</h2>
          <div className="space-y-6">
            {deviceStats.map((device, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-${device.color}-50 rounded-xl flex items-center justify-center`}>
                  <device.icon className={`text-${device.color}-600 text-xl`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">{device.device}</span>
                    <span className="text-gray-500">{device.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-${device.color}-500 rounded-full`}
                      style={{ width: `${device.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
