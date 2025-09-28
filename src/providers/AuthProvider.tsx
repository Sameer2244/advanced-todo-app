"use client";

import {
  fetchGetCurrentUserClient,
  fetchLogoutClient,
} from "@/utils/clientAuth";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
type User = {
  _id: string;
  email: string;
};
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
  const pathname = usePathname();
  const getCurrentUser = async () => {
    try {
      const data = await fetchGetCurrentUserClient();
      if (!data.user) {
        router.replace("/login");
      } else {
        sessionStorage.setItem("userid", data?.user?._id);
        sessionStorage.setItem("email", data?.user?.email);
      }
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
    sessionStorage.removeItem("email");
    window.location.href = "/login";
  };
  useEffect(() => {
    if (pathname !== "/login" && pathname !== "/register") {
      getCurrentUser();
    }
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
