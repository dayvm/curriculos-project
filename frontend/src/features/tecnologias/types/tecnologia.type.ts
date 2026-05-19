export type CategoriaTecnologia =
  | "LINGUAGEM"
  | "FRAMEWORK"
  | "BIBLIOTECA"
  | "BANCO_DE_DADOS"
  | "ORM"
  | "FERRAMENTA"
  | "PLATAFORMA"
  | "SERVICO"
  | "METODOLOGIA"
  | "OUTRA";

export type Tecnologia = {
  id: string;
  nome: string;
  descricao: string | null;
  categoria: CategoriaTecnologia;
  criadoEm: string;
  atualizadoEm: string;
};

export type CreateTecnologiaInput = {
  nome: string;
  descricao?: string | null;
  categoria?: CategoriaTecnologia;
};

export type UpdateTecnologiaInput = Partial<CreateTecnologiaInput>;