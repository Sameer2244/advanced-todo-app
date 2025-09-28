"use client";

import React from "react";
import { ModeToggle } from "./ToogleTheme";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "./ui/button";

export default function Header() {
  const { user, logout } = useAuth();
  console.log(user);
  return (
    <div className="flex justify-between w-[80vw] m-auto py-5 items-centero">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Task Master
      </h1>
      <div className="flex items-center gap-5">
        {user && <Button onClick={logout}>Logout</Button>}
        <ModeToggle />
      </div>
    </div>
  );
}
