import { useState } from 'react';
import { identifyPlant, type PlantInfo } from '../services/geminiService';

interface UsePlantIdentificationReturn {
  plantInfo: PlantInfo | null;
  isLoading: boolean;
  error: string | null;
  identifyPlantImage: (imageData: string) => Promise<void>;
  resetState: () => void;
}

export function usePlantIdentification(): UsePlantIdentificationReturn {
  const [plantInfo, setPlantInfo] = useState<PlantInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const identifyPlantImage = async (imageData: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await identifyPlant(imageData);
      setPlantInfo(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to identify plant');
      setPlantInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setPlantInfo(null);
    setIsLoading(false);
    setError(null);
  };

  return {
    plantInfo,
    isLoading,
    error,
    identifyPlantImage,
    resetState,
  };
} 