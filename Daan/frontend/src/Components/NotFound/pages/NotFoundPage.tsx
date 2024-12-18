import React from 'react';
import { NotFoundCard } from '../components/NotFound/NotFoundCard';
import { FunFact } from '../components/NotFound/FunFact';

export const NotFoundPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 flex items-center justify-center p-4">
    <div className="max-w-2xl w-full">
      <NotFoundCard />
      <FunFact />
    </div>
  </div>
);