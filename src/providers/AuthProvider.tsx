"use client";

import { User } from "@/types/type";
import { useState, createContext, useEffect, useContext } from "react";

const AuthContext = createContext<{ user: User | null } | null>(null);
export default function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<User | null>(null); // userid , email, name  |||||||||| accesstoken and refresh token in cookie
  // const getUserByRefreshToken
  const getUserByAccessToken = async () => {
    const response = await fetch("/api/verifyAccessToken", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
  };
  useEffect(() => {
    getUserByAccessToken();
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
