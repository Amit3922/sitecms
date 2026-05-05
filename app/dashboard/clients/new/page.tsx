import { redirect } from "next/navigation"
import { getSessionUser, isAdmin } from "@/lib/firebase/session"
import NewClientForm from "@/components/dashboard/NewClientForm"

export default async function NewClientPage() {
  const user = await getSessionUser()
  if (!user) redirect("/login")

  const admin = await isAdmin(user.uid)
  if (!admin) redirect("/dashboard")

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold mb-6">Add New Client</h1>
      <NewClientForm />
    </div>
  )
}
