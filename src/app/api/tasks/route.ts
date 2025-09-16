import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userid, projectid, title, priority, category, status } =
      await req.json();
    const { db } = await connectToDatabase();
    db.collection("tasks")
      .insertOne({
        userId: new ObjectId(userid), // Replace with actual user ObjectId
        projectid: new ObjectId(projectid),
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
