import { z } from "zod";

export const tecnologiaIdParamSchema = z.object({
  id: z.uuid({ error: "ID de tecnologia invalido." }),
});

export const createTecnologiaSchema = z.object({
  nome: z.string().trim().min(2, "Nome obrigatorio.").max(100),
  descricao: z.string().trim().min(2).optional(),
  categoria: z.enum([
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
  ]).optional(),
});

export const updateTecnologiaSchema = createTecnologiaSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Informe ao menos um campo para atualizacao.",
  });

export type TecnologiaIdParamDTO = z.infer<typeof tecnologiaIdParamSchema>;
export type CreateTecnologiaDTO = z.infer<typeof createTecnologiaSchema>;
export type UpdateTecnologiaDTO = z.infer<typeof updateTecnologiaSchema>;