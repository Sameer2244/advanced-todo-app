import { Task } from "@/types/type";
import { fetchGetApi } from "@/utils/todoFetching";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export default async function QuickTodoCard() {
  const todos = (await fetchGetApi("/api/tasks")) as { tasks: Task[] };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick To-dos</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {todos?.tasks?.length > 0 ? (
          todos?.tasks?.map((t) => (
            <div key={t._id.toString()} className="flex items-center gap-3">
              <Checkbox id={t._id.toString()} />
              <Label htmlFor="todo-1">{t.title}</Label>
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
