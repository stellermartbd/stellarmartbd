'use client';

import { useState } from 'react';
import { 
  FaBullhorn, FaSearch, FaPlus, FaEdit, FaTrash, FaPlay, FaPause,
  FaChartLine, FaUsers, FaEnvelope, FaChevronLeft, FaChevronRight
} from 'react-icons/fa';

const campaigns = [
  { id: 1, name: 'New Year Sale 2024', type: 'Email', status: 'Active', audience: 12500, sent: 12000, opened: 4800, clicked: 1200, startDate: '2024-01-01', endDate: '2024-01-31' },
  { id: 2, name: 'Winter Collection Launch', type: 'SMS', status: 'Completed', audience: 8500, sent: 8500, opened: 6800, clicked: 0, startDate: '2024-01-10', endDate: '2024-01-15' },
  { id: 3, name: 'Flash Sale Alert', type: 'Push', status: 'Scheduled', audience: 15000, sent: 0, opened: 0, clicked: 0, startDate: '2024-01-20', endDate: '2024-01-21' },
  { id: 4, name: 'Product Launch - Electronics', type: 'Email', status: 'Draft', audience: 5000, sent: 0, opened: 0, clicked: 0, startDate: '2024-02-01', endDate: '2024-02-07' },
  { id: 5, name: 'Abandoned Cart Recovery', type: 'Email', status: 'Active', audience: 2500, sent: 2500, opened: 1250, clicked: 625, startDate: '2024-01-01', endDate: '2024-12-31' },
];

export default function CampaignsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCampaigns = filteredCampaigns.slice(indexOfFirstItem, indexOfLastItem);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-700';
      case 'Completed': return 'bg-blue-100 text-blue-700';
      case 'Scheduled': return 'bg-amber-100 text-amber-700';
      case 'Draft': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Email': return <FaEnvelope className="text-blue-600" />;
      case 'SMS': return <span className="text-green-600">📱</span>;
      case 'Push': return <span className="text-orange-600">🔔</span>;
      default: return <FaBullhorn className="text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-500 mt-1">Manage marketing campaigns</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
          <FaPlus className="text-sm" />
          Create Campaign
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">{campaigns.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <FaBullhorn className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active</p>
              <p className="text-2xl font-bold text-emerald-600">{campaigns.filter(c => c.status === 'Active').length}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <FaPlay className="text-emerald-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Sent</p>
              <p className="text-2xl font-bold text-purple-600">{campaigns.reduce((s, c) => s + c.sent, 0).toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <FaUsers className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Open Rate</p>
              <p className="text-2xl font-bold text-amber-600">42.5%</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <FaChartLine className="text-amber-600 text-xl" />
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
              placeholder="Search campaigns..."
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
            <option value="Completed">Completed</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Campaign</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Type</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Audience</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Open Rate</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Duration</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCampaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-4 px-6">
                    <span className="font-semibold text-gray-900">{campaign.name}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(campaign.type)}
                      <span className="text-gray-600">{campaign.type}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{campaign.audience.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">
                      {campaign.sent > 0 ? ((campaign.opened / campaign.sent) * 100).toFixed(1) + '%' : '-'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-500 text-sm">
                    {campaign.startDate} - {campaign.endDate}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg" title="Edit">
                        <FaEdit className="text-gray-500" />
                      </button>
                      {campaign.status === 'Active' ? (
                        <button className="p-2 hover:bg-amber-50 rounded-lg" title="Pause">
                          <FaPause className="text-amber-500" />
                        </button>
                      ) : campaign.status === 'Scheduled' || campaign.status === 'Draft' ? (
                        <button className="p-2 hover:bg-emerald-50 rounded-lg" title="Start">
                          <FaPlay className="text-emerald-500" />
                        </button>
                      ) : null}
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
