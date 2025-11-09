import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { auth } from "@/http/middlewares/auth";
import { BadRequestError } from "@/http/routes/_errors/bad-request-error";
import { prisma } from "@/lib/prisma";

export const updateTask = (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      "/tasks/:id",
      {
        schema: {
          tags: ["Tasks"],
          summary: "Update a task",
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.uuid(),
          }),
          body: z.object({
            name: z.string().min(1),
          }),
          response: {
            200: z.object({
              task: z.object({
                id: z.uuid(),
                name: z.string(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId();
        const { id } = request.params;
        const { name } = request.body;

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

        const updatedTask = await prisma.task.update({
          where: {
            id,
          },
          data: {
            name,
          },
        });

        return reply.send({ task: updatedTask });
      }
    );
};
