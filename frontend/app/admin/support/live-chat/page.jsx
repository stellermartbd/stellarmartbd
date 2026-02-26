'use client';

import { useState } from 'react';
import { 
  FaComments, FaSearch, FaFilter, FaCircle, FaPaperPlane, FaFile,
  FaUser, FaClock, FaCheckCircle, FaTimesCircle
} from 'react-icons/fa';

const activeChats = [
  { id: 1, customer: 'Rahim Khan', message: 'Hi, I need help with my order', time: '2 min ago', status: 'Waiting' },
  { id: 2, customer: 'Fatema Begum', message: 'Is this product available in blue?', time: '5 min ago', status: 'In Chat' },
  { id: 3, customer: 'Ahmed Hasan', message: 'I want to return my order', time: '10 min ago', status: 'In Chat' },
];

const chatHistory = [
  { id: 101, customer: 'Maria Islam', agent: 'Agent 1', messages: 12, duration: '15 min', status: 'Resolved', date: '2024-01-15' },
  { id: 102, customer: 'John Doe', agent: 'Agent 2', messages: 8, duration: '8 min', status: 'Resolved', date: '2024-01-15' },
  { id: 103, customer: 'Sarah Ahmed', agent: 'Agent 1', messages: 15, duration: '22 min', status: 'Resolved', date: '2024-01-14' },
  { id: 104, customer: 'Kamal Hossain', agent: 'Agent 3', messages: 6, duration: '5 min', status: 'Resolved', date: '2024-01-14' },
];

export default function LiveChatPage() {
  const [selectedChat, setSelectedChat] = useState(activeChats[0]);
  const [message, setMessage] = useState('');

  const todayChats = 45;
  const avgResponseTime = '1.5 min';
  const satisfactionRate = '92%';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Live Chat</h1>
          <p className="text-gray-500 mt-1">Manage live customer chat conversations</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Chats</p>
              <p className="text-2xl font-bold text-blue-600">{activeChats.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <FaComments className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Today's Chats</p>
              <p className="text-2xl font-bold text-purple-600">{todayChats}</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <FaComments className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Response</p>
              <p className="text-2xl font-bold text-amber-600">{avgResponseTime}</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <FaClock className="text-amber-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Satisfaction</p>
              <p className="text-2xl font-bold text-emerald-600">{satisfactionRate}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <FaCheckCircle className="text-emerald-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat List */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="divide-y divide-gray-50 max-h-[500px] overflow-y-auto">
            {activeChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedChat.id === chat.id ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {chat.customer.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">{chat.customer}</span>
                      <span className="text-xs text-gray-400">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{chat.message}</p>
                    <span className={`inline-flex items-center gap-1 text-xs mt-1 ${
                      chat.status === 'Waiting' ? 'text-amber-600' : 'text-emerald-600'
                    }`}>
                      <FaCircle className="text-xs" /> {chat.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {selectedChat.customer.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{selectedChat.customer}</h3>
                <p className="text-sm text-gray-500">{selectedChat.status}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <FaFile className="text-gray-500" />
              </button>
            </div>
          </div>

          <div className="p-4 h-[350px] overflow-y-auto space-y-4">
            <div className="flex justify-start">
              <div className="max-w-[70%] bg-gray-100 rounded-2xl px-4 py-2">
                <p className="text-gray-900">{selectedChat.message}</p>
                <span className="text-xs text-gray-400">{selectedChat.time}</span>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[70%] bg-blue-600 text-white rounded-2xl px-4 py-2">
                <p>Hello! How can I help you today?</p>
                <span className="text-xs text-blue-200">Just now</span>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat History */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Chat History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Agent</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Messages</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Duration</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody>
              {chatHistory.map((chat) => (
                <tr key={chat.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-4 px-6 font-medium text-gray-900">{chat.customer}</td>
                  <td className="py-4 px-6 text-gray-600">{chat.agent}</td>
                  <td className="py-4 px-6 text-gray-600">{chat.messages}</td>
                  <td className="py-4 px-6 text-gray-600">{chat.duration}</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                      {chat.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-500">{chat.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
