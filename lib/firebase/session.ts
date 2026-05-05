import { cookies } from "next/headers"
import { adminAuth, adminDb } from "./admin"

export async function getSessionUser() {
  const cookieStore = await cookies()
  const session = cookieStore.get("session")?.value

  if (!session) return null

  try {
    const decoded = await adminAuth.verifySessionCookie(session, true)
    return decoded
  } catch {
    return null
  }
}

export async function isAdmin(uid: string): Promise<boolean> {
  const doc = await adminDb.collection("FQNBAfSWd1YeYnoe5mqftwFC1nL2").doc(uid).get()
  return doc.exists
}
