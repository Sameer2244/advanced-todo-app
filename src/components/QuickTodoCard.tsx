import { fetchGetApi } from "@/utils/todoFetching";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Task } from "@/types/type";

export default async function QuickTodoCard() {
  const todos = (await fetchGetApi("/api/tasks")) as {
    tasks: Task[];
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick To-dos</CardTitle>
        <CardAction>
          <Button variant={"outline"} className="cursor-pointer">
            large view
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {todos?.tasks?.map((t) => (
          <div key={t._id.toString()} className="flex items-center gap-3">
            <Checkbox id={t._id.toString()} />
            <Label htmlFor="todo-1">{t.title}</Label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
