import apiClient from "./apiClient";
import type { ApiResponse, LoginResponse, User } from "@/types";

export async function registerUser(email: string, password: string) {
  const res = await apiClient.post<ApiResponse<User>>("/auth/register", {
    email,
    password,
  });
  return res.data;
}

export async function loginUser(email: string, password: string) {
  const res = await apiClient.post<ApiResponse<LoginResponse>>("/auth/login", {
    email,
    password,
  });
  return res.data;
}

export async function refreshToken() {
  const res = await apiClient.post<ApiResponse<{ accessToken: string }>>(
    "/auth/refresh"
  );
  return res.data;
}

export async function logoutUser() {
  const res = await apiClient.post<ApiResponse<null>>("/auth/logout");
  return res.data;
}
