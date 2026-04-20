import imagekit from "@/configs/imageKit";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// ✅ CREATE STORE
export async function POST(request) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 🔥 Ensure user exists
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          name: "User",
          email: "user@gmail.com",
          image: "",
        },
      });
    }

    // 🔥 Get form data
    const formData = await request.formData();

    const name = formData.get("name");
    const username = formData.get("username")?.trim();
    const description = formData.get("description");
    const email = formData.get("email");
    const contact = formData.get("contact");
    const address = formData.get("address");
    const image = formData.get("image");

    if (!name || !username || !description || !email || !contact || !address || !image) {
      return NextResponse.json({ error: "Missing store info" }, { status: 400 });
    }

    // 🔥 Check existing store
    const existingStore = await prisma.store.findFirst({
      where: { userId },
    });

    if (existingStore) {
      return NextResponse.json({ status: existingStore.status });
    }

    // 🔥 Check username
    const isUsernameTaken = await prisma.store.findFirst({
      where: { username: username.toLowerCase() },
    });

    if (isUsernameTaken) {
      return NextResponse.json({ error: "Username already taken" }, { status: 400 });
    }

    // 🔥 Upload image (SAFE)
    let optimizedImage = "";

    if (image && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer());

      const uploadRes = await imagekit.upload({
        file: buffer,
        fileName: image.name,
        folder: "logos",
      });

      optimizedImage = imagekit.url({
        path: uploadRes.filePath,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: "512" },
        ],
      });
    }

    // 🔥 Create store
    const newStore = await prisma.store.create({
      data: {
        userId,
        name,
        description,
        username: username.toLowerCase(),
        email,
        contact,
        address,
        logo: optimizedImage,
      },
    });

    // 🔥 Link store to user
    await prisma.user.update({
      where: { id: userId },
      data: {
        store: {
          connect: { id: newStore.id },
        },
      },
    });

    return NextResponse.json({
      message: "Applied successfully, waiting for approval",
    });

  } catch (error) {
    console.error("STORE CREATE ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}


// ✅ GET STORE STATUS
export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const store = await prisma.store.findFirst({
      where: { userId },
    });

    if (store) {
      return NextResponse.json({ status: store.status });
    }

    return NextResponse.json({ status: "not registered" });

  } catch (error) {
    console.error("STORE STATUS ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}