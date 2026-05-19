export type ExperienciaAcademica = {
  id: string;
  curriculoId: string;
  instituicao: string;
  curso: string;
  dataInicio: string;
  dataFim: string | null;
  criadoEm: string;
  atualizadoEm: string;
};

export type CreateExperienciaAcademicaInput = {
  instituicao: string;
  curso: string;
  dataInicio: string;
  dataFim?: string | null;
};

export type UpdateExperienciaAcademicaInput =
  Partial<CreateExperienciaAcademicaInput>;