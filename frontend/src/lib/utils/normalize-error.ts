import { AxiosError } from "axios";

import type { ApiErrorResponse } from "@/infrastructure/api/api-error";

export function normalizeError(error: unknown) {
  if (error instanceof AxiosError) {
    const responseMessage = (error.response?.data as ApiErrorResponse | undefined)
      ?.message;

    if (responseMessage) {
      return responseMessage;
    }

    if (error.code === "ERR_NETWORK") {
      return "Nao foi possivel conectar ao servidor.";
    }
  }

  return "Algo deu errado. Tente novamente.";
}