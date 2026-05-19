import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/constants/query-keys";

import { tecnologiaService } from "../service/tecnologia.service";

export function useDeleteTecnologia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => tecnologiaService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tecnologias });
    },
  });
}