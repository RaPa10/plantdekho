'use client';

import React from 'react';

interface BuySectionProps {
  plantName: string;
}

const BuySection: React.FC<BuySectionProps> = ({ plantName }) => {
  const handleAmazonClick = () => {
    const searchQuery = encodeURIComponent(`${plantName} plant`);
    window.open(`https://www.amazon.com/s?k=${searchQuery}`, '_blank');
  };

  const handleUgaooClick = () => {
    const searchQuery = encodeURIComponent(plantName);
    window.open(`https://www.ugaoo.com/search?q=${searchQuery}`, '_blank');
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
        <span className="mr-2">🛒</span> Where to Buy?
      </h3>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleAmazonClick}
          className="flex-1 flex items-center justify-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-medium rounded-lg transition-colors duration-200"
        >
          <svg
            className="w-4 h-4 mr-2"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.03 12.72c-1.23 0-2.34.4-3.23 1.2-.89.8-1.33 1.84-1.33 3.12 0 1.28.44 2.32 1.33 3.12.89.8 2 1.2 3.23 1.2 1.23 0 2.34-.4 3.23-1.2.89-.8 1.33-1.84 1.33-3.12 0-1.28-.44-2.32-1.33-3.12-.89-.8-2-1.2-3.23-1.2zm0 6.84c-.89 0-1.67-.32-2.34-.96-.67-.64-1-1.44-1-2.4 0-.96.33-1.76 1-2.4.67-.64 1.45-.96 2.34-.96.89 0 1.67.32 2.34.96.67.64 1 1.44 1 2.4 0 .96-.33 1.76-1 2.4-.67.64-1.45.96-2.34.96z"/>
          </svg>
          Buy on Amazon
        </button>
        <button
          onClick={handleUgaooClick}
          className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
        >
          <svg
            className="w-4 h-4 mr-2"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2L4 6v12l8 4 8-4V6l-8-4zm0 2.3L17.7 7 12 9.7 6.3 7 12 4.3zM6 16.6V8.4l5 2.5v8.2l-5-2.5zm12 0l-5 2.5v-8.2l5-2.5v8.2z"/>
          </svg>
          Buy on Ugaoo
        </button>
      </div>
    </div>
  );
};

export default BuySection; 