import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/constants/query-keys";

import { projetoService } from "../service/projeto.service";

export function useProjetos(curriculoId?: string | null) {
  return useQuery({
    queryKey: curriculoId
      ? queryKeys.projetos(curriculoId)
      : ["curriculos", "sem-curriculo", "projetos"],
    queryFn: () => projetoService.findByCurriculo(curriculoId as string),
    enabled: Boolean(curriculoId),
  });
}