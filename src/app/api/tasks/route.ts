import { verifyAccessToken } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { Task, TaskQuery } from "@/types/type";
import { validateIncomingToken } from "@/utils/authClient";
import { parse } from "cookie";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await validateIncomingToken(req);
    const { userid, projectid, title, priority, category, status, dueDate } =
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
        dueDate: dueDate,
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
    const projectId = req.nextUrl.searchParams.get("projectId");
    const hasProject = req.nextUrl.searchParams.get("hasProject");
    const hasCompleted = req.nextUrl.searchParams.get("hasCompleted");
    const cookies = parse(req.headers.get("cookie") || "");
    const token = cookies.accessToken;

    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userid = (await verifyAccessToken(token)) as { userId: string };
    const { db } = await connectToDatabase();

    // Build the query object
    const query: TaskQuery = { userId: userid.userId };

    if (hasProject === "true") {
      if (projectId) {
        query.projectId = projectId;
      } else {
        query.projectId = { $ne: null };
      }
    } else if (hasProject === "false") {
      query.projectId = null;
    } else if (projectId) {
      query.projectId = projectId;
    } else {
      query.projectId = null;
    }

    if (hasCompleted === "true") {
      query.completed = true;
    } else if (hasCompleted === "false") {
      query.completed = false;
    }

    const tasks: Task[] = (await db
      .collection("tasks")
      .find(query)
      .map((t) => ({ ...t, _id: t._id.toString() }))
      .toArray()) as unknown as Task[];

    return NextResponse.json({ tasks });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error occurred", status: 500 });
  }
}
