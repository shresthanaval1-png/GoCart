import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req) {
  const { chatId } = await req.json()

  await prisma.chatMessage.updateMany({
    where: {
      chatId,
      sender: "user",
      isSeen: false
    },
    data: { isSeen: true }
  })

  return NextResponse.json({ success: true })
}