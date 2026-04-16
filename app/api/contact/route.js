import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// ✅ GET messages
export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: [
        { isRead: "asc" },
        { createdAt: "desc" }
      ]
    });

    return NextResponse.json({ messages });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

// ✅ SAVE MESSAGE
export async function POST(req) {
  try {
    const body = await req.json();

    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    await prisma.contactMessage.create({
      data: { name, email, message }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("POST ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}