import { z } from "zod";

export const anotacaoLocalSchema = z.object({
  conteudo: z
    .string()
    .trim()
    .min(1, { message: "A anotacao nao pode ficar vazia." })
    .max(3000, { message: "A anotacao esta muito longa." }),
});

export type AnotacaoLocalFormValues = z.infer<typeof anotacaoLocalSchema>;