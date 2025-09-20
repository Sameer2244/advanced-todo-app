import { verifyAccessToken } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { parse } from "cookie";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookies = parse(req.headers.get("cookie") || "");
  const token = cookies.accessToken;

  if (!token) {
    return NextResponse.json({ error: "No Access token" }, { status: 401 });
  }

  try {
    const data = verifyAccessToken(token) as { userId: string };
    const { db } = await connectToDatabase();
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(data.userId) });
    return NextResponse.json({ user: { _id: user?._id, email: user?.email } });
  } catch {
    return NextResponse.json(
      { error: "Invalid access token" },
      { status: 403 }
    );
  }
}
