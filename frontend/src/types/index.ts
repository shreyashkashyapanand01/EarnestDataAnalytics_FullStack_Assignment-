export interface User {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = "pending" | "completed";

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface PaginatedTasksData {
  tasks: Task[];
  totalTasks: number;
  totalPages: number;
  currentPage: number;
}

export interface TaskQueryParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}
