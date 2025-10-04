"use client";

import { Project } from "@/types/type";
import { fetchPostApi } from "@/utils/todoFetching";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import CustomDialog from "./CustomDialog";

export default function AddProject() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [projectData, setProjectData] = useState<Partial<Project>>({
    title: "",
    description: "",
    status: "active",
    dueDate: new Date(),
  });
  const validateForm = () => {
    return !!projectData.title && !!projectData.description;
  };
  const handleSubmit = async () => {
    if (validateForm()) {
      const response = await fetchPostApi("/api/projects", {
        ...projectData,
        userId: sessionStorage.getItem("userid"),
      });
      if ((response as { status: number }).status === 201) {
        setShow(false);
        setProjectData({
          title: "",
          status: "active",
          description: "",
        });
      }
    }
  };
  return (
    <div>
      <Button className="cursor-pointer w-full" onClick={() => setShow(true)}>
        + Add Project
      </Button>
      <CustomDialog
        show={show}
        setShow={setShow}
        title="Add Quick Todo"
        handleSubmit={handleSubmit}
        DialogBody={
          <div className="py-4 flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Todo title"
              value={projectData.title}
              onChange={(e) =>
                setProjectData({ ...projectData, title: e.target.value })
              }
            />
            <Select
              value={projectData.status}
              defaultValue="Low"
              onValueChange={(value) =>
                setProjectData({
                  ...projectData,
                  status: value as "active" | "archived",
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
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
                    {projectData.dueDate
                      ? projectData.dueDate.toLocaleDateString()
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
                    selected={projectData.dueDate ?? new Date()}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setProjectData({
                        ...projectData,
                        dueDate: date,
                      });
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Textarea
              placeholder="Project Description"
              value={projectData.description}
              onChange={(e) =>
                setProjectData({ ...projectData, description: e.target.value })
              }
            />
          </div>
        }
      />
    </div>
  );
}
