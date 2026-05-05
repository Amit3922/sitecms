import { NextRequest, NextResponse } from "next/server"

export async function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? ""
  const dashboardDomain = process.env.NEXT_PUBLIC_DASHBOARD_DOMAIN ?? "localhost:3000"

  if (host === dashboardDomain || host.startsWith("localhost")) {
    return NextResponse.next()
  }

  // Rewrite client domains to /sites/[domain]
  const url = request.nextUrl.clone()
  url.pathname = `/sites/${host}${url.pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
