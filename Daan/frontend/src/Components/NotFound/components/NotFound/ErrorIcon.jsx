import React from 'react';
import { AlertCircle } from 'lucide-react';

export const ErrorIcon = () => (
  <div className="flex items-center justify-center mb-8">
    <AlertCircle className="w-20 h-20 text-orange-500 animate-pulse" />
  </div>
);