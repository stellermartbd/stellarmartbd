'use client';

import { useState } from 'react';
import { 
  FaTag, FaSearch, FaPlus, FaEdit, FaTrash, FaCheck, FaTimes,
  FaPercent, FaGift, FaClock, FaChevronLeft, FaChevronRight,
  FaToggleOn, FaToggleOff
} from 'react-icons/fa';

const offers = [
  { id: 1, name: 'New Year Sale', type: 'Percentage', value: 25, minPurchase: 1000, maxDiscount: 500, startDate: '2024-01-01', endDate: '2024-01-31', status: true, used: 456 },
  { id: 2, name: 'Free Shipping', type: 'Free Shipping', value: 0, minPurchase: 500, maxDiscount: 0, startDate: '2024-01-10', endDate: '2024-02-28', status: true, used: 1234 },
  { id: 3, name: 'Buy 1 Get 1 Free', type: 'BOGO', value: 100, minPurchase: 0, maxDiscount: 0, startDate: '2024-01-15', endDate: '2024-01-20', status: false, used: 89 },
  { id: 4, name: 'Flash Sale', type: 'Percentage', value: 50, minPurchase: 2000, maxDiscount: 1000, startDate: '2024-01-18', endDate: '2024-01-19', status: false, used: 234 },
  { id: 5, name: 'First Order Discount', type: 'Fixed', value: 200, minPurchase: 500, maxDiscount: 0, startDate: '2024-01-01', endDate: '2024-12-31', status: true, used: 567 },
];

export default function OffersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || 
                         (statusFilter === 'Active' && offer.status) ||
                         (statusFilter === 'Inactive' && !offer.status);
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOffers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOffers = filteredOffers.slice(indexOfFirstItem, indexOfLastItem);

  const activeOffers = offers.filter(o => o.status).length;
  const totalUsage = offers.reduce((sum, o) => sum + o.used, 0);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Percentage': return <FaPercent className="text-blue-600" />;
      case 'Fixed': return <FaTag className="text-green-600" />;
      case 'Free Shipping': return <FaGift className="text-purple-600" />;
      case 'BOGO': return <FaGift className="text-amber-600" />;
      default: return <FaTag className="text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Offers</h1>
          <p className="text-gray-500 mt-1">Manage promotional offers and discounts</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
          <FaPlus className="text-sm" />
          Create Offer
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Offers</p>
              <p className="text-2xl font-bold text-gray-900">{offers.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <FaTag className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Offers</p>
              <p className="text-2xl font-bold text-emerald-600">{activeOffers}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <FaCheck className="text-emerald-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Usage</p>
              <p className="text-2xl font-bold text-purple-600">{totalUsage}</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <FaGift className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Expired</p>
              <p className="text-2xl font-bold text-gray-600">{offers.filter(o => new Date(o.endDate) < new Date()).length}</p>
            </div>
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
              <FaClock className="text-gray-600 text-xl" />
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
              placeholder="Search offers..."
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
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Offers Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Offer Name</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Value</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Min Purchase</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Usage</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOffers.map((offer) => (
                <tr key={offer.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-semibold text-gray-900">{offer.name}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(offer.type)}
                      <span className="text-gray-600">{offer.type}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-gray-900">
                      {offer.type === 'Percentage' ? `${offer.value}%` : 
                       offer.type === 'Fixed' ? `৳${offer.value}` :
                       offer.type === 'Free Shipping' ? 'Free' : '100%'}
                    </span>
                    {offer.maxDiscount > 0 && (
                      <span className="text-gray-400 text-xs ml-1"> (Max ৳{offer.maxDiscount})</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">৳{offer.minPurchase}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm">
                      <span className="text-gray-500">{offer.startDate}</span>
                      <span className="text-gray-400 mx-1">-</span>
                      <span className="text-gray-500">{offer.endDate}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{offer.used} used</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      offer.status ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {offer.status ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                        <FaEdit className="text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <FaTrash className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredOffers.length)} of {filteredOffers.length}
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
