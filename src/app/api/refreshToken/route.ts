import { NextResponse } from "next/server";
import { verifyRefreshToken, generateAccessToken } from "@/lib/auth";
import { parse } from "cookie";

export async function POST(req: Request) {
  const cookies = parse(req.headers.get("cookie") || "");
  const token = cookies.refreshToken;

  if (!token) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  try {
    const payload = verifyRefreshToken(token) as { userId: string };
    const accessToken = generateAccessToken(payload.userId);
    return NextResponse.json({ accessToken });
  } catch {
    return NextResponse.json(
      { error: "Invalid refresh token" },
      { status: 403 }
    );
  }
}
