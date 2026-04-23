import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET ALL CHATS (ADMIN)
export async function GET() {
  try {
    const chats = await prisma.chat.findMany({
      include: {
        messages: {
          orderBy: { createdAt: "asc" }
        },
        user: true
      },
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json({ chats })

  } catch (error) {
    console.error("ADMIN CHAT ERROR:", error)

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}