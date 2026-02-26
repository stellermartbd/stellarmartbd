'use client';

import { useState } from 'react';
import { 
  FaQuestionCircle, FaSearch, FaPlus, FaEdit, FaTrash, FaCheck, FaTimes,
  FaChevronDown, FaChevronUp, FaEye, FaChevronLeft, FaChevronRight
} from 'react-icons/fa';

const faqs = [
  { id: 1, question: 'How do I place an order?', answer: 'To place an order, simply browse our products, add items to your cart, and proceed to checkout. You can pay using bKash, Nagad, or credit/debit cards.', category: 'Ordering', status: 'Published', views: 1250 },
  { id: 2, question: 'What is the delivery time?', answer: 'Delivery time varies by location. Dhaka Metro: 1-2 days, Major Cities: 2-4 days, Other Areas: 4-7 days.', category: 'Delivery', status: 'Published', views: 890 },
  { id: 3, question: 'How can I track my order?', answer: 'You can track your order using the tracking number sent to your phone/email. Visit our tracking page or use our mobile app.', category: 'Delivery', status: 'Published', views: 756 },
  { id: 4, question: 'What is your return policy?', answer: 'We offer a 7-day return policy for most products. Items must be unused and in original packaging.', category: 'Returns', status: 'Published', views: 567 },
  { id: 5, question: 'How do I contact customer support?', answer: 'You can reach us via live chat, email at support@stellarmart.com, or call our hotline at 1234.', category: 'Support', status: 'Published', views: 434 },
  { id: 6, question: 'Do you offer cash on delivery?', answer: 'Yes, we offer cash on delivery for orders within Bangladesh.', category: 'Payment', status: 'Draft', views: 0 },
  { id: 7, question: 'How can I become a seller?', answer: 'To become a seller, register on our seller portal and complete the verification process.', category: 'Selling', status: 'Published', views: 321 },
];

const categories = ['All', 'Ordering', 'Delivery', 'Returns', 'Support', 'Payment', 'Selling'];

export default function FAQsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || faq.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || faq.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFaqs = filteredFaqs.slice(indexOfFirstItem, indexOfLastItem);

  const totalFaqs = faqs.length;
  const published = faqs.filter(f => f.status === 'Published').length;
  const totalViews = faqs.reduce((sum, f) => sum + f.views, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FAQs</h1>
          <p className="text-gray-500 mt-1">Manage frequently asked questions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
          <FaPlus className="text-sm" />
          Add FAQ
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total FAQs</p>
              <p className="text-2xl font-bold text-gray-900">{totalFaqs}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <FaQuestionCircle className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Published</p>
              <p className="text-2xl font-bold text-emerald-600">{published}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <FaCheck className="text-emerald-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Views</p>
              <p className="text-2xl font-bold text-purple-600">{totalViews.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <FaEye className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Categories</p>
              <p className="text-2xl font-bold text-amber-600">{categories.length - 1}</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <FaQuestionCircle className="text-amber-600 text-xl" />
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
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </div>

      {/* FAQs List */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {currentFaqs.map((faq) => (
            <div key={faq.id} className="p-6">
              <div 
                className="flex items-start justify-between cursor-pointer"
                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {faq.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      faq.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {faq.status}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg">{faq.question}</h3>
                  {expandedId === faq.id && (
                    <p className="text-gray-600 mt-3">{faq.answer}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {faq.views > 0 && (
                    <span className="text-sm text-gray-400 mr-2">
                      <FaEye className="inline mr-1" /> {faq.views}
                    </span>
                  )}
                  {expandedId === faq.id ? (
                    <FaChevronUp className="text-gray-400" />
                  ) : (
                    <FaChevronDown className="text-gray-400" />
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-50">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                  <FaEdit className="text-gray-500" />
                </button>
                <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                  <FaTrash className="text-red-500" />
                </button>
                {faq.status === 'Draft' ? (
                  <button className="p-2 hover:bg-emerald-50 rounded-lg transition-colors" title="Publish">
                    <FaCheck className="text-emerald-500" />
                  </button>
                ) : (
                  <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors" title="Unpublish">
                    <FaTimes className="text-gray-500" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredFaqs.length)} of {filteredFaqs.length}
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
