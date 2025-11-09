import { api, ApiError } from "./api";
import type { Task, CreateTaskRequest } from "../types/task.types";

interface GetTasksResponse {
  tasks: Task[];
}

interface CreateTaskResponse {
  task: Task;
}

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await api.get<GetTasksResponse | Task[]>("/tasks");
    // Suporta tanto array direto quanto objeto com propriedade tasks
    if (Array.isArray(response)) {
      return response;
    }
    return response.tasks || [];
  } catch (error) {
    if (error && typeof error === "object" && "message" in error) {
      throw error as ApiError;
    }
    throw { message: "Failed to get tasks", status: 500 } as ApiError;
  }
};

export const createTask = async (
  data: CreateTaskRequest
): Promise<Task> => {
  try {
    const response = await api.post<CreateTaskResponse | Task>("/tasks", data);
    // Suporta tanto objeto direto quanto objeto com propriedade task
    if ("task" in response) {
      return response.task;
    }
    return response as Task;
  } catch (error) {
    if (error && typeof error === "object" && "message" in error) {
      throw error as ApiError;
    }
    throw { message: "Failed to create task", status: 500 } as ApiError;
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  try {
    await api.delete(`/tasks/${id}`);
  } catch (error) {
    if (error && typeof error === "object" && "message" in error) {
      throw error as ApiError;
    }
    throw { message: "Failed to delete task", status: 500 } as ApiError;
  }
};

