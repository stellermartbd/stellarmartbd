'use client';

import { useState } from 'react';
import { 
  FaSearch, FaPlus, FaEdit, FaTrash, FaEnvelope, FaUsers,
  FaPaperPlane, FaChartLine, FaCalendar, FaCheck, FaTimes,
  FaChevronLeft, FaChevronRight, FaEnvelopeOpen, FaMailBulk
} from 'react-icons/fa';

const newsletters = [
  { id: 1, title: 'New Year Special Offers', subject: '🎉 Happy New Year! Special Discounts Inside', sentDate: '2024-01-01', recipients: 12500, opens: 6250, clicks: 1875, status: 'Sent' },
  { id: 2, title: 'Winter Collection Launch', subject: '❄️ Winter Collection - Stay Warm This Season', sentDate: '2024-01-10', recipients: 11000, opens: 4950, clicks: 1485, status: 'Sent' },
  { id: 3, title: 'Flash Sale Alert', subject: '⚡ 24-Hour Flash Sale - Up to 50% Off!', sentDate: '2024-01-18', recipients: 15000, opens: 8250, clicks: 3000, status: 'Sent' },
  { id: 4, title: 'Product Recommendations', subject: '🎁 Products You Might Love', scheduledDate: '2024-01-25', recipients: 0, opens: 0, clicks: 0, status: 'Scheduled' },
  { id: 5, title: 'Monthly Newsletter', subject: '📰 Your Monthly Dose of StellarMart Updates', recipients: 0, opens: 0, clicks: 0, status: 'Draft' },
];

const subscribers = [
  { id: 1, email: 'rahim@example.com', name: 'Rahim Khan', status: 'Subscribed', date: '2023-06-15', opens: 45 },
  { id: 2, email: 'fatema@example.com', name: 'Fatema Begum', status: 'Subscribed', date: '2023-08-20', opens: 38 },
  { id: 3, email: 'john.doe@example.com', name: 'John Doe', status: 'Unsubscribed', date: '2023-01-10', opens: 12 },
  { id: 4, email: 'maria@example.com', name: 'Maria Islam', status: 'Subscribed', date: '2023-11-05', opens: 28 },
  { id: 5, email: 'ahmed@example.com', name: 'Ahmed Hasan', status: 'Subscribed', date: '2023-09-18', opens: 52 },
];

export default function NewsletterPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const filteredNewsletters = newsletters.filter(newsletter => 
    newsletter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    newsletter.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredNewsletters.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNewsletters = filteredNewsletters.slice(indexOfFirstItem, indexOfLastItem);

  const totalNewsletters = newsletters.length;
  const totalSubscribers = subscribers.filter(s => s.status === 'Subscribed').length;
  const avgOpenRate = '48.5%';
  const avgClickRate = '15.2%';

  const getStatusColor = (status) => {
    switch (status) {
      case 'Sent': return 'bg-blue-100 text-blue-700';
      case 'Scheduled': return 'bg-amber-100 text-amber-700';
      case 'Draft': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Newsletter</h1>
          <p className="text-gray-500 mt-1">Manage email newsletters and subscribers</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
          <FaPlus className="text-sm" />
          Create Newsletter
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Newsletters</p>
              <p className="text-2xl font-bold text-gray-900">{totalNewsletters}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <FaMailBulk className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Subscribers</p>
              <p className="text-2xl font-bold text-emerald-600">{totalSubscribers}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <FaUsers className="text-emerald-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Open Rate</p>
              <p className="text-2xl font-bold text-purple-600">{avgOpenRate}</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <FaEnvelopeOpen className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Click Rate</p>
              <p className="text-2xl font-bold text-amber-600">{avgClickRate}</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <FaChartLine className="text-amber-600 text-xl" />
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
            placeholder="Search newsletters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Newsletters Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Newsletter</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Recipients</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Opens</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Clicks</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentNewsletters.map((newsletter) => (
                <tr key={newsletter.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                        <FaEnvelope />
                      </div>
                      <span className="font-semibold text-gray-900">{newsletter.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600 text-sm">{newsletter.subject}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-gray-900">{newsletter.recipients.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{newsletter.opens > 0 ? ((newsletter.opens / newsletter.recipients) * 100).toFixed(1) + '%' : '-'}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{newsletter.clicks > 0 ? ((newsletter.clicks / newsletter.recipients) * 100).toFixed(1) + '%' : '-'}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-500">{newsletter.sentDate || newsletter.scheduledDate || '-'}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(newsletter.status)}`}>
                      {newsletter.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                        <FaEdit className="text-gray-500" />
                      </button>
                      {newsletter.status === 'Draft' && (
                        <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors" title="Send Now">
                          <FaPaperPlane className="text-blue-500" />
                        </button>
                      )}
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
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredNewsletters.length)} of {filteredNewsletters.length}
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

      {/* Subscribers Section */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Subscribers</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Subscriber</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Email</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Subscribed</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Opens</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {subscriber.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{subscriber.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{subscriber.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      subscriber.status === 'Subscribed' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {subscriber.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500">{subscriber.date}</td>
                  <td className="py-3 px-4 text-gray-600">{subscriber.opens}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
