"use client";

import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Task } from "@/types/type";

export default function CheckboxClient({
  t,
  handleCompleteTask,
}: Readonly<{
  t: Task;
  handleCompleteTask: (taskId: string, status: string) => void;
}>) {
  return (
    <Checkbox
      id={t._id.toString()}
      checked={t.status === "completed"}
      onCheckedChange={() => {
        handleCompleteTask(
          t._id.toString(),
          t.status === "completed" ? "todo" : "completed"
        );
      }}
    />
  );
}
