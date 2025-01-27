import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="aspect-square bg-gray-350 rounded-lg animate-pulse" />
      ))}
    </div>
  )
}