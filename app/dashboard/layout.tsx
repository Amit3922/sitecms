import { redirect } from "next/navigation"
import { getSessionUser } from "@/lib/firebase/session"
import DashboardNav from "@/components/dashboard/DashboardNav"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser()
  if (!user) redirect("/login")

  return (
    <div className="min-h-screen bg-zinc-50">
      <DashboardNav userEmail={user.email ?? ""} />
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
