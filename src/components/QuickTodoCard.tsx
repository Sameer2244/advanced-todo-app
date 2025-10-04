import { Task } from "@/types/type";
import { getServerCookies } from "@/utils/todoFetching";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export default async function QuickTodoCard() {
  const cookieHeader = await getServerCookies();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/tasks`,
    {
      method: "GET",
      credentials: "include",
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
      cache: "no-store",
    }
  );

  const todos = (await res.json()) as { tasks: Task[] };
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
