interface Props {
  content: Record<string, unknown>
}

function get(content: Record<string, unknown>, key: string, fallback = ""): string {
  return (content[key] as string) ?? fallback
}

export default function SalonTemplate({ content }: Props) {
  const services = [
    { name: get(content, "service_1_name"), price: get(content, "service_1_price") },
    { name: get(content, "service_2_name"), price: get(content, "service_2_price") },
    { name: get(content, "service_3_name"), price: get(content, "service_3_price") },
  ].filter((s) => s.name)

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero */}
      <section className="bg-rose-900 text-white py-24 px-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-4">
          {get(content, "hero_title", "Welcome")}
        </h1>
        <p className="text-xl text-rose-200 max-w-xl mx-auto">
          {get(content, "hero_subtitle")}
        </p>
        {get(content, "booking_url") && (
          <a
            href={get(content, "booking_url")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 px-8 py-3 bg-white text-rose-900 font-semibold rounded-full hover:bg-rose-50 transition-colors"
          >
            Book Appointment
          </a>
        )}
      </section>

      {/* Services */}
      {services.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Our Services</h2>
          <div className="divide-y border rounded-xl overflow-hidden">
            {services.map((s, i) => (
              <div key={i} className="flex justify-between items-center px-6 py-5">
                <span className="text-lg">{s.name}</span>
                <span className="font-semibold text-rose-700 text-lg">{s.price}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="bg-rose-50 py-16 px-6">
        <div className="max-w-3xl mx-auto">
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
        </div>
      </section>
    </div>
  )
}
