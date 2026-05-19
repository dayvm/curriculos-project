import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/constants/query-keys";
import { useCurriculoStore } from "@/store/curriculo.store";

import { curriculoService } from "../service/curriculo.service";

export function useDeleteCurriculo() {
  const queryClient = useQueryClient();
  const selectedCurriculoId = useCurriculoStore(
    (state) => state.selectedCurriculoId,
  );
  const clearSelectedCurriculoId = useCurriculoStore(
    (state) => state.clearSelectedCurriculoId,
  );

  return useMutation({
    mutationFn: (id: string) => curriculoService.remove(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.curriculos });
      queryClient.removeQueries({ queryKey: queryKeys.curriculo(id) });
      queryClient.removeQueries({ queryKey: queryKeys.curriculoCompleto(id) });

      if (selectedCurriculoId === id) {
        clearSelectedCurriculoId();
      }
    },
  });
}