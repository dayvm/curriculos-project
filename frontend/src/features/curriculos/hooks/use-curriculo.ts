import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/constants/query-keys";

import { curriculoService } from "../service/curriculo.service";

export function useCurriculo(id?: string) {
  return useQuery({
    queryKey: id ? queryKeys.curriculo(id) : ["curriculos", "empty"],
    queryFn: () => curriculoService.findById(id as string),
    enabled: Boolean(id),
  });
}