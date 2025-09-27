import { MessageCircleWarning } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function FocusOfDay() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Focus of the day
          </h4>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between">
        <div>
          <div className="text-lg font-semibold">Finish Project Proposal</div>
          <p className="text-muted-foreground text-sm">Due: 5th May, 2025</p>
          <Badge variant="destructive" className="mt-2">
            <MessageCircleWarning />
            High Priority
          </Badge>
        </div>
        <Button variant={"outline"} className="cursor-pointer">
          Mark as completed
        </Button>
      </CardContent>
    </Card>
  );
}
