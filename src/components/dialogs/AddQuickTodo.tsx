"use client";

import { useAuth } from "@/providers/AuthProvider";
import { Todo } from "@/types/type";
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

export default function AddQuickTodo() {
  const [show, setShow] = useState(false);
  const [todoData, setTodoData] = useState<Todo>({
    title: "",
    priority: "Low",
    status: "Pending",
    category: "",
  });
  const validateForm = () => {
    return !!todoData.title && !!todoData.category;
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
          priority: "Low",
          status: "Pending",
          category: "",
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
        + Add Quick Todo
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
                  priority: value as "Low" | "Medium" | "High",
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              defaultValue="Pending"
              value={todoData.status}
              onValueChange={(value) =>
                setTodoData({
                  ...todoData,
                  status: value as "Pending" | "Completed",
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        }
      />
    </div>
  );
}
