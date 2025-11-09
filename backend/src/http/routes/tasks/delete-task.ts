import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { auth } from "@/http/middlewares/auth";
import { BadRequestError } from "@/http/routes/_errors/bad-request-error";
import { prisma } from "@/lib/prisma";

export const deleteTask = (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      "/tasks/:id",
      {
        schema: {
          tags: ["Tasks"],
          summary: "Delete a task",
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.uuid(),
          }),
          response: {
            200: z.object({
              message: z.string(),
              displayMessage: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId();
        const { id } = request.params;

        const task = await prisma.task.findFirst({
          where: {
            id,
            userId,
          },
        });

        if (!task) {
          throw new BadRequestError(
            "Task not found.",
            "Tarefa não encontrada."
          );
        }

        await prisma.task.delete({
          where: {
            id,
          },
        });

        return reply.send({
          message: "Task deleted successfully.",
          displayMessage: "Tarefa deletada com sucesso.",
        });
      }
    );
};
