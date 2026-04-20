import prisma from "@/lib/prisma"
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

// ⭐ CREATE OR UPDATE RATING (UPSERT)
export async function POST(request) {
  try {
    const { userId } = getAuth(request)

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { orderId, productId, rating, review } = await request.json()

    // ✅ VALIDATION
    if (!orderId || !productId || !rating) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      )
    }

    // ✅ CHECK ORDER BELONGS TO USER
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId
      }
    })

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      )
    }

    // ❌ ONLY AFTER DELIVERY
    if (order.status !== "DELIVERED") {
      return NextResponse.json(
        { error: "You can rate only after delivery" },
        { status: 400 }
      )
    }

    // ✅ UPSERT (CREATE OR EDIT)
    const response = await prisma.rating.upsert({
      where: {
        userId_productId_orderId: {
          userId,
          productId,
          orderId
        }
      },
      update: {
        rating: Number(rating),
        review: review || ""
      },
      create: {
        userId,
        productId,
        orderId,
        rating: Number(rating),
        review: review || ""
      }
    })

    return NextResponse.json({
      message: "Rating saved successfully",
      rating: response
    })

  } catch (error) {
    console.error("❌ RATING ERROR:", error)

    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error.message
      },
      { status: 500 }
    )
  }
}

// ⭐ GET USER RATINGS
export async function GET(request) {
  try {
    const { userId } = getAuth(request)

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const ratings = await prisma.rating.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json({ ratings })

  } catch (error) {
    console.error("❌ GET RATINGS ERROR:", error)

    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error.message
      },
      { status: 500 }
    )
  }
}