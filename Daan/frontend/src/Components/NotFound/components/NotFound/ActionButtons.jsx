import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';

export const ActionButtons = () => (
  <div className="flex flex-col sm:flex-row gap-4 justify-center">
    <button className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300 shadow-lg hover:shadow-xl">
      <Home className="w-5 h-5" />
      Go Home
    </button>
    
    <button className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors duration-300">
      <ArrowLeft className="w-5 h-5" />
      Go Back
    </button>
  </div>
);