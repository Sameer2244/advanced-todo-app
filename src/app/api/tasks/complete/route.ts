import { connectToDatabase } from "@/lib/mongodb";
import { validateIncomingToken } from "@/utils/authClient";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await validateIncomingToken(req);
    const { taskId, status } = await req.json();
    const { db } = await connectToDatabase();
    db.collection("tasks")
      .updateOne({ _id: new ObjectId(taskId) }, { $set: { status: status } })
      .then((result) => console.log(result));
    return NextResponse.json({
      message: "Task marked completed successfully",
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error occured", status: 500 });
  }
}
