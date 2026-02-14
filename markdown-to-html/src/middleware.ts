import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if the request is for the admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Check for authentication token in cookies
    const token = request.cookies.get("admin_token")?.value;
    const expectedToken = process.env.ADMIN_TOKEN;

    // If no token or token doesn't match, redirect to login
    if (!token || token !== expectedToken) {
      // Allow access to the login page itself
      if (request.nextUrl.pathname === "/admin/login") {
        return NextResponse.next();
      }

      // Redirect to login page
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
