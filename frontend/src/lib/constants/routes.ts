export const routes = {
  home: "/(tabs)/home",
  curriculos: "/curriculos",
  curriculoNovo: "/curriculos/novo",
  curriculoDetail: (id: string) => `/curriculos/${id}`,
  curriculoEditar: (id: string) => `/curriculos/${id}/editar`,
  curriculoAnotacao: (id: string) => `/curriculos/${id}/anotacao`,
};