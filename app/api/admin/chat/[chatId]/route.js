import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
  const { chatId } = params

  const messages = await prisma.chatMessage.findMany({
    where: { chatId },
    orderBy: { createdAt: "asc" }
  })

  return NextResponse.json({ messages })
}