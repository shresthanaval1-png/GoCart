import prisma from "@/lib/prisma"
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(req) {
  try {
    const { userId } = getAuth(req)

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // 🔥 FETCH USER ORDERS WITH PRODUCTS
    const orders = await prisma.order.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        createdAt: "desc"
      },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                name: true,
                images: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json({ orders })

  } catch (error) {
    console.error("❌ FETCH ORDERS ERROR:", error)

    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error.message
      },
      { status: 500 }
    )
  }
}