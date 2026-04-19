import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { chatId, message } = await req.json()

    await prisma.chatMessage.create({
      data: {
        chatId,
        sender: "admin",
        message
      }
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}