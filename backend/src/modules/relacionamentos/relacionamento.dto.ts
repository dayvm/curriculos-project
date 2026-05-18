import { z } from "zod";

export const curriculoTecnologiaParamSchema = z.object({
  curriculoId: z.uuid({ error: "ID de curriculo invalido." }),
  tecnologiaId: z.uuid({ error: "ID de tecnologia invalido." }),
});

export const projetoTecnologiaParamSchema = z.object({
  projetoId: z.uuid({ error: "ID de projeto invalido." }),
  tecnologiaId: z.uuid({ error: "ID de tecnologia invalido." }),
});

export type CurriculoTecnologiaParamDTO = z.infer<
  typeof curriculoTecnologiaParamSchema
>;
export type ProjetoTecnologiaParamDTO = z.infer<
  typeof projetoTecnologiaParamSchema
>;