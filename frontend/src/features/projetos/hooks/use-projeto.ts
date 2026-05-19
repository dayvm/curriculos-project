import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/constants/query-keys";

import { projetoService } from "../service/projeto.service";

export function useProjeto(id?: string) {
  return useQuery({
    queryKey: id ? queryKeys.projeto(id) : ["projetos", "empty"],
    queryFn: () => projetoService.findById(id as string),
    enabled: Boolean(id),
  });
}