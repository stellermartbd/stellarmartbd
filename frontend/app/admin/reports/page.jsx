'use client';

import { useState } from 'react';
import { 
  FaFileAlt, FaDownload, FaCalendar, FaChartLine, FaChartBar,
  FaFileExcel, FaFilePdf, FaFilter, FaPrint, FaEnvelope
} from 'react-icons/fa';

const reportTypes = [
  { id: 'sales', name: 'Sales Report', description: 'Track sales performance, revenue, and transactions', icon: FaChartLine, color: 'blue' },
  { id: 'products', name: 'Product Report', description: 'Analyze product performance and inventory', icon: FaChartBar, color: 'emerald' },
  { id: 'customers', name: 'Customer Report', description: 'Customer demographics, behavior, and retention', icon: FaFileAlt, color: 'purple' },
  { id: 'orders', name: 'Orders Report', description: 'Order status, fulfillment, and shipping', icon: FaFileAlt, color: 'amber' },
  { id: 'revenue', name: 'Revenue Report', description: 'Revenue breakdown by category, period, region', icon: FaChartLine, color: 'green' },
  { id: 'inventory', name: 'Inventory Report', description: 'Stock levels, turnover, and valuations', icon: FaFileAlt, color: 'red' },
];

const recentReports = [
  { id: 1, name: 'Sales Report - January 2024', type: 'Sales', date: '2024-01-15', format: 'PDF', size: '2.4 MB' },
  { id: 2, name: 'Product Performance Report', type: 'Products', date: '2024-01-14', format: 'Excel', size: '1.8 MB' },
  { id: 3, name: 'Customer Analytics Report', type: 'Customers', date: '2024-01-12', format: 'PDF', size: '3.1 MB' },
  { id: 4, name: 'Monthly Revenue Summary', type: 'Revenue', date: '2024-01-10', format: 'Excel', size: '0.9 MB' },
  { id: 5, name: 'Inventory Status Report', type: 'Inventory', date: '2024-01-08', format: 'PDF', size: '1.5 MB' },
];

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateRange, setDateRange] = useState('30days');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-500 mt-1">Generate and download business reports</p>
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

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportTypes.map((report) => (
          <div 
            key={report.id}
            onClick={() => setSelectedReport(report.id)}
            className={`bg-white rounded-xl border p-6 cursor-pointer transition-all hover:shadow-md ${
              selectedReport === report.id 
                ? 'border-blue-500 shadow-md ring-2 ring-blue-100' 
                : 'border-gray-100 shadow-sm'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 bg-${report.color}-50 rounded-xl flex items-center justify-center`}>
                <report.icon className={`text-${report.color}-600 text-xl`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{report.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{report.description}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                <FaDownload className="text-sm" />
                Generate
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <FaCalendar className="text-gray-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <FaFileAlt className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">This Month</p>
              <p className="text-2xl font-bold text-emerald-600">8</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <FaFileAlt className="text-emerald-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">PDF Reports</p>
              <p className="text-2xl font-bold text-purple-600">15</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <FaFilePdf className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Excel Reports</p>
              <p className="text-2xl font-bold text-amber-600">9</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <FaFileExcel className="text-amber-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Report Name</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Format</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Size</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((report) => (
                <tr key={report.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        {report.format === 'PDF' ? (
                          <FaFilePdf className="text-red-500" />
                        ) : (
                          <FaFileExcel className="text-green-500" />
                        )}
                      </div>
                      <span className="font-medium text-gray-900">{report.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      {report.type}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{report.date}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{report.format}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{report.size}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Download">
                        <FaDownload className="text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Print">
                        <FaPrint className="text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Email">
                        <FaEnvelope className="text-gray-500" />
                      </button>
                    </div>
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
