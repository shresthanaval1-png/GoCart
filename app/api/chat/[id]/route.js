import prisma from "@/lib/prisma"
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

// DELETE CHAT
export async function DELETE(req, context) {
  try {
    const { userId } = getAuth(req)

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await context.params

    if (!id) {
      return NextResponse.json({ error: "Chat ID required" }, { status: 400 })
    }

    const chat = await prisma.chat.findUnique({
      where: { id }
    })

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 })
    }

    // delete all messages first
    await prisma.chatMessage.deleteMany({
      where: { chatId: id }
    })

    // delete chat
    await prisma.chat.delete({
      where: { id }
    })

    return NextResponse.json({
      message: "Chat deleted successfully"
    })

  } catch (error) {
    console.error("DELETE CHAT ERROR:", error)

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}