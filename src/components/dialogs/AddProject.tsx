"use client";

import { Project, Todo } from "@/types/type";
import { fetchPostApi } from "@/utils/todoFetching";
import { useState } from "react";
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
import { Textarea } from "../ui/textarea";

export default function AddProject() {
  const [show, setShow] = useState(false);
  const [projectData, setProjectData] = useState<Partial<Project>>({
    title: "",
    description: "",
    status: "active",
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
