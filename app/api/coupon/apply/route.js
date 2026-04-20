import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const body = await req.json()
    const code = body.code?.toUpperCase().trim()

    // ❌ VALIDATION
    if (!code) {
      return NextResponse.json(
        { error: "Coupon code required" },
        { status: 400 }
      )
    }

    // 🔍 FIND COUPON
    const coupon = await prisma.coupon.findUnique({
      where: { code }
    })

    // ❌ NOT FOUND
    if (!coupon) {
      return NextResponse.json(
        { error: "Invalid coupon" },
        { status: 400 }
      )
    }

    // ❌ EXPIRED
    if (new Date(coupon.expiresAt) < new Date()) {
      return NextResponse.json(
        { error: "Coupon expired" },
        { status: 400 }
      )
    }

    // ❌ OPTIONAL: NEW USER CHECK (only if needed)
    if (coupon.forNewUser) {
      // 👉 you can add user order check here later
    }

    // ✅ SUCCESS RESPONSE (IMPROVED)
    return NextResponse.json({
      success: true,
      code: coupon.code,
      discount: coupon.discount,
      expiresAt: coupon.expiresAt
    })

  } catch (error) {
    console.error("❌ APPLY COUPON ERROR:", error)

    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error.message
      },
      { status: 500 }
    )
  }
}