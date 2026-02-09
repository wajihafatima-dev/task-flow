// app/api/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This will act like a server-side "middleware"
export async function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;
  console.log('data')
  // Redirect to login if trying to access dashboard without token
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect to home if logged in user goes to login/signup
  if (token && ["/login", "/signup"].includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard ", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
