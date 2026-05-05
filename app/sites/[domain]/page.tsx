import { notFound } from "next/navigation"
import { adminDb } from "@/lib/firebase/admin"
import RestaurantTemplate from "@/templates/restaurant"
import BakeryTemplate from "@/templates/bakery"
import SalonTemplate from "@/templates/salon"
import PlumberTemplate from "@/templates/plumber"
import GenericTemplate from "@/templates/generic"
import type { Client } from "@/lib/types"

export const revalidate = 60

export default async function SitePage({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params

  const snap = await adminDb
    .collection("clients")
    .where("domain", "==", domain)
    .limit(1)
    .get()

  if (snap.empty) notFound()

  const client = { id: snap.docs[0].id, ...snap.docs[0].data() } as Client

  switch (client.template) {
    case "restaurant":
      return <RestaurantTemplate content={client.content} />
    case "bakery":
      return <BakeryTemplate content={client.content} />
    case "salon":
      return <SalonTemplate content={client.content} />
    case "plumber":
      return <PlumberTemplate content={client.content} />
    default:
      return <GenericTemplate content={client.content} name={client.name} />
  }
}
