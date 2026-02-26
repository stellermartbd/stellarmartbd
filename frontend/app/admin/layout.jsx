'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaBars, FaTachometerAlt, FaBox, FaTags, 
  FaShoppingCart, FaUsers, FaCog, FaChartBar, 
  FaEnvelope, FaBell, FaSignOutAlt, FaChevronRight,
  FaDatabase, FaBullhorn, FaTruck, FaQuestionCircle,
  FaFileAlt, FaPercentage, FaNewspaper, FaTools
} from 'react-icons/fa';

const adminNavItems = [
  { icon: FaTachometerAlt, label: 'Dashboard', href: '/admin' },
  { 
    icon: FaBox, 
    label: 'Products', 
    href: '/admin/products',
    subItems: [
      { label: 'All Products', href: '/admin/products' },
      { label: 'Add Product', href: '/admin/products/add' },
      { label: 'Categories', href: '/admin/categories' },
      { label: 'Brands', href: '/admin/brands' },
      { label: 'Inventory', href: '/admin/inventory' },
    ]
  },
  { icon: FaShoppingCart, label: 'Orders', href: '/admin/orders' },
  { icon: FaUsers, label: 'Customers', href: '/admin/customers' },
  { icon: FaTags, label: 'Coupons', href: '/admin/coupons' },
  { icon: FaPercentage, label: 'Offers', href: '/admin/offers' },
  { icon: FaChartBar, label: 'Reports', href: '/admin/reports' },
  { icon: FaDatabase, label: 'Analytics', href: '/admin/analytics' },
  { icon: FaBullhorn, label: 'Marketing', href: '/admin/marketing' },
  { icon: FaTruck, label: 'Shipping', href: '/admin/shipping' },
  { icon: FaEnvelope, label: 'Messages', href: '/admin/messages' },
  { icon: FaFileAlt, label: 'FAQ', href: '/admin/faqs' },
  { icon: FaNewspaper, label: 'Newsletter', href: '/admin/newsletter' },
  { icon: FaCog, label: 'Settings', href: '/admin/settings' },
  { icon: FaTools, label: 'Maintenance', href: '/admin/maintenance' },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const pathname = usePathname();

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const isActive = (href) => pathname === href;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaBars className="text-gray-600" />
          </button>
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
              S
            </div>
            <span className="font-bold text-lg text-gray-800 hidden md:block">StellarMart</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors relative">
            <FaBell className="text-gray-600 text-lg" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors relative">
            <FaEnvelope className="text-gray-600 text-lg" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="h-8 w-px bg-gray-200 mx-1 hidden lg:block"></div>
          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
              A
            </div>
            <div className="hidden lg:block">
              <p className="font-semibold text-sm text-gray-800">Admin</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 bottom-0 bg-white border-r border-gray-200 z-40 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0 -left-64 overflow-hidden'}`}>
        <div className="p-4 h-full overflow-y-auto">
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Main Menu</p>
            <nav className="space-y-1">
              {adminNavItems.slice(0, 5).map((item, index) => (
                <div key={index}>
                  {item.subItems ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(index)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 ${activeDropdown === index ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="text-sm" />
                          <span className="font-medium text-sm">{item.label}</span>
                        </div>
                        <FaChevronRight className={`text-xs transition-transform duration-200 ${activeDropdown === index ? 'rotate-90' : ''}`} />
                      </button>
                      {activeDropdown === index && (
                        <div className="ml-5 mt-1 space-y-0.5 border-l-2 border-gray-100 pl-3">
                          {item.subItems.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.href}
                              className={`block px-3 py-2 text-sm rounded-lg transition-colors ${isActive(subItem.href) ? 'text-blue-600 bg-blue-50 font-medium' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${isActive(item.href) ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                    >
                      <item.icon className="text-sm" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Management</p>
            <nav className="space-y-1">
              {adminNavItems.slice(5, 10).map((item, index) => (
                <div key={index + 5}>
                  {item.subItems ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(index + 5)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 ${activeDropdown === index + 5 ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="text-sm" />
                          <span className="font-medium text-sm">{item.label}</span>
                        </div>
                        <FaChevronRight className={`text-xs transition-transform duration-200 ${activeDropdown === index + 5 ? 'rotate-90' : ''}`} />
                      </button>
                      {activeDropdown === index + 5 && (
                        <div className="ml-5 mt-1 space-y-0.5 border-l-2 border-gray-100 pl-3">
                          {item.subItems.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.href}
                              className={`block px-3 py-2 text-sm rounded-lg transition-colors ${isActive(subItem.href) ? 'text-blue-600 bg-blue-50 font-medium' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${isActive(item.href) ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                    >
                      <item.icon className="text-sm" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Support</p>
            <nav className="space-y-1">
              {adminNavItems.slice(10).map((item, index) => (
                <Link
                  key={index + 10}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${isActive(item.href) ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                >
                  <item.icon className="text-sm" />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
          
          <hr className="my-4 border-gray-100" />
          
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all duration-200">
            <FaSignOutAlt className="text-sm" />
            <span className="font-medium text-sm">Back to Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
