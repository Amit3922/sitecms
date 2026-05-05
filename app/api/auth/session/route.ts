import { NextRequest, NextResponse } from "next/server"
import { adminAuth } from "@/lib/firebase/admin"
import { cookies } from "next/headers"

const FIVE_DAYS = 60 * 60 * 24 * 5 * 1000

export async function POST(req: NextRequest) {
  const { idToken } = await req.json()

  try {
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: FIVE_DAYS,
    })

    const cookieStore = await cookies()
    cookieStore.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: FIVE_DAYS / 1000,
      path: "/",
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
  return NextResponse.json({ ok: true })
}
