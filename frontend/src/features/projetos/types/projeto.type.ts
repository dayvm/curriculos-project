export type TipoProjeto = "PROFISSIONAL" | "ACADEMICO" | "INDIVIDUAL";

export type TecnologiaProjeto = {
  id: string;
  nome: string;
  descricao: string | null;
  categoria: string;
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
  tipo: TipoProjeto;
  instituicao: string | null;
  tecnologias?: TecnologiaProjeto[];
  criadoEm: string;
  atualizadoEm: string;
};

export type CreateProjetoInput = {
  slug: string;
  titulo: string;
  descricaoCurta: string;
  descricaoLonga: string;
  imagemUrl?: string | null;
  githubUrl?: string | null;
  demoUrl?: string | null;
  tipo: TipoProjeto;
  instituicao?: string | null;
};

export type UpdateProjetoInput = Partial<CreateProjetoInput>;