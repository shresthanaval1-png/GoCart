import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const body = await req.json()

    console.log("Reply API HIT ✅")
    console.log("Body:", body)

    const { email, message } = body

    if (!email || !message) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      )
    }

    // ✅ TEMP SUCCESS (no email yet)
    return NextResponse.json({
      success: true,
      message: "Reply sent successfully"
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}