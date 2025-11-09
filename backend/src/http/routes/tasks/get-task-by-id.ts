import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { auth } from "@/http/middlewares/auth";
import { BadRequestError } from "@/http/routes/_errors/bad-request-error";
import { prisma } from "@/lib/prisma";

export const getTaskById = (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      "/tasks/:id",
      {
        schema: {
          tags: ["Tasks"],
          summary: "Get task by id",
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.uuid(),
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

        return reply.send({ task });
      }
    );
};
