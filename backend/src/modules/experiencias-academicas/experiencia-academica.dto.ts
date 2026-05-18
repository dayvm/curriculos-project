import { z } from "zod";

const dateStringSchema = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Data invalida. Use YYYY-MM-DD.");

export const curriculoIdParamSchema = z.object({
  curriculoId: z.uuid({ error: "ID de curriculo invalido." }),
});

export const experienciaAcademicaIdParamSchema = z.object({
  id: z.uuid({ error: "ID de experiencia academica invalido." }),
});

export const createExperienciaAcademicaSchema = z.object({
  instituicao: z.string().trim().min(2, "Instituicao obrigatoria.").max(180),
  curso: z.string().trim().min(2, "Curso obrigatorio.").max(180),
  dataInicio: dateStringSchema,
  dataFim: dateStringSchema.nullable().optional(),
});

export const updateExperienciaAcademicaSchema = createExperienciaAcademicaSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Informe ao menos um campo para atualizacao.",
  });

export type CurriculoIdParamDTO = z.infer<typeof curriculoIdParamSchema>;
export type ExperienciaAcademicaIdParamDTO = z.infer<
  typeof experienciaAcademicaIdParamSchema
>;
export type CreateExperienciaAcademicaDTO = z.infer<
  typeof createExperienciaAcademicaSchema
>;
export type UpdateExperienciaAcademicaDTO = z.infer<
  typeof updateExperienciaAcademicaSchema
>;