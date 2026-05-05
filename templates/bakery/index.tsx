interface Props {
  content: Record<string, unknown>
}

function get(content: Record<string, unknown>, key: string, fallback = ""): string {
  return (content[key] as string) ?? fallback
}

export default function BakeryTemplate({ content }: Props) {
  const products = [
    { name: get(content, "product_1_name"), price: get(content, "product_1_price") },
    { name: get(content, "product_2_name"), price: get(content, "product_2_price") },
    { name: get(content, "product_3_name"), price: get(content, "product_3_price") },
  ].filter((p) => p.name)

  return (
    <div className="min-h-screen bg-amber-50 font-sans">
      {/* Hero */}
      <section className="bg-amber-800 text-amber-50 py-24 px-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-4">
          {get(content, "hero_title", "Our Bakery")}
        </h1>
        <p className="text-xl text-amber-200 max-w-xl mx-auto">
          {get(content, "hero_subtitle")}
        </p>
      </section>

      {/* Products */}
      {products.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-semibold mb-8 text-center text-amber-900">Our Bakes</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {products.map((p, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center shadow-sm border border-amber-100">
                <p className="font-semibold text-lg text-amber-900">{p.name}</p>
                <p className="text-amber-600 mt-2 text-xl font-bold">{p.price}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* About */}
      {get(content, "about_text") && (
        <section className="bg-amber-100 py-16 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4 text-amber-900">Our Story</h2>
            <p className="text-amber-800 leading-relaxed whitespace-pre-line">
              {get(content, "about_text")}
            </p>
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold mb-8 text-center text-amber-900">Visit Us</h2>
        <div className="grid sm:grid-cols-2 gap-6 text-amber-800">
          {get(content, "address") && (
            <div>
              <p className="font-semibold text-amber-900 mb-1">Address</p>
              <p>{get(content, "address")}</p>
            </div>
          )}
          {get(content, "phone") && (
            <div>
              <p className="font-semibold text-amber-900 mb-1">Phone</p>
              <a href={`tel:${get(content, "phone")}`} className="hover:underline">
                {get(content, "phone")}
              </a>
            </div>
          )}
          {get(content, "email") && (
            <div>
              <p className="font-semibold text-amber-900 mb-1">Email</p>
              <a href={`mailto:${get(content, "email")}`} className="hover:underline">
                {get(content, "email")}
              </a>
            </div>
          )}
          {get(content, "hours") && (
            <div>
              <p className="font-semibold text-amber-900 mb-1">Hours</p>
              <p className="whitespace-pre-line">{get(content, "hours")}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
