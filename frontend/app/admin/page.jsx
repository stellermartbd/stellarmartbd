'use client';

import { 
  FaBox, FaShoppingCart, FaUsers, FaMoneyBillWave, 
  FaArrowUp, FaArrowDown, FaEye, FaEdit, FaTrash,
  FaDollarSign, FaPackage, FaCartPlus, FaUserPlus,
  FaChartLine, FaClock, FaCheckCircle, FaPending
} from 'react-icons/fa';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const stats = [
  { 
    title: 'Total Revenue', 
    value: '৳12,45,000', 
    change: '+12.5%', 
    icon: FaDollarSign, 
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  { 
    title: 'Total Orders', 
    value: '1,245', 
    change: '+8.2%', 
    icon: FaCartPlus, 
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  { 
    title: 'Total Products', 
    value: '856', 
    change: '+3.1%', 
    icon: FaPackage, 
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600'
  },
  { 
    title: 'Total Customers', 
    value: '5,234', 
    change: '+15.3%', 
    icon: FaUserPlus, 
    color: 'from-orange-500 to-amber-600',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600'
  },
];

const recentOrders = [
  { id: '#SM12345', customer: 'Rahul Ahmed', product: 'Wireless Headphones', amount: 2499, status: 'Pending', date: '2024-01-20', avatar: 'R' },
  { id: '#SM12344', customer: 'Sumon Khan', product: 'Smart Watch', amount: 1999, status: 'Processing', date: '2024-01-20', avatar: 'S' },
  { id: '#SM12343', customer: 'Alia Rahman', product: 'Leather Wallet', amount: 799, status: 'Shipped', date: '2024-01-19', avatar: 'A' },
  { id: '#SM12342', customer: 'Munna Mia', product: 'Bluetooth Speaker', amount: 1299, status: 'Delivered', date: '2024-01-19', avatar: 'M' },
  { id: '#SM12341', customer: 'Jewel Rana', product: 'USB Hub', amount: 699, status: 'Delivered', date: '2024-01-18', avatar: 'J' },
];

const topProducts = [
  { name: 'Wireless Headphones Pro', sold: 234, revenue: 584766, image: '🎧' },
  { name: 'Smart Watch Band 5', sold: 189, revenue: 377811, image: '⌚' },
  { name: 'Bluetooth Speaker Mini', sold: 156, revenue: 202644, image: '🔊' },
  { name: 'Premium Leather Wallet', sold: 123, revenue: 98277, image: '👛' },
];

const salesData = [
  { name: 'Mon', sales: 4000, orders: 240 },
  { name: 'Tue', sales: 3000, orders: 139 },
  { name: 'Wed', sales: 2000, orders: 980 },
  { name: 'Thu', sales: 2780, orders: 390 },
  { name: 'Fri', sales: 1890, orders: 480 },
  { name: 'Sat', sales: 2390, orders: 380 },
  { name: 'Sun', sales: 3490, orders: 430 },
];

const categoryData = [
  { name: 'Electronics', value: 45 },
  { name: 'Fashion', value: 30 },
  { name: 'Home', value: 15 },
  { name: 'Sports', value: 10 },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'Shipped':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Processing':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm">
            <FaChartLine className="inline mr-2" />
            View Reports
          </button>
          <button className="px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
            + Add Product
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bgColor}`}>
                <stat.icon className={`${stat.iconColor} text-xl`} />
              </div>
              <span className={`flex items-center text-sm font-semibold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {stat.change.startsWith('+') ? <FaArrowUp className="mr-1 text-xs" /> : <FaArrowDown className="mr-1 text-xs" />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Sales Overview</h2>
              <p className="text-sm text-gray-500">Weekly sales performance</p>
            </div>
            <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  formatter={(value) => [`৳${value}`, 'Sales']}
                />
                <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">Categories</h2>
            <p className="text-sm text-gray-500">Sales by category</p>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} width={80} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  formatter={(value) => [`${value}%`, 'Share']}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {categoryData.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{cat.name}</span>
                <span className="font-semibold text-gray-900">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
              <p className="text-sm text-gray-500">Latest customer orders</p>
            </div>
            <Link href="/admin/orders" className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
              View All <FaArrowUp className="rotate-45 text-xs" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-semibold text-blue-600">{order.id}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {order.avatar}
                        </div>
                        <span className="text-gray-700 font-medium">{order.customer}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-900">৳{order.amount}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Top Selling Products</h2>
              <p className="text-sm text-gray-500">Best performing products</p>
            </div>
            <Link href="/admin/products" className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
              View All <FaArrowUp className="rotate-45 text-xs" />
            </Link>
          </div>
          <div className="p-6 space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                    {product.image}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sold} sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">৳{product.revenue.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between mb-3">
            <FaCheckCircle className="text-2xl opacity-80" />
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Today</span>
          </div>
          <p className="text-2xl font-bold">45</p>
          <p className="text-sm opacity-80">Delivered</p>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between mb-3">
            <FaClock className="text-2xl opacity-80" />
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Today</span>
          </div>
          <p className="text-2xl font-bold">23</p>
          <p className="text-sm opacity-80">Pending</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between mb-3">
            <FaShoppingCart className="text-2xl opacity-80" />
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Today</span>
          </div>
          <p className="text-2xl font-bold">89</p>
          <p className="text-sm opacity-80">New Orders</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between mb-3">
            <FaUsers className="text-2xl opacity-80" />
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Today</span>
          </div>
          <p className="text-2xl font-bold">12</p>
          <p className="text-sm opacity-80">New Customers</p>
        </div>
      </div>
    </div>
  );
}
