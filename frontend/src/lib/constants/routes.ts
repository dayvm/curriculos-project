export const routes = {
  home: "/(tabs)/home",
  curriculos: "/curriculos",
  curriculoNovo: "/curriculos/novo",
  curriculoDetail: (id: string) => `/curriculos/${id}`,
  curriculoEditar: (id: string) => `/curriculos/${id}/editar`,
  curriculoAnotacao: (id: string) => `/curriculos/${id}/anotacao`,
  curriculoProjetoDetail: (curriculoId: string, projetoId: string) =>
    `/curriculos/${curriculoId}/projetos/${projetoId}`,
  tecnologias: "/tecnologias",
  tecnologiaNova: "/tecnologias/nova",
  tecnologiaEditar: (id: string) => `/tecnologias/${id}/editar`,
};