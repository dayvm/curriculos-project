import { z } from "zod";

export const curriculoIdParamSchema = z.object({
  id: z.uuid({ error: "ID de curriculo invalido." }),
});

export const createCurriculoSchema = z.object({
  nome: z.string().trim().min(2, "Nome obrigatorio.").max(120),
  titulo: z.string().trim().min(2, "Titulo obrigatorio.").max(160),
  resumo: z.string().trim().min(10, "Resumo obrigatorio."),
  email: z.string().trim().max(180).pipe(z.email({ error: "Email invalido." })),
  telefone: z.string().trim().min(1).max(30).optional(),
  fotoUrl: z.string().trim().pipe(z.url({ error: "fotoUrl invalida." })).optional(),
  status: z.enum(["ATIVO", "INATIVO"]).optional(),
});

export const updateCurriculoSchema = createCurriculoSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Informe ao menos um campo para atualizacao.",
  });

export type CurriculoIdParamDTO = z.infer<typeof curriculoIdParamSchema>;
export type CreateCurriculoDTO = z.infer<typeof createCurriculoSchema>;
export type UpdateCurriculoDTO = z.infer<typeof updateCurriculoSchema>;
