'use client'; // এটি অবশ্যই সবার উপরে থাকতে হবে

import { useState } from 'react';
import { FaTools, FaServer } from 'react-icons/fa';

export default function Page() {
  // যদি এখানে কোনো স্টেট বা লজিক থাকে সেটি নিচে লিখুন
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="text-center space-y-4">
        <FaTools className="mx-auto text-6-xl text-blue-600 animate-bounce" size={50} />
        <h1 className="text-3xl font-bold text-gray-900">Maintenance Page</h1>
        <p className="text-gray-600">We are currently updating our system. Please check back later.</p>
      </div>
    </div>
  );
}
