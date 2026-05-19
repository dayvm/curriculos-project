import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/constants/query-keys";

import { curriculoService } from "../service/curriculo.service";
import type { UpdateCurriculoInput } from "../types/curriculo.type";

type UpdateCurriculoPayload = {
  id: string;
  data: UpdateCurriculoInput;
};

export function useUpdateCurriculo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateCurriculoPayload) =>
      curriculoService.update(id, data),
    onSuccess: (curriculo) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.curriculos });
      queryClient.invalidateQueries({ queryKey: queryKeys.curriculo(curriculo.id) });
      queryClient.invalidateQueries({
        queryKey: queryKeys.curriculoCompleto(curriculo.id),
      });
    },
  });
}