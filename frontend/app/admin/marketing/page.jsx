'use client';

import { useState } from 'react';
import { 
  FaSearch, FaPlus, FaEdit, FaTrash, FaEnvelope, FaBullhorn,
  FaUsers, FaChartLine, FaDesktop, FaMobileAlt, FaPaperPlane,
  FaChevronLeft, FaChevronRight, FaShareAlt, FaEnvelopeOpen
} from 'react-icons/fa';

const campaigns = [
  { id: 1, name: 'New Year Sale Announcement', type: 'Email', status: 'Sent', recipients: 12500, opens: 5625, clicks: 1875, sentDate: '2024-01-01', budget: 5000 },
  { id: 2, name: 'Flash Sale Alert', type: 'SMS', status: 'Scheduled', recipients: 8500, opens: 0, clicks: 0, sentDate: '2024-01-20', budget: 2000 },
  { id: 3, name: 'Product Launch - Electronics', type: 'Push Notification', status: 'Active', recipients: 15000, opens: 6750, clicks: 2250, sentDate: '2024-01-10', budget: 8000 },
  { id: 4, name: 'Winter Collection', type: 'Email', status: 'Draft', recipients: 0, opens: 0, clicks: 0, sentDate: '-', budget: 3000 },
  { id: 5, name: 'Cart Abandonment Reminder', type: 'Email', status: 'Active', recipients: 3500, opens: 2100, clicks: 875, sentDate: '2024-01-05', budget: 1500 },
  { id: 6, name: 'VIP Customer Exclusive', type: 'SMS', status: 'Sent', recipients: 2500, opens: 1875, clicks: 625, sentDate: '2024-01-12', budget: 1000 },
];

const subscribers = [
  { id: 1, email: 'rahim@example.com', name: 'Rahim Khan', status: 'Active', subscribed: '2023-06-15', campaigns: 12 },
  { id: 2, email: 'fatema@example.com', name: 'Fatema Begum', status: 'Active', subscribed: '2023-08-20', campaigns: 8 },
  { id: 3, email: 'john.doe@example.com', name: 'John Doe', status: 'Inactive', subscribed: '2023-01-10', campaigns: 24 },
  { id: 4, email: 'maria@example.com', name: 'Maria Islam', status: 'Active', subscribed: '2023-11-05', campaigns: 5 },
  { id: 5, email: 'ahmed@example.com', name: 'Ahmed Hasan', status: 'Active', subscribed: '2023-09-18', campaigns: 15 },
];

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const filteredCampaigns = campaigns.filter(campaign => 
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCampaigns = filteredCampaigns.slice(indexOfFirstItem, indexOfLastItem);

  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(c => c.status === 'Active').length;
  const totalRecipients = campaigns.reduce((sum, c) => sum + c.recipients, 0);
  const avgOpenRate = ((campaigns.reduce((sum, c) => sum + (c.opens / (c.recipients || 1)), 0) / campaigns.filter(c => c.recipients > 0).length) * 100).toFixed(1);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-700';
      case 'Sent': return 'bg-blue-100 text-blue-700';
      case 'Scheduled': return 'bg-amber-100 text-amber-700';
      case 'Draft': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Email': return <FaEnvelope className="text-blue-500" />;
      case 'SMS': return <FaMobileAlt className="text-green-500" />;
      case 'Push Notification': return <FaBullhorn className="text-purple-500" />;
      default: return <FaEnvelope className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketing</h1>
          <p className="text-gray-500 mt-1">Manage marketing campaigns and subscribers</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
          <FaPlus className="text-sm" />
          Create Campaign
        </button>
      </div>

      {/* Sub Pages Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <a href="/admin/marketing/campaigns" className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <FaBullhorn className="text-blue-600 text-2xl mb-2" />
          <h3 className="font-semibold text-gray-900">Campaigns</h3>
          <p className="text-sm text-gray-500">Email, SMS, Push</p>
        </a>
        <a href="/admin/marketing/conversion-stats" className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <FaChartLine className="text-purple-600 text-2xl mb-2" />
          <h3 className="font-semibold text-gray-900">Conversion Stats</h3>
          <p className="text-sm text-gray-500">Funnel Analytics</p>
        </a>
        <a href="/admin/marketing/affiliates" className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <FaUsers className="text-emerald-600 text-2xl mb-2" />
          <h3 className="font-semibold text-gray-900">Affiliates</h3>
          <p className="text-sm text-gray-500">Partner Management</p>
        </a>
        <a href="/admin/marketing/abandoned-carts" className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <FaEnvelope className="text-amber-600 text-2xl mb-2" />
          <h3 className="font-semibold text-gray-900">Abandoned Carts</h3>
          <p className="text-sm text-gray-500">Recovery Campaigns</p>
        </a>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`px-4 py-2.5 font-medium transition-colors border-b-2 ${
            activeTab === 'campaigns'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <FaBullhorn className="inline mr-2" />
          Campaigns
        </button>
        <button
          onClick={() => setActiveTab('subscribers')}
          className={`px-4 py-2.5 font-medium transition-colors border-b-2 ${
            activeTab === 'subscribers'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <FaUsers className="inline mr-2" />
          Subscribers
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">{totalCampaigns}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <FaBullhorn className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Campaigns</p>
              <p className="text-2xl font-bold text-emerald-600">{activeCampaigns}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <FaChartLine className="text-emerald-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Recipients</p>
              <p className="text-2xl font-bold text-purple-600">{totalRecipients.toLocaleString()}</p>
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
              <p className="text-2xl font-bold text-amber-600">{avgOpenRate}%</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <FaEnvelopeOpen className="text-amber-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={activeTab === 'campaigns' ? "Search campaigns..." : "Search subscribers..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Campaigns Table */}
      {activeTab === 'campaigns' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Campaign</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Recipients</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Opens</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Clicks</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
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
                      <span className="font-semibold text-gray-900">{campaign.recipients.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-600">{campaign.opens > 0 ? ((campaign.opens / campaign.recipients) * 100).toFixed(1) + '%' : '-'}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-600">{campaign.clicks > 0 ? ((campaign.clicks / campaign.recipients) * 100).toFixed(1) + '%' : '-'}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-500">{campaign.sentDate}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
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
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredCampaigns.length)} of {filteredCampaigns.length}
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
      )}

      {/* Subscribers Table */}
      {activeTab === 'subscribers' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Subscriber</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Subscribed</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Campaigns</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                          {subscriber.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-gray-900">{subscriber.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-600">{subscriber.email}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                        subscriber.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {subscriber.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-500">{subscriber.subscribed}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-gray-900">{subscriber.campaigns}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Send Email">
                          <FaPaperPlane className="text-blue-500" />
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
