'use client';

import { useState } from 'react';
import { FaTools, FaServer, FaDatabase, FaCache } from 'react-icons/fa';

export default function MaintenancePage() {
  const [status] = useState('System Maintenance Underway');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center space-y-6">
        <div className="flex justify-center gap-4 text-blue-500">
          <FaTools size={40} className="animate-bounce" />
          <FaCache size={40} className="opacity-50" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900">{status}</h1>
        <p className="text-gray-500">
          We are optimizing our servers and clearing cache for better performance. 
          Please be patient.
        </p>

        <div className="grid grid-cols-2 gap-4 pt-6">
          <div className="p-4 bg-blue-50 rounded-2xl flex flex-col items-center">
            <FaServer className="text-blue-600 mb-2" />
            <span className="text-xs font-semibold text-blue-700 uppercase">Server</span>
          </div>
          <div className="p-4 bg-emerald-50 rounded-2xl flex flex-col items-center">
            <FaDatabase className="text-emerald-600 mb-2" />
            <span className="text-xs font-semibold text-emerald-700 uppercase">Database</span>
          </div>
        </div>
      </div>
    </div>
  );
}
