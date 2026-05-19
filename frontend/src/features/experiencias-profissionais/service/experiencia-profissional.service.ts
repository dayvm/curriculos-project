import { apiClient } from "@/infrastructure/api/api-client";
import type { ApiResponse } from "@/infrastructure/api/api-response";

import type {
  CreateExperienciaProfissionalInput,
  ExperienciaProfissional,
  UpdateExperienciaProfissionalInput,
} from "../types/experiencia-profissional.type";

export const experienciaProfissionalService = {
  async findByCurriculo(curriculoId: string) {
    const response = await apiClient.get<ApiResponse<ExperienciaProfissional[]>>(
      `/curriculos/${curriculoId}/experiencias-profissionais`,
    );

    return response.data.data;
  },

  async findById(id: string) {
    const response = await apiClient.get<ApiResponse<ExperienciaProfissional>>(
      `/experiencias-profissionais/${id}`,
    );

    return response.data.data;
  },

  async create(curriculoId: string, data: CreateExperienciaProfissionalInput) {
    const response = await apiClient.post<ApiResponse<ExperienciaProfissional>>(
      `/curriculos/${curriculoId}/experiencias-profissionais`,
      data,
    );

    return response.data.data;
  },

  async update(id: string, data: UpdateExperienciaProfissionalInput) {
    const response = await apiClient.put<ApiResponse<ExperienciaProfissional>>(
      `/experiencias-profissionais/${id}`,
      data,
    );

    return response.data.data;
  },

  async remove(id: string) {
    await apiClient.delete<ApiResponse<null>>(
      `/experiencias-profissionais/${id}`,
    );
  },
};