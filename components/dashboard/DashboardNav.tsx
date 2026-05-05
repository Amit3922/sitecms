"use client"

import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase/client"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function DashboardNav({ userEmail }: { userEmail: string }) {
  const router = useRouter()

  async function handleSignOut() {
    await signOut(auth)
    await fetch("/api/auth/session", { method: "DELETE" })
    router.push("/login")
    router.refresh()
  }

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <span className="font-semibold text-zinc-900">SiteCMS</span>
        <div className="flex items-center gap-3">
          <span className="text-sm text-zinc-500">{userEmail}</span>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </Button>
        </div>
      </div>
    </header>
  )
}
