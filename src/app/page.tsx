"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { fetchLogoutClient } from "@/utils/authClient";
import { Link as LinkIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
  const { user, loading } = useAuth();
  const { setTheme } = useTheme();
  const router = useRouter();
  useEffect(() => {
    setTheme("light");
  }, []);
  const logout = async () => {
    await fetchLogoutClient();
    window.location.href = "/login";
  };
  return (
    <div className="flex flex-col justify-center items-center w-full">
      {!loading ? (
        <>
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance p-2">
            Welcome {user?.email?.split("@")[0]}
          </h1>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Welcome to JWT authenticated home page
          </h4>
          <div className="flex items-center py-2 gap-2">
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Find the source code of this page here here
            </p>
            <Link
              href="https://github.com/Sameer2244/advanced-todo-app"
              target="_blank"
            >
              <LinkIcon size={20} />
            </Link>
          </div>
          <div>
            <Button className="cursor-pointer" onClick={logout}>
              Logout
            </Button>
          </div>
        </>
      ) : (
        <p className="leading-7 [&:not(:first-child)]:mt-6">Loading.....</p>
      )}
    </div>
  );
}
