import { useState } from 'react';
import type { PlantInfo } from '../services/geminiService';

interface UsePlantCareReturn {
  careInstructions: PlantInfo['careInstructions'] | null;
  isLoading: boolean;
  error: string | null;
  fetchPlantCare: (plantName: string) => Promise<void>;
}

export function usePlantCare(): UsePlantCareReturn {
  const [careInstructions, setCareInstructions] = useState<PlantInfo['careInstructions'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlantCare = async (plantName: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/plant-care', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plantName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch plant care details');
      }

      const data = await response.json();
      setCareInstructions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setCareInstructions(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    careInstructions,
    isLoading,
    error,
    fetchPlantCare,
  };
} 