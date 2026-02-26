'use client';

import { useState } from 'react';
import { 
  FaBox, FaSearch, FaPlus, FaEdit, FaTrash, FaCheck, FaTimes,
  FaWarehouse, FaExclamationTriangle, FaChevronLeft, FaChevronRight,
  FaArrowUp, FaArrowDown, FaFilter
} from 'react-icons/fa';

const inventoryItems = [
  { id: 1, sku: 'WHP-001', name: 'Wireless Headphones Pro', category: 'Electronics', stock: 145, minStock: 20, price: 2499, status: 'In Stock' },
  { id: 2, sku: 'SWB-002', name: 'Smart Watch Band 5', category: 'Electronics', stock: 8, minStock: 15, price: 1999, status: 'Low Stock' },
  { id: 3, sku: 'BSM-003', name: 'Bluetooth Speaker Mini', category: 'Electronics', stock: 67, minStock: 25, price: 1299, status: 'In Stock' },
  { id: 4, sku: 'UH7-004', name: 'USB Hub 7-Port', category: 'Accessories', stock: 234, minStock: 50, price: 699, status: 'In Stock' },
  { id: 5, sku: 'LSA-005', name: 'Laptop Stand Aluminum', category: 'Accessories', stock: 0, minStock: 10, price: 1499, status: 'Out of Stock' },
  { id: 6, sku: 'WMS-006', name: 'Wireless Mouse', category: 'Accessories', stock: 189, minStock: 30, price: 899, status: 'In Stock' },
  { id: 7, sku: 'MKR-007', name: 'Mechanical Keyboard RGB', category: 'Electronics', stock: 12, minStock: 15, price: 3499, status: 'Low Stock' },
];

const categories = ['Electronics', 'Accessories', 'Clothing', 'Home & Garden', 'Sports'];

const stockMovements = [
  { id: 1, item: 'Wireless Headphones Pro', type: 'Stock In', quantity: 50, date: '2024-01-15', note: 'New shipment received' },
  { id: 2, item: 'Smart Watch Band 5', type: 'Stock Out', quantity: 15, date: '2024-01-15', note: 'Order fulfillment' },
  { id: 3, item: 'USB Hub 7-Port', type: 'Stock In', quantity: 100, date: '2024-01-14', note: 'Restock order' },
  { id: 4, item: 'Bluetooth Speaker Mini', type: 'Adjustment', quantity: -3, date: '2024-01-14', note: 'Damaged items removed' },
];

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesStock = stockFilter === 'All' || 
                       (stockFilter === 'In Stock' && item.status === 'In Stock') ||
                       (stockFilter === 'Low Stock' && item.status === 'Low Stock') ||
                       (stockFilter === 'Out of Stock' && item.status === 'Out of Stock');
    return matchesSearch && matchesCategory && matchesStock;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalProducts = inventoryItems.length;
  const totalStock = inventoryItems.reduce((sum, item) => sum + item.stock, 0);
  const lowStock = inventoryItems.filter(i => i.status === 'Low Stock').length;
  const outOfStock = inventoryItems.filter(i => i.status === 'Out of Stock').length;

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return 'bg-emerald-100 text-emerald-700';
      case 'Low Stock': return 'bg-amber-100 text-amber-700';
      case 'Out of Stock': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
          <p className="text-gray-500 mt-1">Manage your product inventory and stock levels</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
          <FaPlus className="text-sm" />
          Add Stock
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <FaBox className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Stock</p>
              <p className="text-2xl font-bold text-emerald-600">{totalStock}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <FaWarehouse className="text-emerald-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Low Stock</p>
              <p className="text-2xl font-bold text-amber-600">{lowStock}</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <FaExclamationTriangle className="text-amber-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">{outOfStock}</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
              <FaExclamationTriangle className="text-red-600 text-xl" />
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
              placeholder="Search by product name or SKU..."
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
            <option value="All">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Stock Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Min Stock</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-mono text-sm text-gray-600">{item.sku}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-gray-900">{item.name}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{item.category}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`font-semibold ${item.stock <= item.minStock ? 'text-amber-600' : 'text-gray-900'}`}>
                      {item.stock}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-500">{item.minStock}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-gray-900">৳{item.price}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                        <FaEdit className="text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors" title="Add Stock">
                        <FaPlus className="text-blue-500" />
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
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredItems.length)} of {filteredItems.length}
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

      {/* Stock Movements */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Recent Stock Movements</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Item</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Note</th>
              </tr>
            </thead>
            <tbody>
              {stockMovements.map((movement) => (
                <tr key={movement.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-semibold text-gray-900">{movement.item}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      movement.type === 'Stock In' ? 'bg-emerald-100 text-emerald-700' :
                      movement.type === 'Stock Out' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {movement.type}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1">
                      {movement.type === 'Stock In' || (movement.type === 'Adjustment' && movement.quantity > 0) ? (
                        <FaArrowUp className="text-emerald-600 text-xs" />
                      ) : (
                        <FaArrowDown className="text-red-600 text-xs" />
                      )}
                      <span className={`font-semibold ${
                        movement.type === 'Stock In' || (movement.type === 'Adjustment' && movement.quantity > 0) ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {Math.abs(movement.quantity)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-500">{movement.date}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{movement.note}</span>
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
