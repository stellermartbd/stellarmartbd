'use client';

import { useState } from 'react';
import { 
  FaSearch, FaFilter, FaEye, FaEdit, FaTrash, FaEnvelope, FaPhone,
  FaMapMarkerAlt, FaChevronLeft, FaChevronRight, FaUserPlus,
  FaShoppingCart, FaDollarSign, FaCalendar
} from 'react-icons/fa';

const customers = [
  { id: 1, name: 'Rahul Ahmed', email: 'rahul@email.com', phone: '+880 1234 567890', location: 'Dhaka, Bangladesh', orders: 12, spent: 24500, joined: '2023-06-15', status: 'Active', avatar: 'R' },
  { id: 2, name: 'Sumon Khan', email: 'sumon@email.com', phone: '+880 1234 567891', location: 'Chittagong, Bangladesh', orders: 8, spent: 18200, joined: '2023-07-20', status: 'Active', avatar: 'S' },
  { id: 3, name: 'Alia Rahman', email: 'alia@email.com', phone: '+880 1234 567892', location: 'Sylhet, Bangladesh', orders: 15, spent: 32100, joined: '2023-05-10', status: 'Active', avatar: 'A' },
  { id: 4, name: 'Munna Mia', email: 'munna@email.com', phone: '+880 1234 567893', location: 'Rajshahi, Bangladesh', orders: 5, spent: 8900, joined: '2023-09-05', status: 'Inactive', avatar: 'M' },
  { id: 5, name: 'Jewel Rana', email: 'jewel@email.com', phone: '+880 1234 567894', location: 'Khulna, Bangladesh', orders: 22, spent: 45600, joined: '2023-03-22', status: 'Active', avatar: 'J' },
  { id: 6, name: 'Tamim Iqbal', email: 'tamim@email.com', phone: '+880 1234 567895', location: 'Barisal, Bangladesh', orders: 3, spent: 4500, joined: '2023-11-12', status: 'New', avatar: 'T' },
  { id: 7, name: 'Priya Devi', email: 'priya@email.com', phone: '+880 1234 567896', location: 'Dhaka, Bangladesh', orders: 18, spent: 38700, joined: '2023-04-08', status: 'Active', avatar: 'P' },
  { id: 8, name: 'Arif Hassan', email: 'arif@email.com', phone: '+880 1234 567897', location: 'Rangpur, Bangladesh', orders: 7, spent: 12300, joined: '2023-08-30', status: 'Active', avatar: 'A' },
];

const getStatusConfig = (status) => {
  switch (status) {
    case 'Active':
      return { bg: 'bg-emerald-100', text: 'text-emerald-700' };
    case 'Inactive':
      return { bg: 'bg-gray-100', text: 'text-gray-700' };
    case 'New':
      return { bg: 'bg-blue-100', text: 'text-blue-700' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-700' };
  }
};

const getAvatarColor = (name) => {
  const colors = [
    'from-blue-500 to-indigo-600',
    'from-emerald-500 to-teal-600',
    'from-purple-500 to-violet-600',
    'from-amber-500 to-orange-600',
    'from-pink-500 to-rose-600',
    'from-cyan-500 to-sky-600',
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

  // Stats
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'Active').length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.spent, 0);
  const avgOrderValue = totalRevenue / customers.reduce((sum, c) => sum + c.orders, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-500 mt-1">Manage your customer database</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
          <FaUserPlus className="text-sm" />
          Add Customer
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <FaShoppingCart className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active</p>
              <p className="text-2xl font-bold text-emerald-600">{activeCustomers}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <FaUserPlus className="text-emerald-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-purple-600">৳{(totalRevenue / 1000).toFixed(1)}K</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <FaDollarSign className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Order</p>
              <p className="text-2xl font-bold text-amber-600">৳{Math.round(avgOrderValue)}</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <FaCalendar className="text-amber-600 text-xl" />
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
              placeholder="Search customers by name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="New">New</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <FaFilter className="text-gray-500" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Orders</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Spent</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.map((customer) => {
                const statusConfig = getStatusConfig(customer.status);
                
                return (
                  <tr key={customer.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${getAvatarColor(customer.name)} rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md`}>
                          {customer.avatar}
                        </div>
                        <span className="font-semibold text-gray-900">{customer.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-sm text-gray-900 flex items-center gap-2">
                          <FaEnvelope className="text-gray-400 text-xs" />
                          {customer.email}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                          <FaPhone className="text-gray-400 text-xs" />
                          {customer.phone}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-600 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-gray-400 text-xs" />
                        {customer.location}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-gray-900">{customer.orders}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-emerald-600">৳{customer.spent.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500 text-sm">{customer.joined}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View Profile">
                          <FaEye className="text-gray-500" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                          <FaEdit className="text-gray-500" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <FaTrash className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredCustomers.length)} of {filteredCustomers.length} entries
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
