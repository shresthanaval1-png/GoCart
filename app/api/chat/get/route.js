import prisma from "@/lib/prisma"
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(req) {
  try {
    const { userId } = getAuth(req)

    // 🔒 AUTH CHECK
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // 🔍 FETCH CHAT
    let chat = await prisma.chat.findFirst({
      where: { userId },
      include: {
        messages: {
          orderBy: { createdAt: "asc" }
        }
      }
    })

    // 🆕 CREATE CHAT IF NOT EXISTS
    if (!chat) {
      chat = await prisma.chat.create({
        data: { userId },
        include: {
          messages: true
        }
      })
    }

    return NextResponse.json({ chat })

  } catch (error) {
    // 🔥 FULL DEBUG LOG
    console.error("❌ CHAT GET FULL ERROR:", error)

    return NextResponse.json(
      {
        error: error.message,
        stack: error.stack,   // shows exact crash line
        hint: "Check Prisma schema / relations"
      },
      { status: 500 }
    )
  }
}