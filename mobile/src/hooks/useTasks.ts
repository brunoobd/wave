import { useState, useEffect, useCallback } from "react";
import { getTasks, createTask, deleteTask } from "../services/task.service";
import type { Task } from "../types/task.types";
import type { ApiError } from "../services/api";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const loadedTasks = await getTasks();
      setTasks(loadedTasks);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Erro ao carregar tarefas");
      console.error("Error loading tasks:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreateTask = useCallback(async (name: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const newTask = await createTask({ name });
      setTasks((prev) => [...prev, newTask]);
      return newTask;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Erro ao criar tarefa");
      console.error("Error creating task:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDeleteTask = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Erro ao deletar tarefa");
      console.error("Error deleting task:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return {
    tasks,
    isLoading,
    error,
    loadTasks,
    createTask: handleCreateTask,
    deleteTask: handleDeleteTask,
  };
}
