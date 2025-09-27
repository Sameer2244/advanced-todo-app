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

export default function QuickTodoCard() {
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
        <div className="flex items-center gap-3">
          <Checkbox id="todo-1" />
          <Label htmlFor="todo-1">Complete task</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox id="todo-1" />
          <Label htmlFor="todo-1">Resolve all the bugs</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox id="todo-1" />
          <Label htmlFor="todo-1">Deploy to production</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox id="todo-1" />
          <Label htmlFor="todo-1">Break the production</Label>
        </div>
      </CardContent>
    </Card>
  );
}
