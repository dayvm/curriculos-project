import { z } from "zod";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

const optionalTrimmedString = (max: number, maxMessage: string) =>
  z.preprocess(
    (value) => {
      if (typeof value !== "string") {
        return value;
      }

      const trimmed = value.trim();
      return trimmed === "" ? undefined : trimmed;
    },
    z.string().max(max, { message: maxMessage }).optional(),
  );

const optionalUrlString = z.preprocess(
  (value) => {
    if (typeof value !== "string") {
      return value;
    }

    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
  },
  z
    .string()
    .refine((value) => isValidUrl(value), {
      message: "Foto URL invalida.",
    })
    .optional(),
);

export const curriculoSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(1, { message: "Nome e obrigatorio." })
    .max(120, { message: "Nome muito longo." }),
  titulo: z
    .string()
    .trim()
    .min(1, { message: "Titulo e obrigatorio." })
    .max(160, { message: "Titulo muito longo." }),
  resumo: z
    .string()
    .trim()
    .min(1, { message: "Resumo e obrigatorio." }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email e obrigatorio." })
    .max(180, { message: "Email muito longo." })
    .refine((value) => isValidEmail(value), {
      message: "Email invalido.",
    }),
  telefone: optionalTrimmedString(30, "Telefone muito longo."),
  fotoUrl: optionalUrlString,
  status: z.enum(["ATIVO", "INATIVO"]),
});

export type CurriculoFormValues = z.infer<typeof curriculoSchema>;