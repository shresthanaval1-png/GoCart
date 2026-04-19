import imagekit from "@/configs/imageKit"
import prisma from "@/lib/prisma"
import authSeller from "@/middlewares/authSeller"
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

// ✅ GET
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

// ✅ DELETE (FIXED)
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

        await prisma.product.delete({
            where: { id }
        })

        return NextResponse.json({ message: "Deleted successfully" })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}

// ✅ PUT (FINAL FIXED VERSION)
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
        const price = Number(formData.get("price"))
        const mrp = Number(formData.get("mrp"))
        const description = formData.get("description")
        const category = formData.get("category")
        const image = formData.get("image")

        if (!id) {
            return NextResponse.json({ error: "Missing ID" }, { status: 400 })
        }

        // ✅ check product belongs to seller
        const existing = await prisma.product.findFirst({
            where: { id, storeId }
        })

        if (!existing) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 })
        }

        let updatedImages = existing.images

        // ✅ upload new image if provided
        if (image && image.name) {
            const buffer = Buffer.from(await image.arrayBuffer())

            const res = await imagekit.upload({
                file: buffer,
                fileName: image.name,
                folder: "products"
            })

            updatedImages = [
                imagekit.url({
                    path: res.filePath,
                    transformation: [{ quality: 'auto' }, { format: 'webp' }]
                })
            ]
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