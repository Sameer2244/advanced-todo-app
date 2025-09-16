import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userid, title, description, status } = await req.json();
    const { db } = await connectToDatabase();
    db.collection("projects").insertOne({
      userId: new ObjectId(userid), // Replace with actual user ObjectId
      title,
      description,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return NextResponse.json({
      message: "Project created successfully",
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error occured", status: 500 });
  }
}
