import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { auth } from "@/http/middlewares/auth";
import { prisma } from "@/lib/prisma";

export const createTask = (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      "/tasks",
      {
        schema: {
          tags: ["Tasks"],
          summary: "Create a new task",
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string().min(1),
          }),
          response: {
            201: z.object({
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
        const { name } = request.body;

        const task = await prisma.task.create({
          data: {
            name,
            userId,
          },
        });

        return reply.status(201).send({ task });
      }
    );
};
