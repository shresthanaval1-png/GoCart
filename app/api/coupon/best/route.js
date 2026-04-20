import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const now = new Date()

    // 🔥 FETCH ONLY VALID COUPONS FROM DB (better than filtering in JS)
    const coupons = await prisma.coupon.findMany({
      where: {
        expiresAt: {
          gt: now
        },
        isPublic: true // only public coupons
      }
    })

    // ❌ NO COUPONS
    if (!coupons.length) {
      return NextResponse.json({ coupon: null })
    }

    // ✅ FIND BEST COUPON (MAX DISCOUNT)
    const bestCoupon = coupons.reduce((best, current) => {
      return current.discount > best.discount ? current : best
    })

    // ✅ CLEAN RESPONSE (important for frontend)
    return NextResponse.json({
      coupon: {
        code: bestCoupon.code,
        discount: bestCoupon.discount
      }
    })

  } catch (error) {
    console.error("❌ BEST COUPON ERROR:", error)

    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error.message
      },
      { status: 500 }
    )
  }
}