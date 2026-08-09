import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (pathname === "/destinations" || pathname.startsWith("/destinations/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace("/destinations", "/Destinations");
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/destinations", "/destinations/:path*"],
};
