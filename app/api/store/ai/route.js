import { NextResponse } from "next/server";

// AI feature disabled to avoid OpenAI dependency during deployment

export async function POST() {
  try {
    return NextResponse.json({
      success: false,
      message: "AI feature is currently disabled",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}