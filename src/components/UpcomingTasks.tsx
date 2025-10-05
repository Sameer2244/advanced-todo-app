import { Project } from "@/types/type";
import { fetchGetApi } from "@/utils/todoFetching";
import { Card, CardContent } from "./ui/card";
import { NotebookIcon } from "lucide-react";

export default async function UpcomingTasks() {
  const upcomingProjects = (await fetchGetApi("/api/projects")) as {
    projects: Project[];
  };
  return (
    <div>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Upcoming Project Tasks
      </h3>
      <div className="flex flex-col gap-4 py-4">
        {upcomingProjects?.projects?.length > 0 ? (
          upcomingProjects?.projects
            ?.toSorted((p1, p2) =>
              new Date(p1.dueDate!) > new Date(p2.dueDate!) ? 1 : -1
            )
            .slice(0, 3)
            .map((p) => (
              <Card key={p._id.toString()}>
                <CardContent className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <NotebookIcon />
                    <div className="text-lg font-semibold">
                      {p.title}
                      <p className="text-muted-foreground text-sm">
                        Due on : {new Date(p.dueDate!).toDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
        ) : (
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            No projects available! please create your first projects from quick
            actions
          </p>
        )}
      </div>
    </div>
  );
}
