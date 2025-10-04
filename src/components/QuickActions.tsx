import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import AddQuickTodo from "./dialogs/AddQuickTodo";
import AddProject from "./dialogs/AddProject";

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <AddProject />
        <Button variant={"outline"} className="cursor-pointer">
          + Add New Project Task
        </Button>
        <AddQuickTodo />
      </CardContent>
    </Card>
  );
}
