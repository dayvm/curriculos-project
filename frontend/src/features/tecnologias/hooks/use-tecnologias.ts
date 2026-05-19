import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/constants/query-keys";

import { tecnologiaService } from "../service/tecnologia.service";

export function useTecnologias() {
  return useQuery({
    queryKey: queryKeys.tecnologias,
    queryFn: tecnologiaService.findAll,
  });
}