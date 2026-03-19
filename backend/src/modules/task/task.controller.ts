// import { Response } from "express";
// import { AuthRequest } from "../../middleware/auth.middleware";
// import * as taskService from "./task.service";
// import { successResponse, errorResponse } from "../../utils/response";

// export const createTask = async (req: AuthRequest, res: Response) => {
//   try {
//     const { title, description } = req.body;
//     const userId = req.user!.userId;

//     const task = await taskService.createTask(userId, title, description);

//     return successResponse(res, task, "Task created");
//   } catch (error: any) {
//     return errorResponse(res, error.message);
//   }
// };

// export const getTasks = async (req: AuthRequest, res: Response) => {
//   try {
//     const userId = req.user!.userId;

//     const page = parseInt(req.query.page as string) || 1;
//     const limit = parseInt(req.query.limit as string) || 10;
//     const status = req.query.status as string;
//     const search = req.query.search as string;

//     const tasks = await taskService.getTasks(
//       userId,
//       page,
//       limit,
//       status,
//       search
//     );

//     return successResponse(res, tasks, "Tasks fetched");
//   } catch (error: any) {
//     return errorResponse(res, error.message);
//   }
// };

// export const getTask = async (req: AuthRequest, res: Response) => {
//   try {
//     const userId = req.user!.userId;
//     const taskId = req.params.id;

//     const task = await taskService.getTaskById(userId, taskId);

//     if (!task) return errorResponse(res, "Task not found", 404);

//     return successResponse(res, task);
//   } catch (error: any) {
//     return errorResponse(res, error.message);
//   }
// };

// export const updateTask = async (req: AuthRequest, res: Response) => {
//   try {
//     const userId = req.user!.userId;
//     const taskId = req.params.id;

//     await taskService.updateTask(userId, taskId, req.body);

//     return successResponse(res, null, "Task updated");
//   } catch (error: any) {
//     return errorResponse(res, error.message);
//   }
// };

// export const deleteTask = async (req: AuthRequest, res: Response) => {
//   try {
//     const userId = req.user!.userId;
//     const taskId = req.params.id;

//     await taskService.deleteTask(userId, taskId);

//     return successResponse(res, null, "Task deleted");
//   } catch (error: any) {
//     return errorResponse(res, error.message);
//   }
// };

// export const toggleTask = async (req: AuthRequest, res: Response) => {
//   try {
//     const userId = req.user!.userId;
//     const taskId = req.params.id;

//     const task = await taskService.toggleTask(userId, taskId);

//     if (!task) return errorResponse(res, "Task not found", 404);

//     return successResponse(res, task, "Task toggled");
//   } catch (error: any) {
//     return errorResponse(res, error.message);
//   }
// };

import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import * as taskService from "./task.service";
import { successResponse } from "../../utils/response";

export const createTask = async (req: AuthRequest, res: Response) => {
  const { title, description } = req.body;
  const userId = req.user!.userId;

  const task = await taskService.createTask(userId, title, description);

  return successResponse(res, task, "Task created");
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const status = req.query.status as string;
  const search = req.query.search as string;

  const tasks = await taskService.getTasks(
    userId,
    page,
    limit,
    status,
    search
  );

  return successResponse(res, tasks, "Tasks fetched");
};

export const getTask = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const taskId = req.params.id;

  const task = await taskService.getTaskById(userId, taskId);

  if (!task) {
    throw new Error("Task not found");
  }

  return successResponse(res, task);
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const taskId = req.params.id;

  await taskService.updateTask(userId, taskId, req.body);

  return successResponse(res, null, "Task updated");
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const taskId = req.params.id;

  await taskService.deleteTask(userId, taskId);

  return successResponse(res, null, "Task deleted");
};

export const toggleTask = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const taskId = req.params.id;

  const task = await taskService.toggleTask(userId, taskId);

  if (!task) {
    throw new Error("Task not found");
  }

  return successResponse(res, task, "Task toggled");
};