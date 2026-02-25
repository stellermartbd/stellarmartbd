'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaLock, FaCheck, FaTruck, FaShoppingCart } from 'react-icons/fa';
// আপনার স্ট্রাকচার অনুযায়ী পাথ চেক করে নিন
import { useCart } from '@/lib/useCart'; 
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { cart, getTotals, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    billingName: '',
    billingEmail: '',
    billingPhone: '',
    billingAddress: '',
    billingCity: '',
    billingPostalCode: '',
    sameAsBilling: true,
    shippingName: '',
    shippingPhone: '',
    shippingAddress: '',
    shippingCity: '',
    shippingPostalCode: '',
    paymentMethod: 'cod',
    orderNotes: '',
  });

  const { subtotal, totalItems, totalDiscount, total } = getTotals();
  // ৯৯৯ টাকার উপরে অর্ডার করলে ফ্রি শিপিং, নাহলে ৬০ টাকা
  const shippingCost = subtotal >= 999 ? 0 : 60;
  const finalTotal = total + shippingCost;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ভ্যালিডেশন
    if (!formData.billingName || !formData.billingPhone || !formData.billingAddress || !formData.billingCity) {
      toast.error('প্রয়োজনীয় সব ঘর পূরণ করুন');
      return;
    }

    setLoading(true);

    // সিমুলেটেড অর্ডার সাবমিশন (এখানে পরে API call হবে)
    setTimeout(() => {
      setLoading(false);
      setOrderPlaced(true);
      clearCart();
      toast.success('অর্ডারটি সফলভাবে সম্পন্ন হয়েছে!');
    }, 2000);
  };

  // অর্ডার সফল হওয়ার পর যে স্ক্রিন আসবে
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full text-center bg-white p-10 rounded-3xl shadow-xl border border-green-100">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <FaCheck className="text-5xl text-green-600" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">অভিনন্দন!</h1>
          <p className="text-gray-500 mb-8 font-medium leading-relaxed">
            আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। খুব শীঘ্রই আমাদের একজন প্রতিনিধি আপনার সাথে যোগাযোগ করবেন।
          </p>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8">
            <p className="text-xs text-blue-500 font-bold uppercase mb-2">অর্ডার নাম্বার</p>
            <p className="text-2xl font-black text-blue-700">#SM{Date.now().toString().slice(-8)}</p>
          </div>
          <Link href="/products" className="inline-flex items-center justify-center gap-3 w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            আরও শপিং করুন <FaShoppingCart />
          </Link>
        </div>
      </div>
    );
  }

  // কার্ট খালি থাকলে যা দেখাবে
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
        <div className="text-center">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">আপনার কার্টটি বর্তমানে খালি</h1>
          <Link href="/products" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline">
            প্রোডাক্ট দেখতে এখানে ক্লিক করুন
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center gap-4 mb-10">
          <Link href="/cart" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 hover:bg-blue-50">
             &larr;
          </Link>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Checkout Process</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form Left Side */}
          <div className="lg:col-span-8 space-y-8">
            {/* Billing Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm">1</span>
                Billing Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-2 block">Full Name *</label>
                  <input
                    type="text"
                    name="billingName"
                    required
                    value={formData.billingName}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                    placeholder="আপনার নাম লিখুন"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-2 block">Email Address *</label>
                  <input
                    type="email"
                    name="billingEmail"
                    required
                    value={formData.billingEmail}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                    placeholder="example@mail.com"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-2 block">Phone Number *</label>
                  <input
                    type="tel"
                    name="billingPhone"
                    required
                    value={formData.billingPhone}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                    placeholder="017XXXXXXXX"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-2 block">Detailed Address *</label>
                  <input
                    type="text"
                    name="billingAddress"
                    required
                    value={formData.billingAddress}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                    placeholder="বাসা নাম্বার, রোড নাম্বার ও এলাকা"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-2 block">City *</label>
                  <select
                    name="billingCity"
                    required
                    value={formData.billingCity}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                  >
                    <option value="">শহর সিলেক্ট করুন</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Rajshahi">Rajshahi</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-2 block">Postal Code</label>
                  <input
                    type="text"
                    name="billingPostalCode"
                    value={formData.billingPostalCode}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                    placeholder="1200"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Info - Toggle */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-gray-900 flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm">2</span>
                  Shipping Information
                </h2>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="sameAsBilling"
                    checked={formData.sameAsBilling}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-bold text-gray-500">Same as billing</span>
                </label>
              </div>

              {!formData.sameAsBilling && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      name="shippingAddress"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                      placeholder="সঠিক ডেলিভারি ঠিকানা লিখুন"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Payment Selection */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm">3</span>
                Payment Method
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['cod', 'bkash', 'nagad', 'card'].map((method) => (
                  <label 
                    key={method} 
                    className={`flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${formData.paymentMethod === method ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}
                  >
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value={method} 
                      checked={formData.paymentMethod === method} 
                      onChange={handleChange} 
                      className="hidden" 
                    />
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === method ? 'border-blue-600' : 'border-gray-300'}`}>
                      {formData.paymentMethod === method && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
                    </div>
                    <span className="font-bold text-gray-800 uppercase text-sm tracking-wide">
                      {method === 'cod' ? 'Cash On Delivery' : method}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sticky top-24">
              <h2 className="text-xl font-black text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-14 h-14 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800 truncate">{item.name}</p>
                      <p className="text-xs text-gray-400 font-medium">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-blue-600">৳{(item.selling_price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-dashed border-gray-100 pt-6 mb-8">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Subtotal</span>
                  <span>৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Shipping Fee</span>
                  <span className={shippingCost === 0 ? 'text-green-500 font-bold' : ''}>
                    {shippingCost === 0 ? 'FREE' : `৳${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-black text-gray-900 pt-4 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-blue-600">৳{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-5 rounded-2xl font-black text-white text-lg shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-3 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}`}
              >
                {loading ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>Place Order <FaLock size={16} /></>
                )}
              </button>
              
              <div className="flex items-center justify-center gap-2 mt-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                <FaLock /> SSL Secured Payment
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}