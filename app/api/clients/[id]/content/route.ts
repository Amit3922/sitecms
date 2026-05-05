import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase/admin"
import { getSessionUser, isAdmin } from "@/lib/firebase/session"

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await getSessionUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const admin = await isAdmin(user.uid)
  if (!admin) {
    const userDoc = await adminDb.collection("clientUsers").doc(user.uid).get()
    const clientIds: string[] = userDoc.exists ? (userDoc.data()?.clientIds ?? []) : []
    if (!clientIds.includes(id)) return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { content } = await req.json()
  await adminDb.collection("clients").doc(id).update({ content })

  return NextResponse.json({ ok: true })
}
