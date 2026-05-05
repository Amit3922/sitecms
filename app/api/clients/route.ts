import { NextRequest, NextResponse } from "next/server"
import { adminAuth, adminDb } from "@/lib/firebase/admin"
import { getSessionUser, isAdmin } from "@/lib/firebase/session"
import { FieldValue } from "firebase-admin/firestore"

export async function POST(req: NextRequest) {
  const user = await getSessionUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (!(await isAdmin(user.uid))) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const { name, domain, template, userEmail } = await req.json()

  // Create the client doc
  const clientRef = await adminDb.collection("clients").add({
    name,
    domain,
    template,
    content: {},
    createdAt: FieldValue.serverTimestamp(),
  })

  // Create Firebase Auth user for the client
  let clientUser
  try {
    clientUser = await adminAuth.getUserByEmail(userEmail)
  } catch {
    clientUser = await adminAuth.createUser({
      email: userEmail,
      emailVerified: false,
    })
  }

  // Link user to client
  await adminDb.collection("clientUsers").doc(clientUser.uid).set(
    { clientIds: FieldValue.arrayUnion(clientRef.id) },
    { merge: true }
  )

  // Generate a password setup link the admin can copy and send to the client
  const setupLink = await adminAuth.generatePasswordResetLink(userEmail)

  return NextResponse.json({ id: clientRef.id, setupLink })
}
