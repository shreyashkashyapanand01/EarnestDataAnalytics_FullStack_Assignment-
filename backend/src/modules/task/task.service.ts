import prisma from "../../prisma/client";

export const createTask = async (
  userId: string,
  title: string,
  description?: string
) => {
  return prisma.task.create({
    data: {
      title,
      description,
      userId,
    },
  });
};

export const getTasks = async (
  userId: string,
  page: number,
  limit: number,
  status?: string,
  search?: string
) => {
  const skip = (page - 1) * limit;

  return prisma.task.findMany({
    where: {
      userId,
      ...(status && { status }),
      ...(search && {
        title: {
          contains: search,
          mode: "insensitive",
        },
      }),
    },
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getTaskById = async (userId: string, taskId: string) => {
  return prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });
};

export const updateTask = async (
  userId: string,
  taskId: string,
  data: any
) => {
  return prisma.task.updateMany({
    where: {
      id: taskId,
      userId,
    },
    data,
  });
};

export const deleteTask = async (userId: string, taskId: string) => {
  return prisma.task.deleteMany({
    where: {
      id: taskId,
      userId,
    },
  });
};

export const toggleTask = async (userId: string, taskId: string) => {
  const task = await prisma.task.findFirst({
    where: { id: taskId, userId },
  });

  if (!task) return null;

  return prisma.task.update({
    where: { id: taskId },
    data: {
      status: task.status === "pending" ? "completed" : "pending",
    },
  });
};