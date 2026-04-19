import prisma from "@/lib/prisma"
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { userId } = getAuth(req)
    const { message } = await req.json()

    let chat = await prisma.chat.findFirst({
      where: { userId }
    })

    // create chat if not exists
    if (!chat) {
      chat = await prisma.chat.create({
        data: { userId }
      })
    }

    await prisma.chatMessage.create({
      data: {
        chatId: chat.id,
        sender: "user",
        message
      }
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}