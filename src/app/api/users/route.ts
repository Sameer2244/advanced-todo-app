import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
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
