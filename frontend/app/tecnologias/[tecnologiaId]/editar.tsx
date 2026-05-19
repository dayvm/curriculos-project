import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";

import { TecnologiaForm } from "@/components/domain/tecnologia-form";
import { ScreenContainer } from "@/components/layout/screen-container";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { Text } from "@/components/ui/text";
import { useTecnologia } from "@/features/tecnologias/hooks/use-tecnologia";
import { useUpdateTecnologia } from "@/features/tecnologias/hooks/use-update-tecnologia";
import {
  type TecnologiaFormValues,
} from "@/features/tecnologias/schemas/tecnologia.schema";
import { routes } from "@/lib/constants/routes";
import { normalizeError } from "@/lib/utils/normalize-error";

export default function EditarTecnologiaPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ tecnologiaId: string }>();
  const tecnologiaId = Array.isArray(params.tecnologiaId)
    ? params.tecnologiaId[0]
    : params.tecnologiaId;

  const { data, isPending, isError, error, refetch } =
    useTecnologia(tecnologiaId);

  const updateTecnologiaMutation = useUpdateTecnologia();

  async function handleSubmit(values: TecnologiaFormValues) {
    if (!tecnologiaId) {
      return;
    }

    await updateTecnologiaMutation.mutateAsync({
      id: tecnologiaId,
      data: values,
    });

    router.replace(routes.tecnologias);
  }

  return (
    <ScreenContainer>
      {isPending ? <LoadingState label="Carregando tecnologia..." /> : null}

      {isError ? (
        <ErrorState
          title="Erro ao carregar tecnologia"
          message={normalizeError(error)}
          onRetry={() => refetch()}
        />
      ) : null}

      {!isPending && !isError && data ? (
        <View className="gap-5">
          <View className="gap-1">
            <Text className="text-2xl font-semibold">Editar tecnologia</Text>
            <Text className="text-muted-foreground">
              Atualize os dados da tecnologia.
            </Text>
          </View>

          <TecnologiaForm
            initialValues={{
              nome: data.nome,
              descricao: data.descricao ?? undefined,
              categoria: data.categoria,
            }}
            submitLabel="Salvar alteracoes"
            isPending={updateTecnologiaMutation.isPending}
            errorMessage={
              updateTecnologiaMutation.isError
                ? normalizeError(updateTecnologiaMutation.error)
                : undefined
            }
            onSubmit={handleSubmit}
            onCancel={() => router.back()}
          />
        </View>
      ) : null}
    </ScreenContainer>
  );
}