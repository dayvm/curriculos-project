import { z } from "zod";

const dateStringSchema = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Data invalida. Use YYYY-MM-DD.");

export const curriculoIdParamSchema = z.object({
  curriculoId: z.uuid({ error: "ID de curriculo invalido." }),
});

export const experienciaProfissionalIdParamSchema = z.object({
  id: z.uuid({ error: "ID de experiencia profissional invalido." }),
});

export const createExperienciaProfissionalSchema = z.object({
  empresa: z.string().trim().min(2, "Empresa obrigatoria.").max(180),
  cargo: z.string().trim().min(2, "Cargo obrigatorio.").max(180),
  dataInicio: dateStringSchema,
  dataFim: dateStringSchema.nullable().optional(),
});

export const updateExperienciaProfissionalSchema =
  createExperienciaProfissionalSchema.partial().refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "Informe ao menos um campo para atualizacao.",
    },
  );

export type CurriculoIdParamDTO = z.infer<typeof curriculoIdParamSchema>;
export type ExperienciaProfissionalIdParamDTO = z.infer<
  typeof experienciaProfissionalIdParamSchema
>;
export type CreateExperienciaProfissionalDTO = z.infer<
  typeof createExperienciaProfissionalSchema
>;
export type UpdateExperienciaProfissionalDTO = z.infer<
  typeof updateExperienciaProfissionalSchema
>;