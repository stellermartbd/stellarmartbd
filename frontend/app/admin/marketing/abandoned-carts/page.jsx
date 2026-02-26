'use client';

import { useState } from 'react';
import { 
  FaShoppingCart, FaSearch, FaEnvelope, FaPhone, FaTrash,
  FaClock, FaUser, FaChevronLeft, FaChevronRight, FaMailBulk
} from 'react-icons/fa';

const abandonedCarts = [
  { id: 1, customer: 'Rahim Khan', email: 'rahim@example.com', phone: '+8801234567890', items: 3, value: 4500, lastActive: '2024-01-15 14:30', status: 'Pending' },
  { id: 2, customer: 'Fatema Begum', email: 'fatema@example.com', phone: '+8801234567891', items: 2, value: 2800, lastActive: '2024-01-15 12:15', status: 'Email Sent' },
  { id: 3, customer: 'Ahmed Hasan', email: 'ahmed@example.com', phone: '+8801234567892', items: 1, value: 1200, lastActive: '2024-01-14 16:45', status: 'Recovered' },
  { id: 4, customer: 'Maria Islam', email: 'maria@example.com', phone: '+8801234567893', items: 4, value: 8900, lastActive: '2024-01-14 10:20', status: 'Pending' },
  { id: 5, customer: 'John Doe', email: 'john@example.com', phone: '+8801234567894', items: 2, value: 3500, lastActive: '2024-01-13 18:30', status: 'Email Sent' },
];

export default function AbandonedCartsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const filteredCarts = abandonedCarts.filter(cart => {
    const matchesSearch = cart.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cart.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || cart.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredCarts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCarts = filteredCarts.slice(indexOfFirstItem, indexOfLastItem);

  const totalCarts = abandonedCarts.length;
  const totalValue = abandonedCarts.reduce((sum, c) => sum + c.value, 0);
  const recovered = abandonedCarts.filter(c => c.status === 'Recovered').length;
  const pending = abandonedCarts.filter(c => c.status === 'Pending').length;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-amber-100 text-amber-700';
      case 'Email Sent': return 'bg-blue-100 text-blue-700';
      case 'Recovered': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Abandoned Carts</h1>
          <p className="text-gray-500 mt-1">Recover lost sales from abandoned shopping carts</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
          <FaMailBulk className="text-sm" />
          Send Reminder
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Carts</p>
              <p className="text-2xl font-bold text-gray-900">{totalCarts}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <FaShoppingCart className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Value</p>
              <p className="text-2xl font-bold text-amber-600">Tk {totalValue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <FaClock className="text-amber-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Recovered</p>
              <p className="text-2xl font-bold text-emerald-600">{recovered}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <FaShoppingCart className="text-emerald-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-purple-600">{pending}</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <FaClock className="text-purple-600 text-xl" />
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
              placeholder="Search by customer name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Email Sent">Email Sent</option>
            <option value="Recovered">Recovered</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Items</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Cart Value</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Last Active</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCarts.map((cart) => (
                <tr key={cart.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-semibold text-gray-900">{cart.customer}</p>
                      <p className="text-sm text-gray-500">{cart.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{cart.items} items</td>
                  <td className="py-4 px-6 font-semibold text-gray-900">Tk {cart.value.toLocaleString()}</td>
                  <td className="py-4 px-6 text-gray-500">{cart.lastActive}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(cart.status)}`}>
                      {cart.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-blue-50 rounded-lg" title="Send Email">
                        <FaEnvelope className="text-blue-500" />
                      </button>
                      <button className="p-2 hover:bg-green-50 rounded-lg" title="Send SMS">
                        <FaPhone className="text-green-500" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg" title="Delete">
                        <FaTrash className="text-red-500" />
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
