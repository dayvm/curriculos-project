import { z } from "zod";

const projectUrlSchema = z.string().trim().pipe(
  z.url({ error: "URL invalida." }),
);

const slugSchema = z
  .string()
  .trim()
  .min(3, "Slug obrigatorio.")
  .max(140)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug invalido.");

export const curriculoIdParamSchema = z.object({
  curriculoId: z.uuid({ error: "ID de curriculo invalido." }),
});

export const projetoIdParamSchema = z.object({
  id: z.uuid({ error: "ID de projeto invalido." }),
});

export const createProjetoSchema = z.object({
  slug: slugSchema,
  titulo: z.string().trim().min(2, "Titulo obrigatorio.").max(180),
  descricaoCurta: z
    .string()
    .trim()
    .min(5, "Descricao curta obrigatoria.")
    .max(280),
  descricaoLonga: z
    .string()
    .trim()
    .min(10, "Descricao longa obrigatoria."),
  imagemUrl: projectUrlSchema.optional(),
  githubUrl: projectUrlSchema.optional(),
  demoUrl: projectUrlSchema.optional(),
  tipo: z.enum(["PROFISSIONAL", "ACADEMICO", "INDIVIDUAL"]),
  instituicao: z.string().trim().min(2).max(180).optional(),
});

export const updateProjetoSchema = createProjetoSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Informe ao menos um campo para atualizacao.",
  });

export type CurriculoIdParamDTO = z.infer<typeof curriculoIdParamSchema>;
export type ProjetoIdParamDTO = z.infer<typeof projetoIdParamSchema>;
export type CreateProjetoDTO = z.infer<typeof createProjetoSchema>;
export type UpdateProjetoDTO = z.infer<typeof updateProjetoSchema>;