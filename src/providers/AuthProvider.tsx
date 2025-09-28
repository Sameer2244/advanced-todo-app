"use client";

import { User } from "@/types/type";
import {
  fetchGetCurrentUserClient,
  fetchLogoutClient,
} from "@/utils/authClient";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type AuthContextShape = {
  user: User | null;
  loading: boolean;
  getCurrentUser: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextShape | null>(null);

export default function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getCurrentUser = async () => {
    try {
      const data = await fetchGetCurrentUserClient();
      if (!data.user) {
        router.replace("/login");
      }
      sessionStorage.setItem("userid", data?.user?._id);
      setUser(data.user ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await fetchLogoutClient();
    sessionStorage.removeItem("userid");
    window.location.href = "/login";
  };
  useEffect(() => {
    if (location.pathname !== "/login" && !sessionStorage.getItem("userid"))
      getCurrentUser();
  }, []);

  const value = useMemo(
    () => ({ user, loading, getCurrentUser, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
