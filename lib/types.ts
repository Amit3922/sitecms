export type Template = "restaurant" | "bakery" | "salon" | "plumber" | "generic"

export interface Client {
  id: string
  name: string
  domain: string
  template: Template
  content: Record<string, unknown>
  created_at: string
}

export interface ContentField {
  key: string
  label: string
  type: "text" | "textarea" | "price" | "phone" | "email" | "url" | "list"
  placeholder?: string
}

export interface ContentSchema {
  sections: {
    title: string
    fields: ContentField[]
  }[]
}
