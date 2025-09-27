import { connectToDatabase } from "@/lib/mongodb";
import { parse } from "cookie";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const cookies = parse(req.headers.get("cookie") || "");
  const accessToken = cookies.accessToken;
  if (!accessToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { db } = await connectToDatabase();
    const users = await db.collection("users").find({}).toArray();

    return Response.json({ users }, { status: 200 });
  } catch (e) {
    console.error(e);
    return Response.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }
}
