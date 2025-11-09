import { z } from "zod";

export const createTaskSchema = z.object({
  name: z
    .string()
    .min(1, "O nome da tarefa deve ter pelo menos 1 caractere")
    .max(100, "O nome da tarefa deve ter no máximo 100 caracteres"),
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
