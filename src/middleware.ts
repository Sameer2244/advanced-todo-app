import { parse, serialize } from "cookie";
import { SignJWT } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyAccessToken } from "./lib/auth";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  // Flow:
  // 1. check if access token is present then verify it
  // 2. if no valid access token found then try to get a new one with refresh token
  // 3. if neither succeeds then redirect to login (unless already on login page)

  const cookies = parse(req.headers.get("cookie") || "");
  const accessToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;

  const loginUrl = new URL("/login", req.url);
  const dashboardUrl = new URL("/", req.url);

  // If user is trying to access login page and has valid access token, redirect to dashboard
  if (req.nextUrl.pathname === "/login" && accessToken) {
    try {
      const isValid = await verifyAccessToken(accessToken);
      if (isValid) {
        return NextResponse.redirect(dashboardUrl);
      }
    } catch (err) {
      console.error("Access token verification failed in middleware:", err);
    }
  }

  // If user is on login page and doesn't have valid access token, allow access
  if (req.nextUrl.pathname === "/login") {
    return NextResponse.next();
  }

  // For all other routes, check authentication
  if (accessToken) {
    try {
      const isValid = await verifyAccessToken(accessToken);
      if (isValid) {
        return NextResponse.next();
      }
    } catch (err) {
      console.error("Access token verification failed in middleware:", err);
    }
  }

  // Try to refresh access token using refresh token
  if (refreshToken) {
    try {
      const payload = (await verifyAccessToken(refreshToken)) as unknown as {
        userId: string;
      };

      if (payload) {
        const newAccessToken = await new SignJWT(payload)
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime("15m")
          .sign(new TextEncoder().encode("access_secret"));

        if (newAccessToken) {
          const res = NextResponse.next();
          // Set the new access token in cookies
          res.headers.append(
            "Set-Cookie",
            serialize("accessToken", newAccessToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              path: "/",
              maxAge: 15 * 60, // 15 minutes to match JWT expiration
              sameSite: "lax",
            })
          );
          return res;
        }
      }
    } catch (err) {
      console.error("Refresh token verification failed in middleware:", err);
    }
  }

  // If no valid tokens, redirect to login
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*", "/account/:path*"],
};
