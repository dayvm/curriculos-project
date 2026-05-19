import { apiClient } from "@/infrastructure/api/api-client";
import type { ApiResponse } from "@/infrastructure/api/api-response";

import type {
  CreateTecnologiaInput,
  Tecnologia,
  UpdateTecnologiaInput,
} from "../types/tecnologia.type";

export const tecnologiaService = {
  async findAll() {
    const response = await apiClient.get<ApiResponse<Tecnologia[]>>(
      "/tecnologias",
    );

    return response.data.data;
  },

  async findById(id: string) {
    const response = await apiClient.get<ApiResponse<Tecnologia>>(
      `/tecnologias/${id}`,
    );

    return response.data.data;
  },

  async create(data: CreateTecnologiaInput) {
    const response = await apiClient.post<ApiResponse<Tecnologia>>(
      "/tecnologias",
      data,
    );

    return response.data.data;
  },

  async update(id: string, data: UpdateTecnologiaInput) {
    const response = await apiClient.put<ApiResponse<Tecnologia>>(
      `/tecnologias/${id}`,
      data,
    );

    return response.data.data;
  },

  async remove(id: string) {
    await apiClient.delete<ApiResponse<null>>(`/tecnologias/${id}`);
  },
};