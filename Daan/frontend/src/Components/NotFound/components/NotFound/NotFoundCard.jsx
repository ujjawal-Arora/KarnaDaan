import React from 'react';
import { DecorativeElements } from './DecorativeElements';
import { ErrorContent } from './ErrorContent';

export const NotFoundCard = () => (
  <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
    <DecorativeElements />
    <ErrorContent />
  </div>
);