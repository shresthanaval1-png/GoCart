export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Get Dashboard Data for Seller
export async function GET(request){
    try {
        const { userId } = getAuth(request);

        const storeId = await authSeller(userId);

        // ✅ STEP 3: BLOCK IF NOT APPROVED SELLER
        if (!storeId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Get all orders for seller
        const orders = await prisma.order.findMany({
            where: { storeId }
        });

        // Get all products for seller
        const products = await prisma.product.findMany({
            where: { storeId }
        });

        // ✅ SAFE: avoid empty "in: []" edge case
        const productIds = products.map(p => p.id);

        const ratings = productIds.length
            ? await prisma.rating.findMany({
                  where: {
                      productId: { in: productIds }
                  },
                  include: {
                      user: true,
                      product: true
                  }
              })
            : [];

        const dashboardData = {
            ratings,
            totalOrders: orders.length,
            totalEarnings: Math.round(
                orders.reduce((acc, order) => acc + order.total, 0)
            ),
            totalProducts: products.length
        };

        return NextResponse.json({ dashboardData });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: error.code || error.message },
            { status: 400 }
        );
    }
}