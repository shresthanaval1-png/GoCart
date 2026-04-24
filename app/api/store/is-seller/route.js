import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Auth Seller
export async function GET(request) {
    try {
        const { userId } = getAuth(request);

        // ✅ Not logged in (NO BREAK)
        if (!userId) {
            return NextResponse.json({
                isSeller: false,
                storeInfo: null
            });
        }

        // ✅ PRIMARY: exact match
        let storeInfo = await prisma.store.findUnique({
            where: { userId }
        });

        // ✅ FALLBACK (safe for old data)
        if (!storeInfo) {
            storeInfo = await prisma.store.findFirst({
                where: { userId },
                orderBy: { createdAt: "desc" }
            });
        }

        // ✅ STEP 1 APPLIED: ONLY ADMIN APPROVAL CONTROLS ACCESS
        const isSeller = storeInfo?.status === "APPROVED";

        return NextResponse.json({
            isSeller,
            storeInfo
        });

    } catch (error) {
        console.error("IS SELLER ERROR:", error);

        // ✅ NEVER break frontend
        return NextResponse.json(
            {
                isSeller: false,
                storeInfo: null
            },
            { status: 200 }
        );
    }
}