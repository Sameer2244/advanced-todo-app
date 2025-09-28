import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import AddQuickTodo from "./dialogs/AddQuickTodo";

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Button className="cursor-pointer">+ Add New Project</Button>
        <Button variant={"outline"} className="cursor-pointer">
          + Add New Project Task
        </Button>
        <AddQuickTodo />
      </CardContent>
    </Card>
  );
}
