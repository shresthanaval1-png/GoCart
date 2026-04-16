import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// ✅ DELETE MESSAGE BY ID
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    const existing = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Message not found" },
        { status: 404 }
      );
    }

    await prisma.contactMessage.delete({
      where: { id },
    });

    console.log("Deleted:", id);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("DELETE ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}