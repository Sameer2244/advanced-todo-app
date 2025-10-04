import { ObjectId } from "mongodb";

// =====================
// 1. User
// =====================
export interface User {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  passwordHash: string;
  preferences?: {
    theme?: "light" | "dark";
    background?: string; // filename or URL
  };
  createdAt: Date;
  updatedAt: Date;
}

// =====================
// 2. Project
// =====================
export interface Project {
  _id: ObjectId;
  userId: ObjectId; // Reference to User
  title: string;
  description?: string;
  status: "active" | "archived";
  dueDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// =====================
// 3. Task
// =====================
export interface Task {
  _id: ObjectId;
  userId: ObjectId; // Owner
  projectId?: ObjectId | null; // Optional reference to Project
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  category?: string; // e.g., Work, Shopping
  dueDate?: Date | null;
  status: "todo" | "in-progress" | "completed";
  isFocusTask?: boolean; // highlight in "Today" view
  completedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// =====================
// 4. Daily Insights (Optional)
// =====================
export interface DailyInsight {
  _id: ObjectId;
  userId: ObjectId;
  date: Date; // normalized to midnight
  tasksCompleted: number;
  streakCount: number; // running streak
}
