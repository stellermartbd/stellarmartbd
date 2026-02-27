'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaFire, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProductCard from '../products/ProductCard'; 

const flashProducts = [
  { id: 1, name: 'Wireless Earbuds Pro', image: '/images/product-1.jpg', selling_price: 1499, regular_price: 2500, discount: 40, rating: 4.5, reviews: 128 },
  { id: 2, name: 'Smart Watch Series 5', image: '/images/product-2.jpg', selling_price: 2999, regular_price: 4500, discount: 33, rating: 4.8, reviews: 256 },
  { id: 3, name: 'Bluetooth Speaker', image: '/images/product-3.jpg', selling_price: 999, regular_price: 1800, discount: 44, rating: 4.3, reviews: 89 },
  { id: 4, name: 'Phone Case Premium', image: '/images/product-4.jpg', selling_price: 399, regular_price: 800, discount: 50, rating: 4.6, reviews: 312 },
  { id: 5, name: 'USB Hub 7 Port', image: '/images/product-5.jpg', selling_price: 699, regular_price: 1200, discount: 42, rating: 4.2, reviews: 67 },
  { id: 6, name: 'Laptop Stand Aluminum', image: '/images/product-6.jpg', selling_price: 899, regular_price: 1500, discount: 40, rating: 4.7, reviews: 145 },
  { id: 7, name: 'Wireless Mouse', image: '/images/product-7.jpg', selling_price: 499, regular_price: 900, discount: 45, rating: 4.4, reviews: 198 },
  { id: 8, name: 'LED Desk Lamp', image: '/images/product-8.jpg', selling_price: 799, regular_price: 1600, discount: 50, rating: 4.5, reviews: 87 },
];

const FlashSale = () => {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 45, seconds: 30 });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 8, minutes: 45, seconds: 30 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Hydration Error theke bachte (Very Important)
  if (!mounted) return <div className="py-12 bg-orange-50 h-96"></div>;

  const itemsPerView = 4;
  const maxIndex = Math.ceil(flashProducts.length / itemsPerView);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % maxIndex);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + maxIndex) % maxIndex);

  const TimerBox = ({ value, label }) => (
    <div className="bg-orange-600 text-white px-3 py-2 rounded-lg text-center min-w-[64px]">
      <span className="block text-xl font-bold">{String(value).padStart(2, '0')}</span>
      <span className="text-[10px] uppercase">{label}</span>
    </div>
  );

  return (
    <section className="py-12 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-orange-500 p-3 rounded-full"><FaFire className="text-white text-2xl" /></div>
            <h2 className="text-3xl font-bold">Flash Sale</h2>
          </div>
          <div className="flex items-center gap-2">
            <TimerBox value={timeLeft.hours} label="Hrs" />
            <TimerBox value={timeLeft.minutes} label="Min" />
            <TimerBox value={timeLeft.seconds} label="Sec" />
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {flashProducts.slice(currentIndex * itemsPerView, (currentIndex * itemsPerView) + itemsPerView).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <button onClick={prevSlide} className="absolute -left-5 top-1/2 bg-white p-3 rounded-full shadow-lg z-10"><FaChevronLeft /></button>
          <button onClick={nextSlide} className="absolute -right-5 top-1/2 bg-white p-3 rounded-full shadow-lg z-10"><FaChevronRight /></button>
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
