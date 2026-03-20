"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/types";
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshToken,
} from "@/lib/auth";
import { setAccessToken } from "@/lib/apiClient";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<string>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // On mount: try silent refresh using httpOnly cookie
  useEffect(() => {
    const tryRefresh = async () => {
      try {
        const res = await refreshToken();
        if (res.success && res.data?.accessToken) {
          setAccessToken(res.data.accessToken);
          // We don't get user info from refresh—keep as authenticated but no user object
          // We'll set a placeholder; dashboard can fetch user if needed
          setUser({ id: "", email: "", createdAt: "", updatedAt: "" });
        }
      } catch {
        setAccessToken(null);
      } finally {
        setIsLoading(false);
      }
    };
    tryRefresh();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await loginUser(email, password);
    if (res.success && res.data) {
      setAccessToken(res.data.accessToken);
      setUser(res.data.user);
    } else {
      throw new Error(res.message || "Login failed");
    }
  }, []);

  const register = useCallback(
    async (email: string, password: string): Promise<string> => {
      const res = await registerUser(email, password);
      return res.message || "Registered successfully";
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } finally {
      setAccessToken(null);
      setUser(null);
      router.push("/login");
    }
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
