import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";

export default function ProductivityInsights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Productivity Insights</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <p className="leading-7">Total 12 Todos Completed</p>
            <CheckCircle />
          </div>
          <p className="text-muted-foreground text-sm">2/5</p>
        </div>
        <Progress value={34} />
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <p className="leading-7">Total 2 Projects Completed</p>
            <CheckCircle />
          </div>
          <p className="text-muted-foreground text-sm">1/2</p>
        </div>
        <Progress value={50} />
      </CardContent>
    </Card>
  );
}
