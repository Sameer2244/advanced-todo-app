import { NextResponse } from "next/server";
import { registerUser, findUserByEmail } from "@/lib/user";
import { generateAccessToken, generateRefreshToken } from "@/lib/auth";
import { serialize } from "cookie";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password required" },
      { status: 400 }
    );
  }

  const existing = await findUserByEmail(email);
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const user = await registerUser(email, password);
  const accessToken = await generateAccessToken(user.id!);
  const refreshToken = await generateRefreshToken(user.id!);
  const res = NextResponse.json({
    message: "User registered",
    user: { _id: user.id, email: user.email },
  });
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
  //return user data to save it in auth context or get it using get api in user route
  return res;
}
