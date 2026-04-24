export const runtime = "nodejs"

import prisma from "@/lib/prisma"
import authSeller from "@/middlewares/authSeller"
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"


// ✅ GET PRODUCTS
export async function GET(request) {
  try {
    const { userId } = getAuth(request)
    const storeId = await authSeller(userId)

    // ✅ FIX: prevent invalid storeId
    if (!storeId) {
      return NextResponse.json({ error: "not authorized" }, { status: 401 })
    }

    const products = await prisma.product.findMany({
      where: { storeId }
    })

    return NextResponse.json({ products })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}


// ✅ CREATE PRODUCT
export async function POST(request) {
  try {
    const { userId } = getAuth(request)
    const storeId = await authSeller(userId)

    if (!storeId) {
      return NextResponse.json({ error: "not authorized" }, { status: 401 })
    }

    const formData = await request.formData()

    const name = formData.get("name")
    const price = parseFloat(formData.get("price"))
    const mrp = parseFloat(formData.get("mrp"))
    const description = formData.get("description")
    const category = formData.get("category")
    const image = formData.get("image")

    if (!name || !description || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (isNaN(price) || isNaN(mrp)) {
      return NextResponse.json({ error: "Invalid price or MRP" }, { status: 400 })
    }

    if (!image || typeof image === "string") {
      return NextResponse.json({ error: "Image required" }, { status: 400 })
    }

    const buffer = Buffer.from(await image.arrayBuffer())
    const base64File = buffer.toString("base64")

    const res = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(process.env.IMAGEKIT_PRIVATE_KEY + ":").toString("base64"),
      },
      body: new URLSearchParams({
        file: `data:${image.type};base64,${base64File}`,
        fileName: image.name,
        folder: "products",
      }),
    })

    const uploadRes = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: "Image upload failed" }, { status: 500 })
    }

    const imageUrl = uploadRes.url

    await prisma.product.create({
      data: {
        name,
        price,
        mrp,
        description,
        category,
        images: [imageUrl],
        storeId
      }
    })

    return NextResponse.json({ message: "Product added successfully" })

  } catch (error) {
    console.error("PRODUCT CREATE ERROR:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}


// ✅ DELETE PRODUCT
export async function DELETE(request) {
  try {
    const { userId } = getAuth(request)
    const storeId = await authSeller(userId)

    if (!storeId) {
      return NextResponse.json({ error: "not authorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 })
    }

    // ✅ safety: ensure product belongs to seller
    const product = await prisma.product.findFirst({
      where: { id, storeId }
    })

    if (!product) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await prisma.orderItem.deleteMany({
      where: { productId: id }
    })

    await prisma.product.delete({
      where: { id }
    })

    return NextResponse.json({ message: "Deleted successfully" })

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}


// ✅ UPDATE PRODUCT
export async function PUT(request) {
  try {
    const { userId } = getAuth(request)
    const storeId = await authSeller(userId)

    if (!storeId) {
      return NextResponse.json({ error: "not authorized" }, { status: 401 })
    }

    const formData = await request.formData()

    const id = formData.get("id")
    const name = formData.get("name")
    const price = parseFloat(formData.get("price"))
    const mrp = parseFloat(formData.get("mrp"))
    const description = formData.get("description")
    const category = formData.get("category")
    const image = formData.get("image")

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 })
    }

    const existing = await prisma.product.findFirst({
      where: { id, storeId }
    })

    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    let updatedImages = existing.images

    if (image && typeof image !== "string" && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer())
      const base64File = buffer.toString("base64")

      const res = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(process.env.IMAGEKIT_PRIVATE_KEY + ":").toString("base64"),
        },
        body: new URLSearchParams({
          file: `data:${image.type};base64,${base64File}`,
          fileName: image.name,
          folder: "products",
        }),
      })

      const uploadRes = await res.json()

      if (!res.ok) {
        return NextResponse.json({ error: "Image upload failed" }, { status: 500 })
      }

      updatedImages = [uploadRes.url]
    }

    await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        mrp,
        description,
        category,
        images: updatedImages
      }
    })

    return NextResponse.json({ message: "Updated successfully" })

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}