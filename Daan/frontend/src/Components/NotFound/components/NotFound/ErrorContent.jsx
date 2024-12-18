import React from 'react';
import { ErrorIcon } from './ErrorIcon';
import { ActionButtons } from './ActionButtons';

export const ErrorContent = () => (
  <div className="relative">
    <ErrorIcon />
    
    <h1 className="text-6xl md:text-8xl font-bold text-center mb-4 text-orange-500">
      404
    </h1>
    
    <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 text-gray-800">
      Page Not Found
    </h2>
    
    <p className="text-center text-gray-600 mb-8 max-w-md mx-auto">
      Oops! It seems like the page you're looking for has wandered off into the digital sunset. Let's get you back on track!
    </p>
    
    <ActionButtons />
  </div>
);