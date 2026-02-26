'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaStar, FaBolt } from 'react-icons/fa';
import { useCart } from '@/lib/hooks/cartStore'; 
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const cart = useCart();
  const addToCart = cart?.addToCart;

  // ডিসকাউন্ট ক্যালকুলেশন
  const discountPercent = product.regular_price 
    ? Math.round(((product.regular_price - product.selling_price) / product.regular_price) * 100) 
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (addToCart) {
      addToCart(product, 1);
      toast.success(`${product.name} added to cart!`);
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group relative flex flex-col h-full">
      {/* Discount Badge - স্ক্রিনশটের মতো লাল ব্যাজ */}
      {discountPercent > 0 && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm z-10">
          -{discountPercent}%
        </div>
      )}
      
      <Link href={`/products/${product.slug || ''}`} className="block">
        {/* Product Image Area */}
        <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-4">
          {!imageLoaded && (
             <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
               <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
             </div>
          )}
          <img 
            src={product.image || '/images/product-placeholder.jpg'} 
            alt={product.name} 
            className={`max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} 
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Product Details Area */}
        <div className="p-3 text-center flex flex-col flex-grow">
          <h3 className="font-bold text-gray-800 text-xs md:text-sm uppercase tracking-tight mb-1 line-clamp-2 min-h-[32px]">
            {product.name}
          </h3>
          
          {/* Star Rating - স্ক্রিনশটের মতো হলুদ স্টার */}
          <div className="flex justify-center text-orange-400 text-[10px] mb-1">
             <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
             <span className="text-gray-400 ml-1">(119)</span>
          </div>

          {/* Pricing */}
          <div className="text-sm md:text-base font-bold text-gray-900 mt-auto">
            ৳{product.selling_price?.toLocaleString()} 
            {product.regular_price > product.selling_price && (
              <span className="text-gray-400 line-through text-[11px] font-normal ml-1">
                ৳{product.regular_price?.toLocaleString()}
              </span>
            )}
          </div>

          {/* Action Buttons - স্ক্রিনশটের কালার কোড অনুযায়ী */}
          <div className="mt-3 flex flex-col gap-1.5">
            <button 
              onClick={handleAddToCart}
              className="w-full bg-gray-100 text-gray-700 py-1.5 rounded font-bold text-[10px] flex items-center justify-center gap-1 hover:bg-gray-200 transition-colors"
            >
              <FaShoppingCart size={12} /> ADD TO CART
            </button>
            <button className="w-full bg-[#004a7c] text-white py-1.5 rounded font-bold text-[10px] flex items-center justify-center gap-1 hover:bg-[#00365b] transition-colors">
              <FaBolt size={10} /> BUY NOW
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
