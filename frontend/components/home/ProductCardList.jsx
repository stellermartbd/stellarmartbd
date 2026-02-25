'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingCart, FaHeart, FaStar, FaCheck } from 'react-icons/fa';
import { useCart } from '@/lib/hooks/useCart';
import toast from 'react-hot-toast';

export default function ProductCardList({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  const discountPercent = product.discount || Math.round(((product.regular_price - product.selling_price) / product.regular_price) * 100);

  const handleAddToCart = (e) => {
    e.preventDefault();
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
    <Link href={`/products/${product.slug}`} className="group">
      <div className="card flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative w-full md:w-48 h-48 md:h-auto bg-gray-100 flex-shrink-0">
          <img
            src={product.image || '/images/product-placeholder.jpg'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {discountPercent > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{discountPercent}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            {/* Category */}
            <p className="text-xs text-gray-500 mb-1">{product.category}</p>
            
            {/* Product Name */}
            <h3 className="font-semibold text-lg text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={star <= Math.round(product.rating || 4) ? 'text-yellow-400' : 'text-gray-300'}>
                    <FaStar size={14} />
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              High quality product with premium features. Perfect for everyday use.
            </p>

            {/* Stock Info */}
            <div className="flex items-center gap-2 text-sm text-green-600 mb-3">
              <FaCheck size={12} />
              <span>In Stock</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-primary-600">
                ৳{product.selling_price?.toLocaleString()}
              </span>
              {product.regular_price > product.selling_price && (
                <span className="text-sm text-gray-400 line-through">
                  ৳{product.regular_price?.toLocaleString()}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleWishlist}
                className={`p-2 rounded-lg border transition-colors ${isWishlisted ? 'bg-red-50 border-red-500 text-red-500' : 'border-gray-300 text-gray-600 hover:border-primary-600 hover:text-primary-600'}`}
              >
                <FaHeart size={18} />
              </button>
              <button
                onClick={handleAddToCart}
                className="btn-primary py-2 px-4"
              >
                <FaShoppingCart size={16} />
                <span className="ml-2">Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}