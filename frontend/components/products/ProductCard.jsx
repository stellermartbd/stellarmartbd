'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaHeart, FaEye, FaStar } from 'react-icons/fa';
// '@/lib/stores/cartStore' পাথ ব্যবহার করা হয়েছে
import { useCart } from '@/lib/stores/cartStore'; 
import toast from 'react-hot-toast';

const ProductCard = ({ product, showActions = true }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // cartStore থেকে কাস্টম হুক useCart কল করা হয়েছে
  const cart = useCart();
  // আপনার স্টোর কোড অনুযায়ী ফাংশনের নাম 'addToCart'
  const addToCart = cart?.addToCart;

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

          {/* Action Buttons Overlay */}
          {showActions && (
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                onClick={handleWishlist}
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-600'}`}
              >
                <FaHeart size={16} />
              </button>
              <button
                onClick={handleAddToCart}
                className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg"
              >
                <FaShoppingCart size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Details Area */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2">{product.name}</h3>
          <div className="mt-auto">
             <span className="text-blue-600 font-extrabold text-base">৳{product.selling_price?.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
