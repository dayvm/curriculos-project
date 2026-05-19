import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/constants/query-keys";

import { experienciaAcademicaService } from "../service/experiencia-academica.service";

export function useExperienciasAcademicas(curriculoId?: string | null) {
  return useQuery({
    queryKey: curriculoId
      ? queryKeys.experienciasAcademicas(curriculoId)
      : ["curriculos", "sem-curriculo", "experiencias-academicas"],
    queryFn: () =>
      experienciaAcademicaService.findByCurriculo(curriculoId as string),
    enabled: Boolean(curriculoId),
  });
}