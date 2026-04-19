import { inngest } from "@/inngest/client";
import prisma from "@/lib/prisma";
import authAdmin from "@/middlewares/authAdmin";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// ✅ ADD COUPON
export async function POST(request) {
    try {
        const { userId } = getAuth(request)
        const isAdmin = await authAdmin(userId)

        if (!isAdmin) {
            return NextResponse.json({ error: "not authorized" }, { status: 401 })
        }

        const { coupon } = await request.json()

        // 🔥 FIX: safe uppercase
        coupon.code = coupon.code.toUpperCase()

        // ✅ CREATE COUPON FIRST (IMPORTANT)
        const createdCoupon = await prisma.coupon.create({
            data: coupon
        })

        // ✅ TRY INNGEST (BUT DON'T BREAK FLOW)
        try {
            await inngest.send({
                name: "app/coupon.expired",
                data: {
                    code: createdCoupon.code,
                    expires_at: createdCoupon.expiresAt,
                }
            })
        } catch (inngestError) {
            console.error("Inngest Error (ignored):", inngestError.message)
            // ❌ DO NOT THROW → prevents 400
        }

        // ✅ ALWAYS SUCCESS
        return NextResponse.json({
            message: "Coupon added successfully",
            coupon: createdCoupon
        })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}


// ✅ DELETE COUPON
export async function DELETE(request) {
    try {
        const { userId } = getAuth(request)
        const isAdmin = await authAdmin(userId)

        if (!isAdmin) {
            return NextResponse.json({ error: "not authorized" }, { status: 401 })
        }

        const { searchParams } = request.nextUrl
        const code = searchParams.get('code')

        if (!code) {
            return NextResponse.json({ error: "Coupon code required" }, { status: 400 })
        }

        await prisma.coupon.delete({
            where: { code }
        })

        return NextResponse.json({ message: 'Coupon deleted successfully' })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}


// ✅ GET COUPONS
export async function GET(request) {
    try {
        const { userId } = getAuth(request)
        const isAdmin = await authAdmin(userId)

        if (!isAdmin) {
            return NextResponse.json({ error: "not authorized" }, { status: 401 })
        }

        const coupons = await prisma.coupon.findMany({
            orderBy: { createdAt: "desc" }
        })

        return NextResponse.json({ coupons })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}