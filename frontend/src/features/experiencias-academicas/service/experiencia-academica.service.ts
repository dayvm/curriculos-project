import { apiClient } from "@/infrastructure/api/api-client";
import type { ApiResponse } from "@/infrastructure/api/api-response";

import type {
  CreateExperienciaAcademicaInput,
  ExperienciaAcademica,
  UpdateExperienciaAcademicaInput,
} from "../types/experiencia-academica.type";

export const experienciaAcademicaService = {
  async findByCurriculo(curriculoId: string) {
    const response = await apiClient.get<ApiResponse<ExperienciaAcademica[]>>(
      `/curriculos/${curriculoId}/experiencias-academicas`,
    );

    return response.data.data;
  },

  async findById(id: string) {
    const response = await apiClient.get<ApiResponse<ExperienciaAcademica>>(
      `/experiencias-academicas/${id}`,
    );

    return response.data.data;
  },

  async create(curriculoId: string, data: CreateExperienciaAcademicaInput) {
    const response = await apiClient.post<ApiResponse<ExperienciaAcademica>>(
      `/curriculos/${curriculoId}/experiencias-academicas`,
      data,
    );

    return response.data.data;
  },

  async update(id: string, data: UpdateExperienciaAcademicaInput) {
    const response = await apiClient.put<ApiResponse<ExperienciaAcademica>>(
      `/experiencias-academicas/${id}`,
      data,
    );

    return response.data.data;
  },

  async remove(id: string) {
    await apiClient.delete<ApiResponse<null>>(`/experiencias-academicas/${id}`);
  },
};