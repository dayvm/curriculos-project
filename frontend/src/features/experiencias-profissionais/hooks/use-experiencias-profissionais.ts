import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/constants/query-keys";

import { experienciaProfissionalService } from "../service/experiencia-profissional.service";

export function useExperienciasProfissionais(curriculoId?: string | null) {
  return useQuery({
    queryKey: curriculoId
      ? queryKeys.experienciasProfissionais(curriculoId)
      : ["curriculos", "sem-curriculo", "experiencias-profissionais"],
    queryFn: () =>
      experienciaProfissionalService.findByCurriculo(curriculoId as string),
    enabled: Boolean(curriculoId),
  });
}