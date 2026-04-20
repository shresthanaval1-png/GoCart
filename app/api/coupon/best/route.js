import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const coupons = await prisma.coupon.findMany()

    const now = new Date()

    // ✅ FILTER VALID COUPONS
    const validCoupons = coupons.filter(c =>
      new Date(c.expiresAt) > now
    )

    if (validCoupons.length === 0) {
      return NextResponse.json({ coupon: null })
    }

    // ✅ FIND BEST (MAX DISCOUNT)
    const bestCoupon = validCoupons.reduce((best, current) => {
      return current.discount > best.discount ? current : best
    })

    return NextResponse.json({ coupon: bestCoupon })

  } catch (error) {
    console.error("❌ BEST COUPON ERROR:", error)

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}