import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { auth } from "@/http/middlewares/auth";
import { prisma } from "@/lib/prisma";

export const getTasks = (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      "/tasks",
      {
        schema: {
          tags: ["Tasks"],
          summary: "Get all tasks",
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              tasks: z.array(
                z.object({
                  id: z.uuid(),
                  name: z.string(),
                  createdAt: z.date(),
                  updatedAt: z.date(),
                })
              ),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId();

        const tasks = await prisma.task.findMany({
          where: {
            userId,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return reply.send({ tasks });
      }
    );
};
