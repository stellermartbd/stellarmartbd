'use client';

import React, { useState } from 'react';
// import Image from 'next/image'; // আপাতত অব্যবহৃত বলে কমেন্ট করা হলো
import Link from 'next/link';
import { FaShoppingCart, FaHeart, FaEye, FaStar } from 'react-icons/fa';
// '@/lib/useCart' না পাওয়া গেলে নিচের লাইনটি ট্রাই করুন
import { useCart } from '../../lib/useCart'; 
import toast from 'react-hot-toast';

const ProductCard = ({ product, showActions = true }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // useCart থেকে addToCart নেওয়ার আগে চেক করুন useCart ঠিকমতো এক্সপোর্ট করা কি না
  const { addToCart } = useCart() || {}; 

  const discountPercent = product.discount || (product.regular_price ? Math.round(((product.regular_price - product.selling_price) / product.regular_price) * 100) : 0);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (addToCart) {
      addToCart(product, 1);
      toast.success(`${product.name} added to cart!`);
    } else {
      toast.error('Cart functionality is not ready yet');
    }
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <Link href={`/products/${product.slug || ''}`} className="group block h-full">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col h-full">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <div className={`absolute inset-0 flex items-center justify-center bg-gray-100 transition-opacity duration-500 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}>
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          
          <img
            src={product.image || '/images/product-placeholder.jpg'}
            alt={product.name || 'Product'}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${imageLoaded ? 'scale-100' : 'scale-95'}`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discountPercent > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                -{discountPercent}%
              </span>
            )}
            {product.is_new && (
              <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                NEW
              </span>
            )}
          </div>

          {/* Action Buttons Overlay */}
          {showActions && (
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                onClick={handleWishlist}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:text-red-500'}`}
              >
                <FaHeart size={16} />
              </button>
              <button
                onClick={handleAddToCart}
                className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 hover:bg-blue-700"
              >
                <FaShoppingCart size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4 flex flex-col flex-grow">
          <span className="text-[10px] text-blue-500 font-bold uppercase tracking-wider mb-1">
            {product.category?.name || 'StellarMart'}
          </span>
          <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          <div className="mt-auto">
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} size={10} className={i < Math.round(product.rating || 4) ? 'text-yellow-400' : 'text-gray-200'} />
              ))}
              <span className="text-[10px] text-gray-400 font-medium">({product.reviews || 0})</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-blue-600 font-extrabold text-base">
                  ৳{product.selling_price?.toLocaleString()}
                </span>
                {product.regular_price > product.selling_price && (
                  <span className="text-[11px] text-gray-400 line-through">
                    ৳{product.regular_price?.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
