import { NextRequest, NextResponse } from "next/server";
import { readJSON } from "@/lib/vault";

const AUTH_FILE = "auth-config.json";

// Routes that don't require authentication
const PUBLIC_ROUTES = ["/api/auth", "/_next", "/favicon.ico", "/login"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes
  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check if auth is configured
  try {
    const config = await readJSON(AUTH_FILE, null);
    if (!config) {
      // Auth not configured — allow access (first-run setup)
      return NextResponse.next();
    }
  } catch {
    return NextResponse.next();
  }

  // Check session cookie
  const sessionToken = req.cookies.get("agent_os_session")?.value;

  if (!sessionToken) {
    // Redirect to login page
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Verify session against vault
  try {
    const config = await readJSON(AUTH_FILE, null);
    if (config && sessionToken === config.sessionSecret) {
      return NextResponse.next();
    }
  } catch {}

  // Invalid session — redirect to login
  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
