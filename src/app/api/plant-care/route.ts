import { NextResponse } from "next/server";
import { getPlantCareGuide } from "../../../services/geminiService";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { plantName } = body;

    if (!plantName) {
      return NextResponse.json(
        { error: "Plant name is required." },
        { status: 400 }
      );
    }

    const careData = await getPlantCareGuide(plantName);
    if (!careData) {
      return NextResponse.json(
        { error: "Failed to fetch plant care details." },
        { status: 500 }
      );
    }

    return NextResponse.json(careData);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 