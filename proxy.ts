import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  // Get access token from cookies
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  console.log("Checking token for route:", pathname);
  if (!token && pathname.startsWith("/dashboard" ) || pathname.startsWith("/api/protected")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2️⃣ Prevent logged-in users from accessing login/signup
  if (token && ["/login", "/signup"].includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};