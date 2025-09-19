import { parse, serialize } from "cookie";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  generateAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "./lib/auth";
import { jwtVerify, SignJWT } from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  // Flow:
  // 1. check if access token is present then verify it
  // 2. if no valid access token found then try to get a new one with refresh token
  // 3. if neither succeeds then redirect to login
  const cookies = parse(req.headers.get("cookie") || "");
  const accessToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;

  const loginUrl = new URL("/login", req.url);

  if (accessToken) {
    try {
      const isValid = await jwtVerify(
        accessToken,
        new TextEncoder().encode("access_secret")
      );
      if (isValid) return NextResponse.next();
    } catch (err) {
      // token invalid or expired, proceed to try refresh token
      // log for debugging (kept lightweight to avoid leaking sensitive data)
      console.error("Access token verification failed in middleware:", err);
    }
  }

  if (refreshToken) {
    try {
      const payload = (await jwtVerify(
        refreshToken,
        new TextEncoder().encode("refresh_secret")
      )) as unknown as { userId: string };

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
              maxAge: 60 * 60 * 24 * 7, // 7 days
              sameSite: "lax",
            })
          );
          return res;
        }
      }
    } catch (err) {
      // refresh token invalid/expired - fallthrough to redirect
      console.error("Refresh token verification failed in middleware:", err);
    }
  }

  return NextResponse.redirect(loginUrl);
}
export const config = {
  matcher: ["/", "/dashboard/:path*", "/account/:path*"], // adjust as needed
};
