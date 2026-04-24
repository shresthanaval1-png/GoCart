export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { userId } = getAuth(request);

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let user = await prisma.user.findUnique({
            where: { id: userId }
        });

        // create user if not exists
        if (!user) {
            user = await prisma.user.create({
                data: {
                    id: userId,
                    name: "User",
                    email: "user@gmail.com",
                    image: "",
                }
            });
        }

        return NextResponse.json({ user });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}