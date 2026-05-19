import { z } from "zod";

export const tecnologiaCategorias = [
  "LINGUAGEM",
  "FRAMEWORK",
  "BIBLIOTECA",
  "BANCO_DE_DADOS",
  "ORM",
  "FERRAMENTA",
  "PLATAFORMA",
  "SERVICO",
  "METODOLOGIA",
  "OUTRA",
] as const;

export const tecnologiaSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(1, { message: "Nome e obrigatorio." })
    .max(100, { message: "Nome muito longo." }),
  descricao: z.preprocess(
    (value) => {
      if (typeof value !== "string") {
        return value;
      }

      const trimmed = value.trim();
      return trimmed === "" ? undefined : trimmed;
    },
    z.string().max(1000, { message: "Descricao muito longa." }).optional(),
  ),
  categoria: z.enum(tecnologiaCategorias),
});

export type TecnologiaFormValues = z.infer<typeof tecnologiaSchema>;