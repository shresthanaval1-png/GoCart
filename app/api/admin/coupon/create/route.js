import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const body = await req.json()

    const { code, discount, expiresAt, forNewUser, forMember } = body

    if (!code || !discount || !expiresAt) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    const formattedCode = code.toUpperCase()

    // ✅ CHECK EXISTING
    const existing = await prisma.coupon.findUnique({
      where: { code: formattedCode }
    })

    if (existing) {
      return NextResponse.json(
        { error: "Coupon already exists ⚠️" },
        { status: 400 }
      )
    }

    // ✅ CREATE
    const coupon = await prisma.coupon.create({
      data: {
        code: formattedCode,
        description: "Discount coupon",
        discount: Number(discount),
        forNewUser: Boolean(forNewUser),
        forMember: Boolean(forMember),
        isPublic: true,
        expiresAt: new Date(expiresAt),
      }
    })

    return NextResponse.json(
      { message: "Coupon created", coupon },
      { status: 201 }
    )

  } catch (error) {
    console.error("❌ COUPON ERROR:", error)

    // 🔥 HANDLE DUPLICATE ERROR FROM PRISMA
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Coupon already exists ⚠️" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}