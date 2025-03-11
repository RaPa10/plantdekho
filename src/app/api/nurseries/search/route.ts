import { NextResponse } from 'next/server';

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const SEARCH_RADIUS = 5000; // 5km radius

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        { message: 'Search query is required' },
        { status: 400 }
      );
    }

    if (!GOOGLE_PLACES_API_KEY) {
      return NextResponse.json(
        { message: 'Google Places API key is not configured' },
        { status: 500 }
      );
    }

    // First, geocode the search query to get coordinates
    const geocodeResponse = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${GOOGLE_PLACES_API_KEY}`
    );

    const geocodeData = await geocodeResponse.json();

    if (geocodeData.status !== 'OK') {
      throw new Error(`Geocoding error: ${geocodeData.status}`);
    }

    const location = geocodeData.results[0].geometry.location;

    // Then, search for nurseries near that location
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${SEARCH_RADIUS}&type=garden_center&key=${GOOGLE_PLACES_API_KEY}`
    );

    const data = await response.json();

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      throw new Error(`Google Places API error: ${data.status}`);
    }

    const nurseries = (data.results || []).map((place: any) => ({
      name: place.name,
      rating: place.rating || 0,
      placeId: place.place_id,
      vicinity: place.vicinity,
      distance: 0 // We don't calculate distance for searched locations
    }));

    return NextResponse.json({ nurseries });
  } catch (error) {
    console.error('Error searching nurseries:', error);
    return NextResponse.json(
      { message: 'Failed to search nurseries' },
      { status: 500 }
    );
  }
} 