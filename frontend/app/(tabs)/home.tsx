import { useRouter } from "expo-router";
import { View } from "react-native";

import { CurriculoCard } from "@/components/domain/curriculo-card";
import { ScreenContainer } from "@/components/layout/screen-container";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { Text } from "@/components/ui/text";
import { useCurriculos } from "@/features/curriculos/hooks/use-curriculos";
import { routes } from "@/lib/constants/routes";
import { normalizeError } from "@/lib/utils/normalize-error";
import { useCurriculoStore } from "@/store/curriculo.store";

export default function HomeTab() {
  const router = useRouter();
  const { data, isPending, isError, error, refetch } = useCurriculos();
  const selectedCurriculoId = useCurriculoStore(
    (state) => state.selectedCurriculoId,
  );
  const setSelectedCurriculoId = useCurriculoStore(
    (state) => state.setSelectedCurriculoId,
  );

  function handleOpenCurriculo(curriculoId: string) {
    setSelectedCurriculoId(curriculoId);
    router.push(routes.curriculoDetail(curriculoId));
  }

  return (
    <ScreenContainer>
      <View className="gap-5">
        <View className="flex-row items-center justify-between gap-3">
          <View className="flex-1 gap-1">
            <Text className="text-2xl font-semibold">Curriculos</Text>
            <Text className="text-muted-foreground">
              Selecione um curriculo para ver os detalhes.
            </Text>
          </View>

          <Button onPress={() => router.push(routes.curriculoNovo)}>
            <Text>Novo</Text>
          </Button>
        </View>

        {isPending ? <LoadingState label="Carregando curriculos..." /> : null}

        {isError ? (
          <ErrorState
            title="Erro ao carregar curriculos"
            message={normalizeError(error)}
            onRetry={() => refetch()}
          />
        ) : null}

        {!isPending && !isError && !data?.length ? (
          <EmptyState
            title="Nenhum curriculo encontrado"
            description="Sua API nao retornou curriculos no momento."
          />
        ) : null}

        {!isPending && !isError && data?.length ? (
          <View className="gap-4">
            {data.map((curriculo) => (
              <CurriculoCard
                key={curriculo.id}
                curriculo={curriculo}
                isSelected={selectedCurriculoId === curriculo.id}
                onPress={() => handleOpenCurriculo(curriculo.id)}
                onEdit={() => router.push(routes.curriculoEditar(curriculo.id))}
              />
            ))}
          </View>
        ) : null}
      </View>
    </ScreenContainer>
  );
}