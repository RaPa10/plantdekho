import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

// Define structured plant information interface
export interface PlantInfo {
  name: string;
  scientificName: string;
  description: string;
  careInstructions: {
    watering: string;
    sunlight: string;
    soil: string;
    temperature: string;
  };
  additionalInfo: {
    nativeTo: string;
    growthRate: string;
    toxicity: string;
  };
}

// Default plant info for fallback
const defaultPlantInfo: PlantInfo = {
  name: "Unknown Plant",
  scientificName: "Species not identified",
  description: "Unable to generate plant description at this time.",
  careInstructions: {
    watering: "General care: Water when top inch of soil feels dry",
    sunlight: "Moderate indirect light is usually safe",
    soil: "Well-draining potting mix",
    temperature: "65-75°F (18-24°C)",
  },
  additionalInfo: {
    nativeTo: "Information not available",
    growthRate: "Information not available",
    toxicity: "Please consult an expert for toxicity information",
  },
};

/**
 * Attempts to extract structured data from Gemini's response text
 */
function extractStructuredData(text: string): PlantInfo | null {
  try {
    // Try to find a JSON object in the text
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsedData = JSON.parse(jsonMatch[0]);
      // Validate the parsed data has required fields
      if (
        parsedData.name &&
        parsedData.scientificName &&
        parsedData.description &&
        parsedData.careInstructions &&
        parsedData.additionalInfo
      ) {
        return parsedData;
      }
    }
    return null;
  } catch (error) {
    console.error("Error parsing structured data:", error);
    return null;
  }
}

/**
 * Identifies a plant from an image and returns structured plant data
 */
export async function identifyPlant(imageBase64: string): Promise<PlantInfo> {
  try {
    const base64Data = imageBase64.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const imageData = {
      inlineData: {
        data: base64Data,
        mimeType: 'image/jpeg',
      },
    };

    const prompt = `
      Analyze this image and determine if it contains a plant. If it does, provide information in the following JSON format:
      {
        "name": "Common plant name",
        "scientificName": "Scientific name",
        "description": "Brief description",
        "careInstructions": {
          "watering": "Watering frequency",
          "sunlight": "Sunlight needs",
          "soil": "Soil type",
          "temperature": "Temperature range"
        },
        "additionalInfo": {
          "nativeTo": "Native regions",
          "growthRate": "Growth rate",
          "toxicity": "Toxicity info"
        }
      }
      If the image does not contain a plant or if you cannot identify the plant with confidence, respond with "NOT_A_PLANT".
    `;

    const result = await model.generateContent([prompt, imageData]);
    const response = await result.response;
    const textResponse = response.text();

    // Check if the response indicates it's not a plant
    if (textResponse.includes('NOT_A_PLANT')) {
      throw new Error('No plant detected in the image. Please upload a clear image of a plant.');
    }

    const parsedData = extractStructuredData(textResponse);
    if (parsedData) {
      return parsedData;
    }

    throw new Error('Unable to identify the plant. Please try again with a clearer image.');
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to process the image. Please try again.');
  }
}

/**
 * Gets detailed care instructions for a specific plant
 */
export async function getPlantCareGuide(plantName: string): Promise<PlantInfo["careInstructions"]> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `
      Provide detailed care instructions for "${plantName}" in the following JSON format:
      {
        "watering": "Detailed watering instructions",
        "sunlight": "Specific light requirements",
        "soil": "Soil type and pH preferences",
        "temperature": "Temperature range and humidity needs"
      }
      Ensure the response is a valid JSON object with all fields filled.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = response.text();

    try {
      const parsedData = JSON.parse(textResponse);
      if (
        parsedData.watering &&
        parsedData.sunlight &&
        parsedData.soil &&
        parsedData.temperature
      ) {
        return parsedData;
      }
    } catch (error) {
      console.error("Error parsing care guide:", error);
    }

    // Return default care instructions if parsing fails
    return defaultPlantInfo.careInstructions;
  } catch (error) {
    console.error("Error getting plant care guide:", error);
    return defaultPlantInfo.careInstructions;
  }
} 