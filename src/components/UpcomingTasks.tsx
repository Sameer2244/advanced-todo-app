import { NotebookIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export default function UpcomingTasks() {
  return (
    <div>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Upcoming Project Tasks
      </h3>
      <div className="flex flex-col gap-4 py-4">
        <Card>
          <CardContent className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <NotebookIcon />
              <div className="text-lg font-semibold">
                Team Meeting
                <p className="text-muted-foreground text-sm">Due Tomorrow</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <NotebookIcon />
              <div className="text-lg font-semibold">
                Client Presentation
                <p className="text-muted-foreground text-sm">Due Tomorrow</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <NotebookIcon />
              <div className="text-lg font-semibold">
                Submit Report
                <p className="text-muted-foreground text-sm">Due Tomorrow</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
