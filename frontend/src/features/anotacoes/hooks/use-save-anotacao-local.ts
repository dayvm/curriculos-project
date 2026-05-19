import { useMutation, useQueryClient } from "@tanstack/react-query";

import { anotacaoLocalService } from "../service/anotacao-local.service";

type SaveAnotacaoLocalPayload = {
  curriculoId: string;
  conteudo: string;
};

export function useSaveAnotacaoLocal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ curriculoId, conteudo }: SaveAnotacaoLocalPayload) =>
      anotacaoLocalService.save(curriculoId, conteudo),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["anotacao-local", variables.curriculoId],
      });
    },
  });
}