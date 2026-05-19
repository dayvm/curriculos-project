export type ExperienciaProfissional = {
  id: string;
  curriculoId: string;
  empresa: string;
  cargo: string;
  dataInicio: string;
  dataFim: string | null;
  criadoEm: string;
  atualizadoEm: string;
};

export type CreateExperienciaProfissionalInput = {
  empresa: string;
  cargo: string;
  dataInicio: string;
  dataFim?: string | null;
};

export type UpdateExperienciaProfissionalInput =
  Partial<CreateExperienciaProfissionalInput>;