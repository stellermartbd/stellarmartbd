'use client';

import { useState } from 'react';
import { 
  FaTools, FaServer, FaDatabase, FaBuffer, FaTrash, FaCheck, FaTimes,
  FaSync, FaExclamationTriangle, FaCheckCircle, FaClock, FaPowerOff
} from 'react-icons/fa';

const cacheStats = [
  { name: 'Product Cache', size: '45.2 MB', items: 1250, lastUpdated: '2024-01-15 14:30' },
  { name: 'User Session Cache', size: '12.8 MB', items: 450, lastUpdated: '2024-01-15 14:25' },
  { name: 'API Response Cache', size: '28.5 MB', items: 890, lastUpdated: '2024-01-15 14:28' },
  { name: 'Image Cache', size: '156.3 MB', items: 2340, lastUpdated: '2024-01-15 14:15' },
];

const systemHealth = [
  { name: 'Server Status', status: 'healthy', uptime: '15 days', cpu: '32%', memory: '48%' },
  { name: 'Database Status', status: 'healthy', uptime: '15 days', cpu: '18%', memory: '62%' },
  { name: 'Cache Server', status: 'healthy', uptime: '15 days', cpu: '5%', memory: '34%' },
  { name: 'CDN', status: 'healthy', uptime: '30 days', cpu: '0%', memory: '0%' },
];

const backups = [
  { id: 1, name: 'Full Backup - Daily', type: 'Full', size: '2.4 GB', date: '2024-01-15 02:00', status: 'Completed' },
  { id: 2, name: 'Database Backup - Hourly', type: 'Incremental', size: '45 MB', date: '2024-01-15 14:00', status: 'Completed' },
  { id: 3, name: 'Full Backup - Weekly', type: 'Full', size: '2.2 GB', date: '2024-01-14 02:00', status: 'Completed' },
  { id: 4, name: 'Database Backup - Hourly', type: 'Incremental', size: '42 MB', date: '2024-01-15 13:00', status: 'Completed' },
];

export default function MaintenancePage() {
  const [isClearing, setIsClearing] = useState(false);

  const handleClearCache = () => {
    setIsClearing(true);
    setTimeout(() => {
      setIsClearing(false);
      alert('Cache cleared successfully!');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maintenance</h1>
          <p className="text-gray-500 mt-1">System maintenance and monitoring</p>
        </div>
        <button 
          onClick={handleClearCache}
          disabled={isClearing}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 disabled:opacity-50"
        >
          {isClearing ? <FaSync className="animate-spin" /> : <FaTrash />}
          {isClearing ? 'Clearing...' : 'Clear All Cache'}
        </button>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemHealth.map((system, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  system.status === 'healthy' ? 'bg-emerald-50' : 'bg-red-50'
                }`}>
                  {system.status === 'healthy' ? (
                    <FaCheckCircle className="text-emerald-600" />
                  ) : (
                    <FaExclamationTriangle className="text-red-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{system.name}</h3>
                  <p className={`text-xs ${system.status === 'healthy' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {system.status === 'healthy' ? 'Healthy' : 'Critical'}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Uptime</span>
                <span className="font-medium text-gray-900">{system.uptime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">CPU</span>
                <span className="font-medium text-gray-900">{system.cpu}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Memory</span>
                <span className="font-medium text-gray-900">{system.memory}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cache Management */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Cache Management</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Cache Name</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Size</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Items</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cacheStats.map((cache, index) => (
                <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                        <FaCache className="text-purple-600" />
                      </div>
                      <span className="font-semibold text-gray-900">{cache.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{cache.size}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{cache.items.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-500">{cache.lastUpdated}</span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      Clear
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Backups */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Backup History</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            <FaDatabase />
            Create Backup
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Backup Name</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Size</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {backups.map((backup) => (
                <tr key={backup.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                        <FaDatabase className="text-blue-600" />
                      </div>
                      <span className="font-semibold text-gray-900">{backup.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      {backup.type}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{backup.size}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-500">{backup.date}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                      {backup.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <FaSync className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Rebuild Search Index</h3>
              <p className="text-sm text-gray-500">Update search functionality</p>
            </div>
          </div>
          <button className="w-full py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            Rebuild Now
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <FaExclamationTriangle className="text-amber-600 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">System Diagnostics</h3>
              <p className="text-sm text-gray-500">Run system check</p>
            </div>
          </div>
          <button className="w-full py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            Run Diagnostics
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
              <FaPowerOff className="text-red-600 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Maintenance Mode</h3>
              <p className="text-sm text-gray-500">Enable/disable site</p>
            </div>
          </div>
          <button className="w-full py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            Toggle Mode
          </button>
        </div>
      </div>
    </div>
  );
}

