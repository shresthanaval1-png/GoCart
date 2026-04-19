import prisma from "@/lib/prisma"
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(req) {
  try {
    const { userId } = getAuth(req)

    const chat = await prisma.chat.findFirst({
      where: { userId },
      include: { messages: true }
    })

    return NextResponse.json({ chat })

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}