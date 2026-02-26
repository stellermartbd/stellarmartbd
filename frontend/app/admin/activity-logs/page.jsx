'use client';

import { useState } from 'react';
import { 
  FaSearch, FaFilter, FaClock, FaUser, FaShoppingCart, FaBox,
  FaEdit, FaTrash, FaSignOutAlt, FaSignInAlt, FaCog, FaBell,
  FaChevronLeft, FaChevronRight
} from 'react-icons/fa';

const activities = [
  { id: 1, action: 'New Order Placed', user: 'Customer - Rahim Khan', details: 'Order #ORD-1234 - ৳2,500', icon: FaShoppingCart, color: 'emerald', timestamp: '2024-01-15 14:32:15', ip: '192.168.1.101' },
  { id: 2, action: 'Product Updated', user: 'Admin - John Doe', details: 'Wireless Headphones Pro - Price changed to ৳2,499', icon: FaEdit, color: 'blue', timestamp: '2024-01-15 14:28:45', ip: '192.168.1.100' },
  { id: 3, action: 'User Login', user: 'Admin - Sarah Smith', details: 'Successful login from dashboard', icon: FaSignInAlt, color: 'purple', timestamp: '2024-01-15 14:15:22', ip: '192.168.1.100' },
  { id: 4, action: 'Order Status Changed', user: 'Admin - John Doe', details: 'Order #ORD-1233 - Processing to Shipped', icon: FaBox, color: 'amber', timestamp: '2024-01-15 13:55:18', ip: '192.168.1.100' },
  { id: 5, action: 'Product Added', user: 'Admin - Sarah Smith', details: 'New product "Smart Watch Band 5" added', icon: FaBox, color: 'green', timestamp: '2024-01-15 13:42:33', ip: '192.168.1.100' },
  { id: 6, action: 'User Logout', user: 'Admin - Mike Wilson', details: 'Logged out from admin panel', icon: FaSignOutAlt, color: 'gray', timestamp: '2024-01-15 13:30:45', ip: '192.168.1.102' },
  { id: 7, action: 'Settings Updated', user: 'Admin - John Doe', details: 'Store settings - Tax rate changed to 15%', icon: FaCog, color: 'indigo', timestamp: '2024-01-15 12:15:09', ip: '192.168.1.100' },
  { id: 8, action: 'New Customer Registered', user: 'System', details: 'New customer: fatema@example.com', icon: FaUser, color: 'teal', timestamp: '2024-01-15 11:45:33', ip: '192.168.1.105' },
  { id: 9, action: 'Product Deleted', user: 'Admin - Sarah Smith', details: 'Old product "USB Cable Type-C" removed', icon: FaTrash, color: 'red', timestamp: '2024-01-15 11:22:18', ip: '192.168.1.100' },
  { id: 10, action: 'Notification Sent', user: 'Admin - John Doe', details: 'Push notification to 1,500 subscribers', icon: FaBell, color: 'orange', timestamp: '2024-01-15 10:58:42', ip: '192.168.1.100' },
];

export default function ActivityLogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const actionTypes = ['All', 'New Order Placed', 'Product Updated', 'User Login', 'User Logout', 'Settings Updated', 'Product Added', 'Product Deleted'];

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === 'All' || activity.action === actionFilter;
    return matchesSearch && matchesAction;
  });

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentActivities = filteredActivities.slice(indexOfFirstItem, indexOfLastItem);

  const todayActivities = activities.filter(a => a.timestamp.startsWith('2024-01-15')).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Activity Logs</h1>
          <p className="text-gray-500 mt-1">Track all system activities and user actions</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Activities</p>
              <p className="text-2xl font-bold text-gray-900">{activities.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <FaClock className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Today</p>
              <p className="text-2xl font-bold text-emerald-600">{todayActivities}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <FaClock className="text-emerald-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Admin Actions</p>
              <p className="text-2xl font-bold text-purple-600">{activities.filter(a => a.user.includes('Admin')).length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <FaUser className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Orders</p>
              <p className="text-2xl font-bold text-amber-600">{activities.filter(a => a.action.includes('Order')).length}</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <FaShoppingCart className="text-amber-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {actionTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Activity List */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Details</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {currentActivities.map((activity) => (
                <tr key={activity.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-${activity.color}-50 rounded-xl flex items-center justify-center`}>
                        <activity.icon className={`text-${activity.color}-600`} />
                      </div>
                      <span className="font-semibold text-gray-900">{activity.action}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{activity.user}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-500 text-sm">{activity.details}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-500 text-sm font-mono">{activity.timestamp}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-400 text-sm font-mono">{activity.ip}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredActivities.length)} of {filteredActivities.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronLeft className="text-gray-500" />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronRight className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
