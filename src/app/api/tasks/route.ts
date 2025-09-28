import { connectToDatabase } from "@/lib/mongodb";
import { validateIncomingToken } from "@/utils/authClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    validateIncomingToken(req);
    const { userid, projectid, title, priority, category, status } =
      await req.json();
    const { db } = await connectToDatabase();
    db.collection("tasks")
      .insertOne({
        userId: userid, // Replace with actual user ObjectId
        ...(projectid && { projectId: projectid }),
        title,
        priority,
        category,
        status,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .then((result) => console.log(result));
    return NextResponse.json({
      message: "Task created successfully",
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error occured", status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    validateIncomingToken(req);
    const { db } = await connectToDatabase();
    const tasks = await db.collection("tasks").find({}).toArray();
    return NextResponse.json({ tasks });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error occured", status: 500 });
  }
}
