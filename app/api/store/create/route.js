export const dynamic = "force-dynamic";

export const runtime = "nodejs"

import imagekit from "@/configs/imageKit"
import prisma from "@/lib/prisma"
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

// CREATE STORE
export async function POST(request) {
  try {
    const { userId } = getAuth(request)

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // ✅ Always sync user (PERMANENT FIX)
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        name: "User",
        email: "user@gmail.com",
        image: "",
      },
    })

    const formData = await request.formData()

    const name = formData.get("name")
    const username = formData.get("username")?.trim()
    const description = formData.get("description")
    const email = formData.get("email")
    const contact = formData.get("contact")
    const address = formData.get("address")
    const image = formData.get("image")

    if (!name || !username || !description || !email || !contact || !address) {
      return NextResponse.json({ error: "Missing store info" }, { status: 400 })
    }

    // ✅ Prevent duplicate store
    const existingStore = await prisma.store.findUnique({
      where: { userId }
    })

    if (existingStore) {
      return NextResponse.json({ status: existingStore.status })
    }

    // ✅ Username uniqueness
    const isUsernameTaken = await prisma.store.findFirst({
      where: { username: username.toLowerCase() },
    })

    if (isUsernameTaken) {
      return NextResponse.json({ error: "Username already taken" }, { status: 400 })
    }

    let optimizedImage = ""

    if (image && typeof image !== "string" && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer())

      const uploadRes = await imagekit.upload({
        file: buffer,
        fileName: image.name,
        folder: "logos",
      })

      optimizedImage = imagekit.url({
        path: uploadRes.filePath,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: "512" },
        ],
      })
    }

    // ✅ SAFE CREATE (STEP 4: ADMIN APPROVAL CONTROLS ACCESS)
    try {
      await prisma.store.create({
        data: {
          userId,
          name,
          description,
          username: username.toLowerCase(),
          email,
          contact,
          address,
          logo: optimizedImage,
          status: "PENDING",   // ✅ stays (admin will approve)
          isActive: false      // ✅ no longer used for access
        },
      })
    } catch (err) {
      if (err.code === "P2002") {
        const existing = await prisma.store.findUnique({
          where: { userId }
        })

        return NextResponse.json({ status: existing?.status || "PENDING" })
      }
      throw err
    }

    return NextResponse.json({
      message: "Store created successfully",
    })

  } catch (error) {
    console.error("STORE CREATE ERROR:", error)

    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    )
  }
}


// GET STORE STATUS
export async function GET(request) {
  try {
    const { userId } = getAuth(request)

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const store = await prisma.store.findUnique({
      where: { userId }
    })

    if (store) {
      return NextResponse.json({ status: store.status })
    }

    return NextResponse.json({ status: "not registered" })

  } catch (error) {
    console.error("STORE STATUS ERROR:", error)

    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    )
  }
}