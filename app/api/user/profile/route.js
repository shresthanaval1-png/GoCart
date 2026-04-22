import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs/server"

// =======================
// ✅ GET PROFILE
// =======================
export async function GET() {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const profile = await prisma.userProfile.findUnique({
      where: { clerkId: user.id }
    })

    return NextResponse.json({ profile })

  } catch (error) {
    console.error("GET Profile Error:", error)

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}


// =======================
// ✅ SAVE / UPDATE PROFILE
// =======================
export async function POST(request) {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()

    // ✅ NEW FIELDS INCLUDED
    const {
      name,
      age,
      gender,
      image,
      email,
      phone,
      address
    } = body

    const profile = await prisma.userProfile.upsert({
      where: { clerkId: user.id },

      update: {
        name,
        age: age ? parseInt(age) : null,
        gender,
        image,
        email,
        phone,
        address
      },

      create: {
        clerkId: user.id,
        name,
        age: age ? parseInt(age) : null,
        gender,
        image,
        email,
        phone,
        address
      }
    })

    return NextResponse.json({ profile })

  } catch (error) {
    console.error("POST Profile Error:", error)

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}