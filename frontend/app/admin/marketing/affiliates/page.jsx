'use client';

import { useState } from 'react';
import { 
  FaUserPlus, FaSearch, FaPlus, FaEdit, FaTrash, FaCheck, FaTimes,
  FaLink, FaPercentage, FaMoneyBillWave, FaChevronLeft, FaChevronRight
} from 'react-icons/fa';

const affiliates = [
  { id: 1, name: 'Rahim Khan', email: 'rahim@example.com', status: 'Active', referrals: 145, sales: 250000, commission: 25000, joinDate: '2023-06-15', code: 'RAHIM24' },
  { id: 2, name: 'Fatema Begum', email: 'fatema@example.com', status: 'Active', referrals: 89, sales: 180000, commission: 18000, joinDate: '2023-08-20', code: 'FATEMA24' },
  { id: 3, name: 'Ahmed Hasan', email: 'ahmed@example.com', status: 'Active', referrals: 67, sales: 120000, commission: 12000, joinDate: '2023-09-10', code: 'AHMED24' },
  { id: 4, name: 'Maria Islam', email: 'maria@example.com', status: 'Pending', referrals: 0, sales: 0, commission: 0, joinDate: '2024-01-10', code: 'MARIA24' },
  { id: 5, name: 'John Doe', email: 'john@example.com', status: 'Inactive', referrals: 23, sales: 45000, commission: 4500, joinDate: '2023-03-05', code: 'JOHN24' },
];

export default function AffiliatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const filteredAffiliates = affiliates.filter(affiliate => {
    const matchesSearch = affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         affiliate.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || affiliate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredAffiliates.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAffiliates = filteredAffiliates.slice(indexOfFirstItem, indexOfLastItem);

  const totalAffiliates = affiliates.length;
  const activeAffiliates = affiliates.filter(a => a.status === 'Active').length;
  const totalSales = affiliates.reduce((sum, a) => sum + a.referrals, 0);
  const totalCommission = affiliates.reduce((sum, a) => sum + a.sales, 0);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-700';
      case 'Pending': return 'bg-amber-100 text-amber-700';
      case 'Inactive': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Affiliates</h1>
          <p className="text-gray-500 mt-1">Manage affiliate partners and commissions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
          <FaUserPlus className="text-sm" />
          Add Affiliate
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Affiliates</p>
              <p className="text-2xl font-bold text-gray-900">{totalAffiliates}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <FaUserPlus className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active</p>
              <p className="text-2xl font-bold text-emerald-600">{activeAffiliates}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <FaCheck className="text-emerald-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Referrals</p>
              <p className="text-2xl font-bold text-purple-600">{totalSales}</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <FaLink className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Commission Rate</p>
              <p className="text-2xl font-bold text-amber-600">10%</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <FaPercentage className="text-amber-600 text-xl" />
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
              placeholder="Search affiliates..."
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
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Affiliate</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Code</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Referrals</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Sales</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Commission</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentAffiliates.map((affiliate) => (
                <tr key={affiliate.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-semibold text-gray-900">{affiliate.name}</p>
                      <p className="text-sm text-gray-500">{affiliate.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded font-mono text-sm">{affiliate.code}</span>
                  </td>
                  <td className="py-4 px-6 text-gray-900 font-semibold">{affiliate.referrals}</td>
                  <td className="py-4 px-6 text-gray-900">Tk {affiliate.sales.toLocaleString()}</td>
                  <td className="py-4 px-6 text-emerald-600 font-semibold">Tk {affiliate.commission.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(affiliate.status)}`}>
                      {affiliate.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg" title="Edit">
                        <FaEdit className="text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-blue-50 rounded-lg" title="Copy Link">
                        <FaLink className="text-blue-500" />
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
