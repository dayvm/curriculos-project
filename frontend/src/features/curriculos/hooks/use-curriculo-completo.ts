import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/constants/query-keys";

import { curriculoService } from "../service/curriculo.service";

export function useCurriculoCompleto(id?: string) {
  return useQuery({
    queryKey: id ? queryKeys.curriculoCompleto(id) : ["curriculos", "empty", "completo"],
    queryFn: () => curriculoService.findCompleteById(id as string),
    enabled: Boolean(id),
  });
}