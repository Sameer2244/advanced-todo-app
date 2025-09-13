import { User } from "@/types/type";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "./mongodb";

const users: Partial<User>[] = [];
export async function getUsers() {
  const { db } = await connectToDatabase();
  return await db.collection("users").find({}).toArray();
}

export async function findUserByEmail(email: string) {
  const { db } = await connectToDatabase();
  return db.collection("users").findOne({ email });
}
export async function registerUser(email: string, password: string) {
  const hashed = await bcrypt.hash(password, 10);
  const user = { id: Date.now().toString(), email, password: hashed };
  users.push(user);
  // add in mongodb
  const { db } = await connectToDatabase();
  db.collection("users").insertOne(user);
  return user;
}

export async function validateUser(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) return null;
  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;
}
