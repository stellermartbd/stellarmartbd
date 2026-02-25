'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'হোম', href: '/' },
    { name: 'পণ্যসমূহ', href: '/products' },
    { name: 'ক্যাটাগরি', href: '/categories' },
    { name: 'অফার', href: '/offers' },
    { name: 'ব্লগ', href: '/blog' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      {/* Top Bar */}
      <div className="bg-dark-100 text-white text-sm py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>+880 1234 567890</span>
            </span>
            <span className="hidden md:flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>ঢাকা, বাংলাদেশ</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/track-order" className="hover:text-primary-300 transition">ট্র্যাক অর্ডার</Link>
            <Link href="/seller" className="hover:text-primary-300 transition">সেলার পোর্টাল</Link>
            <Link href="/help" className="hover:text-primary-300 transition">সাহায্য</Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`transition-all duration-300 ${isScrolled ? 'py-3' : 'py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold text-gradient hidden sm:block">StellarMart</span>
            </Link>

            {/* Search Bar */}
            <div className={`flex-1 max-w-xl hidden md:flex ${isSearchOpen ? 'flex' : ''}`}>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="পণ্য খুঁজুন..."
                  className="w-full pl-12 pr-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:border-primary-500"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <button className="absolute right-0 top-0 bottom-0 bg-primary-600 text-white px-6 rounded-r-lg hover:bg-primary-700 transition">
                  খুঁজুন
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Search Toggle (Mobile) */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Wishlist */}
              <Link href="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-lg transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </Link>

              {/* Cart */}
              <div className="relative">
                <button 
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="relative p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">5</span>
                </button>
              </div>

              {/* User Menu */}
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                    <Link href="/login" className="block px-4 py-2 hover:bg-gray-50">লগইন</Link>
                    <Link href="/register" className="block px-4 py-2 hover:bg-gray-50">রেজিস্টার</Link>
                    <hr className="my-2" />
                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-50">ড্যাশবোর্ড</Link>
                    <Link href="/orders" className="block px-4 py-2 hover:bg-gray-50">অর্ডার</Link>
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Bar */}
      <div className="bg-white border-t hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 py-3 overflow-x-auto">
            {[
              { name: 'ইলেকট্রনিক্স', icon: '📱' },
              { name: 'মোবাইল ফোন', icon: '📲' },
              { name: 'ল্যাপটপ', icon: '💻' },
              { name: 'টিভি', icon: '📺' },
              { name: 'অডিও', icon: '🎧' },
              { name: 'ক্যামেরা', icon: '📷' },
              { name: 'গেমিং', icon: '🎮' },
              { name: 'হোম অ্যাপ্লায়েন্স', icon: '🏠' },
              { name: 'ফ্যাশন', icon: '👗' },
              { name: 'সৌন্দর্য', icon: '💄' },
            ].map((cat) => (
              <Link 
                key={cat.name}
                href={`/categories/${cat.name.toLowerCase().replace(' ', '-')}`}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary-600 whitespace-nowrap transition"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg absolute w-full">
          <div className="container mx-auto px-4 py-4">
            <div className="mb-4">
              <input
                type="text"
                placeholder="পণ্য খুঁজুন..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block py-2 px-4 rounded-lg transition ${
                    pathname === link.href 
                      ? 'bg-primary-50 text-primary-600' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;