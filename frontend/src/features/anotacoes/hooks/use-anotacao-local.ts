import { useQuery } from "@tanstack/react-query";

import { anotacaoLocalService } from "../service/anotacao-local.service";

export function useAnotacaoLocal(curriculoId?: string) {
  return useQuery({
    queryKey: curriculoId
      ? ["anotacao-local", curriculoId]
      : ["anotacao-local", "empty"],
    queryFn: () => anotacaoLocalService.findByCurriculoId(curriculoId as string),
    enabled: Boolean(curriculoId),
  });
}