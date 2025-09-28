import { verifyAccessToken } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { validateIncomingToken } from "@/utils/authClient";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const token = validateIncomingToken(req);
  try {
    const data = (await verifyAccessToken(token as string)) as {
      userId: string;
    };
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
