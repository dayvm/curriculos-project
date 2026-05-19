import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/constants/query-keys";

import { tecnologiaService } from "../service/tecnologia.service";
import type { UpdateTecnologiaInput } from "../types/tecnologia.type";

type UpdateTecnologiaPayload = {
  id: string;
  data: UpdateTecnologiaInput;
};

export function useUpdateTecnologia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateTecnologiaPayload) =>
      tecnologiaService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tecnologias });
    },
  });
}