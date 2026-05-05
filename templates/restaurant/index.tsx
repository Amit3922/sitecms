interface Props {
  content: Record<string, unknown>
}

function get(content: Record<string, unknown>, key: string, fallback = ""): string {
  return (content[key] as string) ?? fallback
}

export default function RestaurantTemplate({ content }: Props) {
  const menuItems = [
    { name: get(content, "menu_item_1_name"), price: get(content, "menu_item_1_price") },
    { name: get(content, "menu_item_2_name"), price: get(content, "menu_item_2_price") },
    { name: get(content, "menu_item_3_name"), price: get(content, "menu_item_3_price") },
  ].filter((item) => item.name)

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero */}
      <section className="bg-zinc-900 text-white py-24 px-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-4">
          {get(content, "hero_title", "Welcome")}
        </h1>
        <p className="text-xl text-zinc-300 max-w-xl mx-auto">
          {get(content, "hero_subtitle")}
        </p>
      </section>

      {/* Menu */}
      {menuItems.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Our Menu</h2>
          <div className="divide-y border rounded-lg overflow-hidden">
            {menuItems.map((item, i) => (
              <div key={i} className="flex justify-between items-center px-6 py-4">
                <span className="text-lg">{item.name}</span>
                <span className="font-semibold text-zinc-700">{item.price}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* About */}
      {get(content, "about_text") && (
        <section className="bg-zinc-50 py-16 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4">About Us</h2>
            <p className="text-zinc-600 leading-relaxed whitespace-pre-line">
              {get(content, "about_text")}
            </p>
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">Find Us</h2>
        <div className="grid sm:grid-cols-2 gap-6 text-zinc-600">
          {get(content, "address") && (
            <div>
              <p className="font-semibold text-zinc-900 mb-1">Address</p>
              <p>{get(content, "address")}</p>
            </div>
          )}
          {get(content, "phone") && (
            <div>
              <p className="font-semibold text-zinc-900 mb-1">Phone</p>
              <a href={`tel:${get(content, "phone")}`} className="hover:underline">
                {get(content, "phone")}
              </a>
            </div>
          )}
          {get(content, "email") && (
            <div>
              <p className="font-semibold text-zinc-900 mb-1">Email</p>
              <a href={`mailto:${get(content, "email")}`} className="hover:underline">
                {get(content, "email")}
              </a>
            </div>
          )}
          {get(content, "hours") && (
            <div>
              <p className="font-semibold text-zinc-900 mb-1">Hours</p>
              <p className="whitespace-pre-line">{get(content, "hours")}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
