'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UploadImage from '../components/UploadImage';
import BuySection from '../components/BuySection';
import { usePlantIdentification } from '../hooks/usePlantIdentification';
import NearbyNurseries from '../components/NearbyNurseries';

export default function Home() {
  const {
    plantInfo,
    isLoading,
    error,
    identifyPlantImage,
    resetState,
  } = usePlantIdentification();

  const handleImageCapture = async (imageData: string) => {
    await identifyPlantImage(imageData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 overflow-auto p-4">
        <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-7xl mx-auto">
          {/* Left Column - Upload and Image Display */}
          <div className="flex flex-col min-h-[400px] lg:min-h-0">
            <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col h-full">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                Identify Your Plants
              </h1>
              <p className="text-sm text-gray-600 mb-4">
                Take a photo or upload an image to get detailed information.
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <div className="flex-1 flex flex-col items-center justify-center">
                <UploadImage onImageCapture={handleImageCapture} />
              </div>

              {isLoading && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary-500 border-t-transparent"></div>
                    <p className="mt-3 text-sm text-gray-600">Analyzing your plant...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Plant Information */}
          <div className={`min-h-[400px] lg:min-h-0 ${!plantInfo || error ? 'hidden lg:block' : ''}`}>
            <div className="bg-white rounded-xl shadow-lg p-4 h-full overflow-y-auto">
              {plantInfo && !error ? (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {plantInfo.name}
                    </h2>
                    <p className="text-sm text-gray-600 italic">
                      {plantInfo.scientificName}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                    <p className="text-sm text-gray-600">{plantInfo.description}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Watering</h4>
                      <p className="text-xs text-gray-600">{plantInfo.careInstructions.watering}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Sunlight</h4>
                      <p className="text-xs text-gray-600">{plantInfo.careInstructions.sunlight}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Soil</h4>
                      <p className="text-xs text-gray-600">{plantInfo.careInstructions.soil}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Temperature</h4>
                      <p className="text-xs text-gray-600">{plantInfo.careInstructions.temperature}</p>
                    </div>
                  </div>

                  <BuySection plantName={plantInfo.name} />

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Additional Info</h3>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li><span className="font-medium">Native to:</span> {plantInfo.additionalInfo.nativeTo}</li>
                      <li><span className="font-medium">Growth Rate:</span> {plantInfo.additionalInfo.growthRate}</li>
                      <li><span className="font-medium">Toxicity:</span> {plantInfo.additionalInfo.toxicity}</li>
                    </ul>
                  </div>

                  <NearbyNurseries />
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  <p className="text-sm">Upload a plant image to see details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
