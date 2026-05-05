"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save } from "lucide-react"
import type { Client, ContentSchema } from "@/lib/types"

interface Props {
  client: Client
  schema: ContentSchema
}

export default function ContentEditor({ client, schema }: Props) {
  const [content, setContent] = useState<Record<string, string>>(
    (client.content as Record<string, string>) ?? {}
  )
  const [saving, setSaving] = useState(false)

  function setValue(key: string, value: string) {
    setContent((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSave() {
    setSaving(true)
    const res = await fetch(`/api/clients/${client.id}/content`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    })

    if (res.ok) {
      toast.success("Changes saved — your site is updating.")
    } else {
      const { error } = await res.json()
      toast.error(error ?? "Something went wrong.")
    }

    setSaving(false)
  }

  return (
    <div className="flex flex-col gap-6">
      {schema.sections.map((section) => (
        <Card key={section.title}>
          <CardHeader>
            <CardTitle className="text-base">{section.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {section.fields.map((field) => (
              <div key={field.key} className="flex flex-col gap-1.5">
                <Label htmlFor={field.key}>{field.label}</Label>
                {field.type === "textarea" ? (
                  <Textarea
                    id={field.key}
                    value={content[field.key] ?? ""}
                    onChange={(e) => setValue(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    rows={3}
                  />
                ) : (
                  <Input
                    id={field.key}
                    type={field.type === "email" ? "email" : field.type === "url" ? "url" : "text"}
                    value={content[field.key] ?? ""}
                    onChange={(e) => setValue(field.key, e.target.value)}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} size="lg">
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}
