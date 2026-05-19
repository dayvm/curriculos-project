import { apiClient } from "@/infrastructure/api/api-client";
import type { ApiResponse } from "@/infrastructure/api/api-response";

import type {
  CreateCurriculoInput,
  Curriculo,
  CurriculoCompleto,
  UpdateCurriculoInput,
} from "../types/curriculo.type";

export const curriculoService = {
  async findAll() {
    const response = await apiClient.get<ApiResponse<Curriculo[]>>("/curriculos");
    return response.data.data;
  },

  async findById(id: string) {
    const response = await apiClient.get<ApiResponse<Curriculo>>(`/curriculos/${id}`);
    return response.data.data;
  },

  async findCompleteById(id: string) {
    const response = await apiClient.get<ApiResponse<CurriculoCompleto>>(
      `/curriculos/${id}/completo`,
    );

    return response.data.data;
  },

  async create(data: CreateCurriculoInput) {
    const response = await apiClient.post<ApiResponse<Curriculo>>("/curriculos", data);
    return response.data.data;
  },

  async update(id: string, data: UpdateCurriculoInput) {
    const response = await apiClient.put<ApiResponse<Curriculo>>(
      `/curriculos/${id}`,
      data,
    );

    return response.data.data;
  },

  async remove(id: string) {
    await apiClient.delete<ApiResponse<null>>(`/curriculos/${id}`);
  },
};