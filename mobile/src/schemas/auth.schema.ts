import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({
      required_error: "Email é obrigatório",
    })
    .email("Email inválido")
    .min(1, "Email é obrigatório"),
  password: z
    .string({
      required_error: "Senha é obrigatória",
    })
    .min(1, "Senha é obrigatória"),
});

export const signUpSchema = z
  .object({
    name: z
      .string({
        required_error: "Nome é obrigatório",
      })
      .min(2, "Nome deve ter pelo menos 2 caracteres")
      .trim(),
    email: z
      .string({
        required_error: "Email é obrigatório",
      })
      .email("Email inválido")
      .min(1, "Email é obrigatório"),
    password: z
      .string({
        required_error: "Senha é obrigatória",
      })
      .min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z
      .string({
        required_error: "Confirmação de senha é obrigatória",
      })
      .min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
