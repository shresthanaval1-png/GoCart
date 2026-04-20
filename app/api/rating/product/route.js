import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const productId = searchParams.get("productId")

    if (!productId) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 })
    }

    const ratings = await prisma.rating.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" }
    })

    // ⭐ CALCULATE AVERAGE
    const avg =
      ratings.length > 0
        ? ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length
        : 0

    return NextResponse.json({
      ratings,
      average: avg.toFixed(1),
      count: ratings.length
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}