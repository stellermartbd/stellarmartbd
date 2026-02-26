'use client';

import { useState } from 'react';
import { 
  FaShippingFast, FaSearch, FaPlus, FaEdit, FaTrash, FaCheck, FaTimes,
  FaMapMarkerAlt, FaTruck, FaClock, FaDollarSign, FaChevronLeft, FaChevronRight,
  FaToggleOn, FaToggleOff
} from 'react-icons/fa';

const shippingZones = [
  { id: 1, name: 'Dhaka Metro', regions: ['Dhaka', 'Gazipur', 'Narayanganj'], method: 'Express Delivery', price: 60, freeShipping: 5000, estimatedDays: '1-2 days', status: true },
  { id: 2, name: 'Chittagong Metro', regions: ['Chittagong', 'Feni'], method: 'Express Delivery', price: 80, freeShipping: 5000, estimatedDays: '1-2 days', status: true },
  { id: 3, name: 'Other Major Cities', regions: ['Sylhet', 'Khulna', 'Barisal', 'Rangpur'], method: 'Standard Delivery', price: 120, freeShipping: 8000, estimatedDays: '2-4 days', status: true },
  { id: 4, name: 'Rest of Bangladesh', regions: ['All other districts'], method: 'Standard Delivery', price: 150, freeShipping: 10000, estimatedDays: '4-7 days', status: true },
  { id: 5, name: 'International - SAARC', regions: ['India', 'Nepal', 'Bhutan', 'Sri Lanka', 'Pakistan'], method: 'International', price: 500, freeShipping: 0, estimatedDays: '7-14 days', status: false },
];

const carriers = [
  { id: 1, name: 'SSL Wireless', logo: '📦', status: 'Active', rate: '৳15/order', tracking: true },
  { id: 2, name: 'Pathao', logo: '🛵', status: 'Active', rate: '৳12/order', tracking: true },
  { id: 3, name: 'Steadfast', logo: '🚚', status: 'Active', rate: '৳10/order', tracking: true },
  { id: 4, name: 'Paperfly', logo: '📱', status: 'Inactive', rate: '৳12/order', tracking: true },
];

const recentShipments = [
  { id: 'ORD-1234', customer: 'Rahim Khan', destination: 'Dhaka Metro', carrier: 'SSL Wireless', status: 'Delivered', date: '2024-01-15', cost: 60 },
  { id: 'ORD-1235', customer: 'Fatema Begum', destination: 'Chittagong', carrier: 'Pathao', status: 'In Transit', date: '2024-01-15', cost: 80 },
  { id: 'ORD-1236', customer: 'Ahmed Hasan', destination: 'Sylhet', carrier: 'Steadfast', status: 'Pending', date: '2024-01-14', cost: 120 },
  { id: 'ORD-1237', customer: 'Maria Islam', destination: 'Khulna', carrier: 'SSL Wireless', status: 'Shipped', date: '2024-01-14', cost: 120 },
  { id: 'ORD-1238', customer: 'John Doe', destination: 'Dhaka Metro', carrier: 'Pathao', status: 'Delivered', date: '2024-01-13', cost: 60 },
];

export default function ShippingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const filteredZones = shippingZones.filter(zone => 
    zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    zone.regions.some(r => r.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredZones.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentZones = filteredZones.slice(indexOfFirstItem, indexOfLastItem);

  const totalShipments = recentShipments.length;
  const delivered = recentShipments.filter(s => s.status === 'Delivered').length;
  const inTransit = recentShipments.filter(s => s.status === 'In Transit' || s.status === 'Shipped').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shipping</h1>
          <p className="text-gray-500 mt-1">Manage shipping zones, carriers, and shipments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
          <FaPlus className="text-sm" />
          Add Shipping Zone
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Shipments</p>
              <p className="text-2xl font-bold text-gray-900">{totalShipments}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <FaShippingFast className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Delivered</p>
              <p className="text-2xl font-bold text-emerald-600">{delivered}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <FaCheck className="text-emerald-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">In Transit</p>
              <p className="text-2xl font-bold text-amber-600">{inTransit}</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <FaTruck className="text-amber-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Zones</p>
              <p className="text-2xl font-bold text-purple-600">{shippingZones.filter(z => z.status).length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <FaMapMarkerAlt className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Zones */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Shipping Zones</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Zone Name</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Regions</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Delivery Charge</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Free Shipping</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Est. Days</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentZones.map((zone) => (
                <tr key={zone.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                        <FaMapMarkerAlt className="text-blue-600" />
                      </div>
                      <span className="font-semibold text-gray-900">{zone.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {zone.regions.slice(0, 2).map((region, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {region}
                        </span>
                      ))}
                      {zone.regions.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          +{zone.regions.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-gray-900">৳{zone.price}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">
                      {zone.freeShipping > 0 ? `৳${zone.freeShipping}+` : 'N/A'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1 text-gray-600">
                      <FaClock className="text-xs" />
                      <span>{zone.estimatedDays}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {zone.status ? (
                      <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                        <FaCheck className="text-xs" /> Active
                      </span>
                    ) : (
                      <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                        <FaTimes className="text-xs" /> Inactive
                      </span>
                    )}
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
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredZones.length)} of {filteredZones.length}
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

      {/* Carriers */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Carriers</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
          {carriers.map((carrier) => (
            <div key={carrier.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="text-3xl">{carrier.logo}</div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  carrier.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {carrier.status}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{carrier.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Rate:</span>
                  <span className="font-medium text-gray-900">{carrier.rate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tracking:</span>
                  <span className="font-medium text-emerald-600">{carrier.tracking ? 'Enabled' : 'Disabled'}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Configure
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Shipments */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Recent Shipments</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Destination</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Carrier</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Cost</th>
              </tr>
            </thead>
            <tbody>
              {recentShipments.map((shipment) => (
                <tr key={shipment.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-semibold text-blue-600">{shipment.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-900">{shipment.customer}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{shipment.destination}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{shipment.carrier}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      shipment.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                      shipment.status === 'In Transit' ? 'bg-amber-100 text-amber-700' :
                      shipment.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {shipment.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-500">{shipment.date}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-gray-900">৳{shipment.cost}</span>
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
