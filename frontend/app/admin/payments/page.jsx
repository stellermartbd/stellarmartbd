'use client';

import { useState } from 'react';
import { 
  FaCreditCard, FaSearch, FaPlus, FaCheck, FaTimes, FaMoneyBillWave,
  FaUniversity, FaWallet, FaArrowUp, FaArrowDown, FaDownload,
  FaChevronLeft, FaChevronRight, FaFilter
} from 'react-icons/fa';

const transactions = [
  { id: 'TXN-1234', orderId: 'ORD-1234', customer: 'Rahim Khan', method: 'bKash', amount: 2500, status: 'Completed', date: '2024-01-15 14:32', transactionId: 'BK789456123' },
  { id: 'TXN-1235', orderId: 'ORD-1235', customer: 'Fatema Begum', method: 'Nagad', amount: 1800, status: 'Completed', date: '2024-01-15 13:45', transactionId: 'NG456789123' },
  { id: 'TXN-1236', orderId: 'ORD-1236', customer: 'Ahmed Hasan', method: 'Card', amount: 5200, status: 'Completed', date: '2024-01-15 12:20', transactionId: 'CARD-987654' },
  { id: 'TXN-1237', orderId: 'ORD-1237', customer: 'Maria Islam', method: 'bKash', amount: 890, status: 'Pending', date: '2024-01-15 11:15', transactionId: 'BK123456789' },
  { id: 'TXN-1238', orderId: 'ORD-1238', customer: 'John Doe', method: 'Bank Transfer', amount: 15000, status: 'Completed', date: '2024-01-15 10:30', transactionId: 'DBBL-456789' },
  { id: 'TXN-1239', orderId: 'ORD-1239', customer: 'Sara Ali', method: 'Nagad', amount: 3200, status: 'Failed', date: '2024-01-14 16:45', transactionId: 'NG789123456' },
  { id: 'TXN-1240', orderId: 'ORD-1240', customer: 'David Wilson', method: 'Card', amount: 7500, status: 'Completed', date: '2024-01-14 15:20', transactionId: 'CARD-123456' },
];

const paymentGateways = [
  { id: 1, name: 'bKash', logo: '💳', status: 'Active', transactions: 1250, volume: '৳45,00,000', fee: '1.85%' },
  { id: 2, name: 'Nagad', logo: '📱', status: 'Active', transactions: 890, volume: '৳32,00,000', fee: '1.50%' },
  { id: 3, name: 'SSL Commerce', logo: '🔒', status: 'Active', transactions: 456, volume: '৳28,00,000', fee: '2.50%' },
  { id: 4, name: 'Bank Transfer', logo: '🏦', status: 'Active', transactions: 123, volume: '৳15,00,000', fee: '0%' },
];

const refunds = [
  { id: 'REF-001', orderId: 'ORD-1200', customer: 'Rahim Khan', amount: 1200, reason: 'Product Damaged', status: 'Approved', date: '2024-01-14' },
  { id: 'REF-002', orderId: 'ORD-1198', customer: 'Fatema Begum', amount: 800, reason: 'Wrong Item Sent', status: 'Pending', date: '2024-01-15' },
  { id: 'REF-003', orderId: 'ORD-1185', customer: 'Ahmed Hasan', amount: 2500, reason: 'Customer Request', status: 'Rejected', date: '2024-01-13' },
];

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || tx.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

  const totalRevenue = transactions.filter(t => t.status === 'Completed').reduce((sum, t) => sum + t.amount, 0);
  const todayRevenue = transactions.filter(t => t.status === 'Completed' && t.date.startsWith('2024-01-15')).reduce((sum, t) => sum + t.amount, 0);
  const pendingAmount = transactions.filter(t => t.status === 'Pending').reduce((sum, t) => sum + t.amount, 0);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-700';
      case 'Pending': return 'bg-amber-100 text-amber-700';
      case 'Failed': return 'bg-red-100 text-red-700';
      case 'Approved': return 'bg-emerald-100 text-emerald-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'bKash': return '💳';
      case 'Nagad': return '📱';
      case 'Card': return '💳';
      case 'Bank Transfer': return '🏦';
      default: return '💰';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-500 mt-1">Manage transactions and payment gateways</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <FaDownload className="text-gray-500" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">৳{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <FaMoneyBillWave className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Today's Revenue</p>
              <p className="text-2xl font-bold text-emerald-600">৳{todayRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <FaArrowUp className="text-emerald-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-amber-600">৳{pendingAmount.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <FaArrowDown className="text-amber-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Transactions</p>
              <p className="text-2xl font-bold text-purple-600">{transactions.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <FaCreditCard className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Gateways */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Payment Gateways</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
          {paymentGateways.map((gateway) => (
            <div key={gateway.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="text-3xl">{gateway.logo}</div>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                  {gateway.status}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{gateway.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Transactions:</span>
                  <span className="font-medium text-gray-900">{gateway.transactions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Volume:</span>
                  <span className="font-medium text-gray-900">{gateway.volume}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Fee:</span>
                  <span className="font-medium text-gray-900">{gateway.fee}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order ID, customer or transaction ID..."
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
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Method</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-mono text-sm text-blue-600">{tx.transactionId}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-gray-900">{tx.orderId}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-900">{tx.customer}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span>{getMethodIcon(tx.method)}</span>
                      <span className="text-gray-600">{tx.method}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-gray-900">৳{tx.amount.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-500 text-sm">{tx.date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredTransactions.length)} of {filteredTransactions.length}
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

      {/* Refunds */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Refund Requests</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Refund ID</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {refunds.map((refund) => (
                <tr key={refund.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-semibold text-gray-900">{refund.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-blue-600">{refund.orderId}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-900">{refund.customer}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-gray-900">৳{refund.amount}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{refund.reason}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(refund.status)}`}>
                      {refund.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {refund.status === 'Pending' && (
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-emerald-50 rounded-lg transition-colors" title="Approve">
                          <FaCheck className="text-emerald-500" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Reject">
                          <FaTimes className="text-red-500" />
                        </button>
                      </div>
                    )}
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
