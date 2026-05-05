import { NextResponse } from "next/server"
import { getAdminAuth, getAdminDb } from "@/lib/firebase/admin"
import { getSessionUser } from "@/lib/firebase/session"
import { FieldValue } from "firebase-admin/firestore"

export async function POST() {
  const db = getAdminDb()

  // Only works if there are zero admins — locks itself after first use
  const existing = await db.collection("admins").limit(1).get()
  if (!existing.empty) {
    return NextResponse.json({ error: "Setup already complete." }, { status: 403 })
  }

  const user = await getSessionUser()
  if (!user) {
    return NextResponse.json({ error: "You must be logged in." }, { status: 401 })
  }

  await db.collection("admins").doc(user.uid).set({
    email: user.email,
    createdAt: FieldValue.serverTimestamp(),
  })

  return NextResponse.json({ ok: true, message: `${user.email} is now admin.` })
}
