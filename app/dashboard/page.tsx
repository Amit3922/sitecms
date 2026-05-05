import Link from "next/link"
import { getSessionUser, isAdmin } from "@/lib/firebase/session"
import { adminDb } from "@/lib/firebase/admin"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Plus, Settings } from "lucide-react"
import type { Client } from "@/lib/types"

export default async function DashboardPage() {
  const user = await getSessionUser()
  if (!user) return null

  const admin = await isAdmin(user.uid)
  let clients: Client[] = []

  if (admin) {
    const snap = await adminDb.collection("clients").orderBy("createdAt", "desc").get()
    clients = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Client))
  } else {
    const userDoc = await adminDb.collection("clientUsers").doc(user.uid).get()
    const clientIds: string[] = userDoc.exists ? (userDoc.data()?.clientIds ?? []) : []

    clients = await Promise.all(
      clientIds.map(async (id) => {
        const d = await adminDb.collection("clients").doc(id).get()
        return { id: d.id, ...d.data() } as Client
      })
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">
            {admin ? "All Clients" : "Your Website"}
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            {admin ? "Manage all client websites" : "Edit your website content"}
          </p>
        </div>
        {admin && (
          <Link href="/dashboard/clients/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Client
            </Button>
          </Link>
        )}
      </div>

      {clients.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center text-zinc-400">
            No websites yet.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((client) => (
            <Card key={client.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <CardDescription className="mt-1">{client.domain}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="capitalize">{client.template}</Badge>
                </div>
              </CardHeader>
              <CardContent className="mt-auto flex gap-2">
                <Link href={`/dashboard/clients/${client.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Content
                  </Button>
                </Link>
                <a href={`https://${client.domain}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
