'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// ১. নিশ্চিত হয়ে নিন পাথটি সঠিক আছে কিনা
import { useCart } from '@/lib/stores/useCart'; 
import toast from 'react-hot-toast';

export default function CartPage() {
  // ২. আপনার স্টোর থেকে প্রয়োজনীয় ফাংশনগুলো আনা হচ্ছে
  const { cart, updateQuantity, removeFromCart, clearCart, getTotals } = useCart();
  const [loading, setLoading] = useState(false);

  // ৩. getTotals() থেকে আসা ভ্যালুগুলো নিশ্চিত করা (ডিফল্ট ভ্যালুসহ)
  const { 
    subtotal = 0, 
    totalItems = 0, 
    totalDiscount = 0, 
    total = 0 
  } = getTotals() || {};

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      toast.success('Item removed from cart');
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemove = (productId, productName) => {
    removeFromCart(productId);
    toast.success(`${productName} removed from cart`);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setLoading(true);
    // নেক্সট জেএস-এ উইন্ডো লোকেশনের বদলে router.push ব্যবহার করা ভালো, তবে এটিও কাজ করবে
    window.location.href = '/checkout';
  };

  // খালি কার্ট স্টেট
  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShoppingBag className="text-4xl text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link href="/products" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-500">{totalItems} items in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex gap-4 items-center">
                {/* Image */}
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden relative">
                  <img
                    src={item.image || '/images/product-placeholder.jpg'}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link href={`/products/${item.slug || item.id}`} className="font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-500">{item.category || 'General'}</p>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id, item.name)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <FaMinus size={10} />
                      </button>
                      <span className="px-4 py-1 font-medium min-w-[40px] text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <FaPlus size={10} />
                      </button>
                    </div>

                    {/* Price Display */}
                    <div className="text-right">
                      <p className="font-bold text-blue-600">
                        ৳{((item.selling_price || item.price) * item.quantity).toLocaleString()}
                      </p>
                      {item.regular_price > (item.selling_price || item.price) && (
                        <p className="text-xs text-gray-400 line-through">
                          ৳{(item.regular_price * item.quantity).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-4">
              <Link href="/products" className="flex items-center gap-2 text-blue-600 font-medium hover:underline">
                <FaArrowLeft size={14} /> Continue Shopping
              </Link>
              <button 
                onClick={() => {
                  if(confirm('Are you sure you want to clear your cart?')) clearCart();
                }} 
                className="text-red-500 text-sm font-medium hover:text-red-700 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-bottom pb-2">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">৳{subtotal.toLocaleString()}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-medium">-৳{totalDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-sm italic">Calculated at checkout</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-blue-600">৳{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={loading || cart.length === 0}
                className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-100"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    Proceed to Checkout <FaArrowRight size={16} />
                  </>
                )}
              </button>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700 flex items-center gap-2">
                  <span>🔒</span> Secure checkout. Your data is protected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
