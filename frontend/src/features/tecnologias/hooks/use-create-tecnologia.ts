import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/constants/query-keys";

import { tecnologiaService } from "../service/tecnologia.service";
import type { CreateTecnologiaInput } from "../types/tecnologia.type";

export function useCreateTecnologia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTecnologiaInput) => tecnologiaService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tecnologias });
    },
  });
}