import { verifyAccessToken } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { validateIncomingToken } from "@/utils/authClient";
import { parse } from "cookie";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await validateIncomingToken(req);
    const { userId, title, description, status, dueDate } = await req.json();
    const { db } = await connectToDatabase();
    db.collection("projects")
      .insertOne({
        userId: userId,
        title,
        description,
        status,
        dueDate: dueDate,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .then((result) => console.log(result));
    return NextResponse.json({
      message: "Project created successfully",
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error occured", status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const cookies = parse(req.headers.get("cookie") || "");
    const token = cookies.accessToken;
    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userid = (await verifyAccessToken(token)) as {
      userId: string;
    };
    const { db } = await connectToDatabase();
    const projects = await db
      .collection("projects")
      .find({ userId: userid.userId })
      .toArray();
    return NextResponse.json({ projects });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error occured", status: 500 });
  }
}
