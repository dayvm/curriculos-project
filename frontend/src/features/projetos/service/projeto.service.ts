import { apiClient } from "@/infrastructure/api/api-client";
import type { ApiResponse } from "@/infrastructure/api/api-response";

import type {
  CreateProjetoInput,
  Projeto,
  UpdateProjetoInput,
} from "../types/projeto.type";

export const projetoService = {
  async findByCurriculo(curriculoId: string) {
    const response = await apiClient.get<ApiResponse<Projeto[]>>(
      `/curriculos/${curriculoId}/projetos`,
    );

    return response.data.data;
  },

  async findById(id: string) {
    const response = await apiClient.get<ApiResponse<Projeto>>(`/projetos/${id}`);
    return response.data.data;
  },

  async create(curriculoId: string, data: CreateProjetoInput) {
    const response = await apiClient.post<ApiResponse<Projeto>>(
      `/curriculos/${curriculoId}/projetos`,
      data,
    );

    return response.data.data;
  },

  async update(id: string, data: UpdateProjetoInput) {
    const response = await apiClient.put<ApiResponse<Projeto>>(
      `/projetos/${id}`,
      data,
    );

    return response.data.data;
  },

  async remove(id: string) {
    await apiClient.delete<ApiResponse<null>>(`/projetos/${id}`);
  },
};