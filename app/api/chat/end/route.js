import prisma from "@/lib/prisma"
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req) {
  const { userId } = getAuth(req)

  const chat = await prisma.chat.findFirst({
    where: { userId }
  })

  if (chat) {
    await prisma.chat.delete({
      where: { id: chat.id }
    })
  }

  return NextResponse.json({ success: true })
}