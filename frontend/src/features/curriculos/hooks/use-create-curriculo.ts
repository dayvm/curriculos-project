import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/constants/query-keys";
import { useCurriculoStore } from "@/store/curriculo.store";

import { curriculoService } from "../service/curriculo.service";
import type { CreateCurriculoInput } from "../types/curriculo.type";

export function useCreateCurriculo() {
  const queryClient = useQueryClient();
  const setSelectedCurriculoId = useCurriculoStore(
    (state) => state.setSelectedCurriculoId,
  );

  return useMutation({
    mutationFn: (data: CreateCurriculoInput) => curriculoService.create(data),
    onSuccess: (curriculo) => {
      setSelectedCurriculoId(curriculo.id);
      queryClient.invalidateQueries({ queryKey: queryKeys.curriculos });
    },
  });
}