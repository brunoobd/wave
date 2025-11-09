import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { env } from "@/env";
import {
  authenticateWithPassword,
  createAccount,
  getProfile,
} from "@/routes/auth";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "@/routes/tasks";

import { errorHandler } from "./error-handler";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: env.FRONTEND_URL,
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);
app.setErrorHandler(errorHandler);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Wave",
      description: "API do projeto Wave",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

// Auth
app.register(createAccount);
app.register(authenticateWithPassword);
app.register(getProfile);

// Tasks
app.register(createTask);
app.register(getTasks);
app.register(getTaskById);
app.register(updateTask);
app.register(deleteTask);

app.listen({
  port: env.PORT,
  host: "0.0.0.0",
});
