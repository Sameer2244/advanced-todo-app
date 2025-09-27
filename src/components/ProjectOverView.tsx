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
const projectData = [
  {
    project: "Project A",
    status: "Pending",
    progress: "75",
  },
  {
    project: "Project B",
    status: "Completed",
    progress: "100",
  },
  {
    project: "Project C",
    status: "Pending",
    progress: "10",
  },
  {
    project: "Personal",
    status: "Pending",
    progress: "0",
  },
];
export default function ProjectOverView() {
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
          {projectData.map((p) => (
            <TableRow key={p.project}>
              <TableCell className="font-medium col-auto">
                {p.project}
              </TableCell>
              <TableCell>
                {p.status === "Pending" ? (
                  <Badge variant="outline">{p.status}</Badge>
                ) : (
                  <Badge variant="default">{p.status}</Badge>
                )}
              </TableCell>
              <TableCell>
                <Progress
                  value={parseInt(p.progress, 10)}
                  className="w-[60%]"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
