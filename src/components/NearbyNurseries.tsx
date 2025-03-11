'use client';

import { useState, useEffect } from 'react';
import { MapPinIcon, StarIcon } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Nursery {
  name: string;
  rating: number;
  distance: number;
  placeId: string;
  vicinity: string;
}

const NearbyNurseries = () => {
  const [nurseries, setNurseries] = useState<Nursery[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationDenied, setLocationDenied] = useState(false);

  const getNearbyNurseries = async (latitude: number, longitude: number) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/nurseries?lat=${latitude}&lng=${longitude}`);
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || 'Failed to fetch nurseries');
      
      setNurseries(data.nurseries);
    } catch (err) {
      setError('Failed to load nearby nurseries. Please try again.');
      console.error('Error fetching nurseries:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSearch = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/nurseries/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || 'Failed to search nurseries');
      
      setNurseries(data.nurseries);
    } catch (err) {
      setError('Failed to search nurseries. Please try again.');
      console.error('Error searching nurseries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getNearbyNurseries(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLocationDenied(true);
        }
      );
    } else {
      setLocationDenied(true);
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-3">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <MapPinIcon className="h-5 w-5 text-primary-500 mr-2" />
        Nurseries Near Me
      </h3>

      {locationDenied && (
        <div className="relative">
          <input
            type="text"
            placeholder="Enter your location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLocationSearch(searchQuery)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      )}

      {loading ? (
        <div className="h-32 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent"></div>
        </div>
      ) : error ? (
        <div className="h-32 flex items-center justify-center text-red-500 text-sm">
          {error}
        </div>
      ) : nurseries.length === 0 ? (
        <div className="h-32 flex items-center justify-center text-gray-500 text-sm">
          No nurseries found nearby
        </div>
      ) : (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {nurseries.map((nursery, index) => (
            <div
              key={index}
              className="flex items-start justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {nursery.name}
                </h4>
                <div className="flex items-center mt-1">
                  {nursery.rating > 0 && (
                    <div className="flex items-center text-yellow-400 mr-2">
                      <StarIcon className="h-4 w-4" />
                      <span className="ml-1 text-xs text-gray-600">{nursery.rating.toFixed(1)}</span>
                    </div>
                  )}
                  <span className="text-xs text-gray-500">
                    {nursery.distance.toFixed(1)} km away
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate">{nursery.vicinity}</p>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=nursery&query_place_id=${nursery.placeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 p-2 text-primary-600 hover:text-primary-700 rounded-full hover:bg-primary-50"
              >
                <MapPinIcon className="h-5 w-5" />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NearbyNurseries; 