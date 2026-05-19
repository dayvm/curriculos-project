import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/constants/query-keys";

import { curriculoService } from "../service/curriculo.service";

export function useCurriculos() {
  return useQuery({
    queryKey: queryKeys.curriculos,
    queryFn: curriculoService.findAll,
  });
}