import { fetchGetApi } from "@/utils/todoFetching";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Project, Task } from "@/types/type";
export default async function ProjectOverView() {
  const projects = (await fetchGetApi("/api/projects")) as {
    projects: Project[];
  };

  const getProgressForProject = async (projectId: string) => {
    try {
      const allRes = (await fetchGetApi(
        `/api/tasks?projectId=${projectId}`
      )) as { tasks: Task[] };

      const total = allRes.tasks.length;
      const completed = allRes.tasks.filter(
        (t) => t.status === "completed"
      ).length;

      const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
      return { total, completed, percent };
    } catch (err) {
      console.error(err);
      return { total: 0, completed: 0, percent: 0 };
    }
  };

  const progressPromises = projects.projects.map((p) =>
    getProgressForProject(p._id.toString())
  );
  const progresses = await Promise.all(progressPromises);

  return (
    <div>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Project Overview
      </h3>
      <Table className="my-5 bg-accent rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Progress</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.projects.map((p, idx) => {
            const prog = progresses[idx] || {
              total: 0,
              completed: 0,
              percent: 0,
            };
            return (
              <TableRow key={p._id.toString()}>
                <TableCell className="font-medium col-auto">
                  {p.title}
                </TableCell>
                <TableCell>
                  {p.status === "active" ? (
                    <Badge variant="outline">{p.status}</Badge>
                  ) : (
                    <Badge variant="default">{p.status}</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Progress value={prog.percent} className="w-[60%]" />
                    <span className="text-sm">{`${prog.completed}/${prog.total}`}</span>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
