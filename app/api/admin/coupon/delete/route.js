import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req) {
  const { code } = await req.json()

  await prisma.coupon.delete({
    where: { code }
  })

  return NextResponse.json({ success: true })
}