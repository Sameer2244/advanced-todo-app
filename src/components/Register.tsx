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
import Link from "next/link";

export default function RegisterPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleRegister,
    errors,
    setErrors,
  } = useAuthState();

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Register to your account</CardTitle>
          <CardDescription>
            Enter your email below to register to your account
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
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => {
                    setErrors({ email: "", password: "" });
                    setEmail(e.target.value);
                  }}
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
                  type="password"
                  onChange={(e) => {
                    setErrors({ email: "", password: "" });
                    setPassword(e.target.value);
                  }}
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
            onClick={handleRegister}
          >
            Register
          </Button>
          <Link href="/login" className="block w-full">
            <Button variant="outline" className="w-full cursor-pointer">
              Go To Login
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
