// app/login/page.tsx
"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuthState from "@/hooks/useAuthState";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";

export default function LoginPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    errors,
    setErrors,
  } = useAuthState();
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [loading, user, router]);

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setErrors({ email: "", password: "" });
                    setEmail(e.target.value);
                  }}
                  placeholder="m@example.com"
                  required
                />
                <Label>{errors.email}</Label>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setErrors({ email: "", password: "" });
                    setPassword(e.target.value);
                  }}
                  type="password"
                  required
                />
                <Label>{errors.password}</Label>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full cursor-pointer"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Link href="/register" className="w-full inline-block">
            <Button variant="outline" className="w-full cursor-pointer">
              Go To Register
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
