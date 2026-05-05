"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Copy, Check } from "lucide-react"
import type { Template } from "@/lib/types"

const TEMPLATES: { value: Template; label: string }[] = [
  { value: "restaurant", label: "Restaurant / Cafe" },
  { value: "bakery", label: "Bakery" },
  { value: "salon", label: "Hair Salon / Beauty" },
  { value: "plumber", label: "Plumber / Tradesperson" },
  { value: "generic", label: "Generic Business" },
]

export default function NewClientForm() {
  const [loading, setLoading] = useState(false)
  const [setupLink, setSetupLink] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({
    name: "",
    domain: "",
    template: "generic" as Template,
    userEmail: "",
  })

  function set(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function copyLink() {
    if (!setupLink) return
    await navigator.clipboard.writeText(setupLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const res = await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      const data = await res.json()
      setSetupLink(data.setupLink)
      toast.success("Client created successfully!")
    } else {
      const { error } = await res.json()
      toast.error(error ?? "Something went wrong.")
      setLoading(false)
    }
  }

  if (setupLink) {
    return (
      <Card>
        <CardContent className="pt-6 flex flex-col gap-4">
          <div className="rounded-lg bg-green-50 border border-green-200 p-4">
            <p className="font-semibold text-green-800 mb-1">Client created!</p>
            <p className="text-sm text-green-700">
              Copy the link below and send it to <strong>{form.userEmail}</strong>. They will use it to set their password and log in.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Login setup link for client</Label>
            <div className="flex gap-2">
              <Input value={setupLink} readOnly className="text-xs text-zinc-500" />
              <Button type="button" variant="outline" size="icon" onClick={copyLink}>
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-xs text-zinc-500">Send this link via WhatsApp, email, or any message. It expires after 1 hour.</p>
          </div>

          <Button variant="outline" onClick={() => window.location.href = "/dashboard"}>
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Business Name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Mario's Pizza"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="domain">Domain</Label>
            <Input
              id="domain"
              value={form.domain}
              onChange={(e) => set("domain", e.target.value)}
              placeholder="mariospizza.com"
              required
            />
            <p className="text-xs text-zinc-500">The domain where this client&apos;s website will live.</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Template</Label>
            <Select value={form.template} onValueChange={(v) => v && set("template", v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TEMPLATES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="userEmail">Client Email (for login)</Label>
            <Input
              id="userEmail"
              type="email"
              value={form.userEmail}
              onChange={(e) => set("userEmail", e.target.value)}
              placeholder="owner@mariospizza.com"
              required
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Client"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
