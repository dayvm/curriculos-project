import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/constants/query-keys";

import { tecnologiaService } from "../service/tecnologia.service";

export function useTecnologia(id?: string) {
  return useQuery({
    queryKey: id ? [...queryKeys.tecnologias, id] : ["tecnologias", "empty"],
    queryFn: () => tecnologiaService.findById(id as string),
    enabled: Boolean(id),
  });
}