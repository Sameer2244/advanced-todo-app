"use client";

import { Project, Task } from "@/types/type";
import { fetchPostApi } from "@/utils/todoFetching";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import CustomDialog from "./CustomDialog";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import getProjects from "@/utils/todoFetchingClient";

export default function AddProjectTodo() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [projectId, setProjectId] = useState<string>("");
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [todoData, setTodoData] = useState<Partial<Task>>({
    title: "",
    priority: "low",
    status: "todo",
    category: "",
    dueDate: new Date(),
  });

  const handleGetProjectList = async () => {
    const list = await getProjects();
    setProjectList(list);
  };
  useEffect(() => {
    handleGetProjectList();
  }, []);

  const validateForm = () => {
    return !!todoData.title && !!todoData.category && !!projectId;
  };
  const handleSubmit = async () => {
    if (validateForm()) {
      const response = await fetchPostApi("/api/tasks", {
        ...todoData,
        userid: sessionStorage.getItem("userid"),
      });
      if ((response as { status: number }).status === 201) {
        setShow(false);
        setTodoData({
          title: "",
          priority: "low",
          status: "todo",
          category: "",
          dueDate: new Date(),
        });
      }
    }
  };
  return (
    <div>
      <Button
        variant={"secondary"}
        className="cursor-pointer w-full"
        onClick={() => setShow(true)}
      >
        + Add Todo to Project
      </Button>
      <CustomDialog
        show={show}
        setShow={setShow}
        title="Add Quick Todo"
        handleSubmit={handleSubmit}
        DialogBody={
          <div className="py-4 flex flex-col gap-4">
            <Select
              value={projectId}
              onValueChange={(value) => setProjectId(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {projectList?.map((p) => {
                    return (
                      <SelectItem
                        key={p._id.toString()}
                        value={p._id.toString()}
                      >
                        {p.title}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Todo title"
              value={todoData.title}
              onChange={(e) =>
                setTodoData({ ...todoData, title: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="Todo category"
              value={todoData.category}
              onChange={(e) =>
                setTodoData({ ...todoData, category: e.target.value })
              }
            />
            <Select
              value={todoData.priority}
              defaultValue="Low"
              onValueChange={(value) =>
                setTodoData({
                  ...todoData,
                  priority: value as "low" | "medium" | "high",
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              defaultValue="Pending"
              value={todoData.status}
              onValueChange={(value) =>
                setTodoData({
                  ...todoData,
                  status: value as "todo" | "in-progress" | "completed",
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="todo">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex flex-col gap-3 w-full">
              <Label htmlFor="date" className="px-1">
                Due Date
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-full justify-between font-normal"
                  >
                    {todoData.dueDate
                      ? todoData.dueDate.toLocaleDateString()
                      : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={todoData.dueDate ?? new Date()}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setTodoData({
                        ...todoData,
                        dueDate: date,
                      });
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        }
      />
    </div>
  );
}
