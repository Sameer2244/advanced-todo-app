import { Task } from "@/types/type";
import { fetchGetApi, fetchPostApi } from "@/utils/todoFetching";
import CheckboxClient from "./common/CheckboxClient";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";

export default async function QuickTodoCard() {
  const todos = (await fetchGetApi("/api/tasks")) as { tasks: Task[] };
  const handleCompleteTask = async (taskId: string, status: string) => {
    "use server";
    await fetchPostApi("/api/tasks/complete", { taskId, status });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick To-dos</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {todos?.tasks?.length > 0 ? (
          todos?.tasks
            ?.toSorted((t1, t2) => t2.status.localeCompare(t1.status))
            .map((t) => (
              <div key={t._id.toString()} className="flex items-center gap-3">
                <CheckboxClient t={t} handleCompleteTask={handleCompleteTask} />
                <Label
                  htmlFor="todo-1"
                  className={t.status === "completed" ? "line-through" : ""}
                >
                  {t.title}
                </Label>
              </div>
            ))
        ) : (
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            No todo available! please create your first todo from quick actions
          </p>
        )}
      </CardContent>
    </Card>
  );
}
