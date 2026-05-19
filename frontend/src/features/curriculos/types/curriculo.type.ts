export type StatusCurriculo = "ATIVO" | "INATIVO";

export type Tecnologia = {
  id: string;
  nome: string;
  descricao: string | null;
  categoria: string;
  criadoEm: string;
  atualizadoEm: string;
};

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

export type Projeto = {
  id: string;
  curriculoId: string;
  slug: string;
  titulo: string;
  descricaoCurta: string;
  descricaoLonga: string;
  imagemUrl: string | null;
  githubUrl: string | null;
  demoUrl: string | null;
  tipo: string;
  instituicao: string | null;
  tecnologias: Tecnologia[];
  criadoEm: string;
  atualizadoEm: string;
};

export type Curriculo = {
  id: string;
  nome: string;
  titulo: string;
  resumo: string;
  email: string;
  telefone: string | null;
  fotoUrl: string | null;
  status: StatusCurriculo;
  criadoEm: string;
  atualizadoEm: string;
};

export type CurriculoCompleto = Curriculo & {
  experienciasAcademicas: ExperienciaAcademica[];
  experienciasProfissionais: ExperienciaProfissional[];
  projetos: Projeto[];
  tecnologias: Tecnologia[];
};

export type CreateCurriculoInput = {
  nome: string;
  titulo: string;
  resumo: string;
  email: string;
  telefone?: string | null;
  fotoUrl?: string | null;
  status?: StatusCurriculo;
};

export type UpdateCurriculoInput = Partial<CreateCurriculoInput>;