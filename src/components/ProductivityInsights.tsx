import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { fetchGetApi } from "@/utils/todoFetching";
import { Task } from "@/types/type";

export default async function ProductivityInsights() {
  const quickTodo = (await fetchGetApi("/api/tasks?hasProject=false")) as {
    tasks: Task[];
  };
  const quickProjectTodo = (await fetchGetApi(
    "/api/tasks?hasProject=true"
  )) as {
    tasks: Task[];
  };
  const completedTodos = quickTodo.tasks.filter(
    (t) => t.status === "completed"
  );
  const completedProjectTodos = quickProjectTodo.tasks.filter(
    (t) => t.status === "completed"
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Productivity Insights</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <p className="leading-7">
              Total {completedTodos.length} Todos Completed
            </p>
            <CheckCircle />
          </div>
          <p className="text-muted-foreground text-sm">
            {completedTodos.length}/{quickTodo.tasks.length}
          </p>
        </div>
        <Progress
          value={(completedTodos.length / quickTodo.tasks.length) * 100}
        />
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <p className="leading-7">
              Total {completedProjectTodos.length} Projects Completed
            </p>
            <CheckCircle />
          </div>
          <p className="text-muted-foreground text-sm">
            {completedProjectTodos.length}/{quickProjectTodo.tasks.length}
          </p>
        </div>
        <Progress
          value={
            (completedProjectTodos.length / quickProjectTodo.tasks.length) * 100
          }
        />
      </CardContent>
    </Card>
  );
}
