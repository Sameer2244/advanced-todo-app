import { NextResponse } from "next/server";
import { generateAccessToken, generateRefreshToken } from "@/lib/auth";
import { serialize } from "cookie";
import { validateUser } from "@/lib/user";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = await validateUser(email, password);
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const accessToken = await generateAccessToken(user._id.toString());
  const refreshToken = await generateRefreshToken(user._id.toString());

  const res = NextResponse.json({ user: { _id: user._id, email: user.email } });
  res.headers.append(
    "Set-Cookie",
    serialize("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
  );
  res.headers.append(
    "Set-Cookie",
    serialize("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
  );
  return res;
}
