import { notFound, redirect } from "next/navigation"
import { getSessionUser, isAdmin } from "@/lib/firebase/session"
import { adminDb } from "@/lib/firebase/admin"
import ContentEditor from "@/components/dashboard/ContentEditor"
import { schemas } from "@/lib/schemas"
import type { Client } from "@/lib/types"

export default async function ClientEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await getSessionUser()
  if (!user) redirect("/login")

  const doc = await adminDb.collection("clients").doc(id).get()
  if (!doc.exists) notFound()

  const client = { id: doc.id, ...doc.data() } as Client

  const admin = await isAdmin(user.uid)
  if (!admin) {
    const userDoc = await adminDb.collection("clientUsers").doc(user.uid).get()
    const clientIds: string[] = userDoc.exists ? (userDoc.data()?.clientIds ?? []) : []
    if (!clientIds.includes(id)) redirect("/dashboard")
  }

  const schema = schemas[client.template]

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">{client.name}</h1>
        <p className="text-sm text-zinc-500 mt-1">{client.domain}</p>
      </div>
      <ContentEditor client={client} schema={schema} />
    </div>
  )
}
