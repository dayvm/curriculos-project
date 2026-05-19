import { useMutation, useQueryClient } from "@tanstack/react-query";

import { anotacaoLocalService } from "../service/anotacao-local.service";

export function useDeleteAnotacaoLocal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (curriculoId: string) => anotacaoLocalService.remove(curriculoId),
    onSuccess: (_, curriculoId) => {
      queryClient.invalidateQueries({
        queryKey: ["anotacao-local", curriculoId],
      });
    },
  });
}