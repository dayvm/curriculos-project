import { storageClient } from "@/infrastructure/storage/storage.client";
import { storageKeys } from "@/infrastructure/storage/storage.keys";

import type { AnotacaoLocal } from "../types/anotacao-local.type";

export const anotacaoLocalService = {
  async findByCurriculoId(curriculoId: string) {
    const rawValue = await storageClient.getItem(
      storageKeys.anotacaoLocal(curriculoId),
    );

    if (!rawValue) {
      return null;
    }

    return JSON.parse(rawValue) as AnotacaoLocal;
  },

  async save(curriculoId: string, conteudo: string) {
    const anotacao: AnotacaoLocal = {
      curriculoId,
      conteudo: conteudo.trim(),
      atualizadoEm: new Date().toISOString(),
    };

    await storageClient.setItem(
      storageKeys.anotacaoLocal(curriculoId),
      JSON.stringify(anotacao),
    );

    return anotacao;
  },

  async remove(curriculoId: string) {
    await storageClient.removeItem(storageKeys.anotacaoLocal(curriculoId));
  },
};