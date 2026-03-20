import apiClient from "./apiClient";
import type {
  ApiResponse,
  Task,
  PaginatedTasksData,
  TaskQueryParams,
  CreateTaskPayload,
  UpdateTaskPayload,
} from "@/types";

export async function getTasks(params?: TaskQueryParams) {
  const res = await apiClient.get<ApiResponse<Task[]>>("/tasks", {
    params,
  });
  return res.data;
}

export async function getTask(id: string) {
  const res = await apiClient.get<ApiResponse<Task>>(`/tasks/${id}`);
  return res.data;
}

export async function createTask(data: CreateTaskPayload) {
  const res = await apiClient.post<ApiResponse<Task>>("/tasks", data);
  return res.data;
}

export async function updateTask(id: string, data: UpdateTaskPayload) {
  const res = await apiClient.patch<ApiResponse<null>>(`/tasks/${id}`, data);
  return res.data;
}

export async function deleteTask(id: string) {
  const res = await apiClient.delete<ApiResponse<null>>(`/tasks/${id}`);
  return res.data;
}

export async function toggleTask(id: string) {
  const res = await apiClient.patch<ApiResponse<Task>>(`/tasks/${id}/toggle`);
  return res.data;
}
