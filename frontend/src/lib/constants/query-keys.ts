export const queryKeys = {
  curriculos: ["curriculos"] as const,
  curriculo: (id: string) => ["curriculos", id] as const,
  curriculoCompleto: (id: string) => ["curriculos", id, "completo"] as const,
  experienciasAcademicas: (curriculoId: string) =>
    ["curriculos", curriculoId, "experiencias-academicas"] as const,
  experienciasProfissionais: (curriculoId: string) =>
    ["curriculos", curriculoId, "experiencias-profissionais"] as const,
  projetos: (curriculoId: string) =>
    ["curriculos", curriculoId, "projetos"] as const,
  projeto: (id: string) => ["projetos", id] as const,
  tecnologias: ["tecnologias"] as const,
};