'use client';

import { useState } from 'react';
import { 
  FaSearch, FaFilter, FaEye, FaEdit, FaTrash, FaDownload,
  FaChevronLeft, FaChevronRight, FaCheck, FaTimes,
  FaBox, FaTruck, FaClock, FaMoneyBill
} from 'react-icons/fa';

const orders = [
  { id: '#SM12345', customer: 'Rahul Ahmed', email: 'rahul@email.com', product: 'Wireless Headphones', amount: 2499, status: 'Pending', date: '2024-01-20', payment: 'Unpaid' },
  { id: '#SM12344', customer: 'Sumon Khan', email: 'sumon@email.com', product: 'Smart Watch', amount: 1999, status: 'Processing', date: '2024-01-20', payment: 'Paid' },
  { id: '#SM12343', customer: 'Alia Rahman', email: 'alia@email.com', product: 'Leather Wallet', amount: 799, status: 'Shipped', date: '2024-01-19', payment: 'Paid' },
  { id: '#SM12342', customer: 'Munna Mia', email: 'munna@email.com', product: 'Bluetooth Speaker', amount: 1299, status: 'Delivered', date: '2024-01-19', payment: 'Paid' },
  { id: '#SM12341', customer: 'Jewel Rana', email: 'jewel@email.com', product: 'USB Hub', amount: 699, status: 'Delivered', date: '2024-01-18', payment: 'Paid' },
  { id: '#SM12340', customer: 'Tamim Iqbal', email: 'tamim@email.com', product: 'Laptop Stand', amount: 1499, status: 'Cancelled', date: '2024-01-18', payment: 'Refunded' },
  { id: '#SM12339', customer: 'Priya Devi', email: 'priya@email.com', product: 'Mechanical Keyboard', amount: 3499, status: 'Delivered', date: '2024-01-17', payment: 'Paid' },
  { id: '#SM12338', customer: 'Arif Hassan', email: 'arif@email.com', product: 'Wireless Mouse', amount: 899, status: 'Processing', date: '2024-01-17', payment: 'Paid' },
];

const getStatusConfig = (status) => {
  switch (status) {
    case 'Delivered':
      return { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: FaCheck, label: 'Delivered' };
    case 'Shipped':
      return { bg: 'bg-blue-100', text: 'text-blue-700', icon: FaTruck, label: 'Shipped' };
    case 'Processing':
      return { bg: 'bg-amber-100', text: 'text-amber-700', icon: FaClock, label: 'Processing' };
    case 'Pending':
      return { bg: 'bg-gray-100', text: 'text-gray-700', icon: FaClock, label: 'Pending' };
    case 'Cancelled':
      return { bg: 'bg-red-100', text: 'text-red-700', icon: FaTimes, label: 'Cancelled' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-700', icon: FaClock, label: status };
  }
};

const getPaymentConfig = (payment) => {
  switch (payment) {
    case 'Paid':
      return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' };
    case 'Unpaid':
      return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
    case 'Refunded':
      return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' };
    default:
      return { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
  }
};

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-500 mt-1">Manage and track customer orders</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
          <FaDownload className="text-sm" />
          Export CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">1,245</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <FaBox className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-amber-600">23</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <FaClock className="text-amber-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Processing</p>
              <p className="text-2xl font-bold text-blue-600">45</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <FaTruck className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Revenue</p>
              <p className="text-2xl font-bold text-emerald-600">৳12.5L</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <FaMoneyBill className="text-emerald-600 text-xl" />
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
              placeholder="Search orders, customers..."
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
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <FaFilter className="text-gray-500" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => {
                const statusConfig = getStatusConfig(order.status);
                const paymentConfig = getPaymentConfig(order.payment);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-semibold text-blue-600">{order.id}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{order.customer}</p>
                        <p className="text-sm text-gray-500">{order.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700">{order.product}</td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-gray-900">৳{order.amount}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${paymentConfig.bg} ${paymentConfig.text} ${paymentConfig.border}`}>
                        {order.payment}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 w-fit ${statusConfig.bg} ${statusConfig.text}`}>
                        <StatusIcon className="text-xs" />
                        {statusConfig.label}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500 text-sm">{order.date}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View Details">
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
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredOrders.length)} of {filteredOrders.length} entries
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
