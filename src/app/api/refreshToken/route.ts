import { NextResponse } from "next/server";
import { verifyRefreshToken, generateAccessToken } from "@/lib/auth";
import { parse } from "cookie";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
  const cookies = parse(req.headers.get("cookie") || "");
  const token = cookies.refreshToken;

  if (!token) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  try {
    const payload = verifyRefreshToken(token) as { userId: string };
    const accessToken = generateAccessToken(payload.userId);
    //also send user data
    const { db } = await connectToDatabase();
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(payload.userId) });
    return NextResponse.json({ user, accessToken });
  } catch {
    return NextResponse.json(
      { error: "Invalid refresh token" },
      { status: 403 }
    );
  }
}
