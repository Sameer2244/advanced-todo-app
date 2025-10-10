import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import AddQuickTodo from "./dialogs/AddQuickTodo";
import AddProject from "./dialogs/AddProject";
import AddProjectTodo from "./dialogs/AddProjectTask";

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <AddProject />
        <AddProjectTodo />
        <AddQuickTodo />
      </CardContent>
    </Card>
  );
}
