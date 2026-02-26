'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingCart, FaHeart, FaStar, FaCheck, FaRegHeart } from 'react-icons/fa';
import { useCart } from '@/lib/stores/useCart';
import toast from 'react-hot-toast';

export default function ProductCardList({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  // Discount Calculation logic
  const discountPercent = product.discount || 
    (product.regular_price > product.selling_price 
      ? Math.round(((product.regular_price - product.selling_price) / product.regular_price) * 100) 
      : 0);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Link যেন ট্রিগার না হয়
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 mb-4">
      <Link href={`/products/${product.slug}`} className="flex flex-col md:flex-row">
        
        {/* Image Section - Next.js Optimized */}
        <div className="relative w-full md:w-64 h-52 md:h-auto bg-gray-50 flex-shrink-0 overflow-hidden">
          <Image
            src={product.image || '/images/product-placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {discountPercent > 0 && (
            <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase px-2 py-1 rounded-full shadow-sm">
              {discountPercent}% OFF
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <p className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-1">
                {product.category}
              </p>
              <button 
                onClick={handleWishlist}
                className={`p-2 rounded-full transition-colors ${isWishlisted ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-gray-100'}`}
              >
                {isWishlisted ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
              </button>
            </div>
            
            <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={14} className={i < Math.round(product.rating || 4) ? 'fill-current' : 'text-gray-300'} />
                ))}
              </div>
              <span className="text-xs text-gray-500 font-medium">({product.reviews || 0} reviews)</span>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
              {product.description || "Premium gaming products with instant delivery features."}
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-green-600 bg-green-50 w-fit px-2 py-1 rounded">
              <FaCheck size={10} />
              <span>INSTANT DELIVERY</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
            {/* Price */}
            <div className="flex flex-col">
              {product.regular_price > product.selling_price && (
                <span className="text-sm text-gray-400 line-through mb-[-4px]">
                  ৳{product.regular_price?.toLocaleString()}
                </span>
              )}
              <span className="text-2xl font-black text-gray-900">
                ৳{product.selling_price?.toLocaleString()}
              </span>
            </div>

            {/* Actions */}
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-gray-900 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all active:scale-95 shadow-md hover:shadow-blue-200"
            >
              <FaShoppingCart size={18} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
