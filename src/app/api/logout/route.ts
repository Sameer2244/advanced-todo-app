import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function GET() {
  const res = NextResponse.json({ message: "Logged out" });
  res.headers.append(
    "Set-Cookie",
    serialize("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(0),
    })
  );
  res.headers.append(
    "Set-Cookie",
    serialize("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(0),
    })
  );
  return res;
}
