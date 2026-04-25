export const dynamic = "force-dynamic";
export const runtime = "nodejs"

import prisma from "@/lib/prisma"
import authSeller from "@/middlewares/authSeller"
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

// ✅ CATEGORY NORMALIZER
const normalizeCategory = (cat) => {
  const map = {
    speaker: "Speakers",
    speakers: "Speakers",

    sport: "Sports & Outdoors",
    sports: "Sports & Outdoors",
    "sports & outdoors": "Sports & Outdoors",

    toy: "Toys & Games",
    toys: "Toys & Games",
    "toys and games": "Toys & Games",
    "toys & games": "Toys & Games",

    watch: "Watch",
    decoration: "Decoration",
  };

  return map[cat?.toLowerCase().trim()] || cat;
};


// ✅ GET PRODUCTS
export async function GET(request) {
  try {
    const { userId } = getAuth(request)
    const storeId = await authSeller(userId)

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


// ✅ CREATE PRODUCT (FINAL FIXED)
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

    const rawCategory = formData.get("category")
    const category = normalizeCategory(rawCategory)

    // ✅ FIX: SAFE FILE HANDLING
    let files = formData.getAll("images")

    // 🔥 REMOVE EMPTY FILES (IMPORTANT FIX)
    files = files.filter(file => file && file.size > 0)

    if (!name || !description || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (isNaN(price) || isNaN(mrp)) {
      return NextResponse.json({ error: "Invalid price or MRP" }, { status: 400 })
    }

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "At least one image required" }, { status: 400 })
    }

    const imageUrls = []

    for (const image of files) {
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
        console.error(uploadRes)
        return NextResponse.json({ error: "Image upload failed" }, { status: 500 })
      }

      imageUrls.push(uploadRes.url)
    }

    await prisma.product.create({
      data: {
        name,
        price,
        mrp,
        description,
        category,
        images: imageUrls,
        storeId
      }
    })

    return NextResponse.json({ message: "Product added successfully" })

  } catch (error) {
    console.error("PRODUCT CREATE ERROR:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}


// ✅ DELETE PRODUCT (UNCHANGED)
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


// ✅ UPDATE PRODUCT (UNCHANGED LOGIC, SAFE)
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

    const rawCategory = formData.get("category")
    const category = normalizeCategory(rawCategory)

    let files = formData.getAll("images")
    files = files.filter(file => file && file.size > 0)

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

    if (files && files.length > 0) {
      const imageUrls = []

      for (const image of files) {
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

        imageUrls.push(uploadRes.url)
      }

      updatedImages = imageUrls
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