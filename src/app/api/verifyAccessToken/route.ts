import { verifyAccessToken } from "@/lib/auth";
import { parse } from "cookie";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookies = parse(req.headers.get("cookie") || "");
  const token = cookies.accessToken;

  if (!token) {
    return NextResponse.json({ error: "No Access token" }, { status: 401 });
  }

  try {
    const data = (await verifyAccessToken(token)) as { userId: string };
    if (!data) {
      return NextResponse.json(
        { error: "Invalid access token" },
        { status: 403 }
      );
    }
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json(
      { error: "Invalid access token" },
      { status: 403 }
    );
  }
}
