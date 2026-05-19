import { useRouter } from "expo-router";
import { View } from "react-native";

import { ProjetoCard } from "@/components/domain/projeto-card";
import { ScreenContainer } from "@/components/layout/screen-container";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { Text } from "@/components/ui/text";
import { useProjetos } from "@/features/projetos/hooks/use-projetos";
import { routes } from "@/lib/constants/routes";
import { normalizeError } from "@/lib/utils/normalize-error";
import { useCurriculoStore } from "@/store/curriculo.store";

export default function ProjetosTab() {
  const router = useRouter();
  const selectedCurriculoId = useCurriculoStore(
    (state) => state.selectedCurriculoId,
  );

  const { data, isPending, isError, error, refetch } =
    useProjetos(selectedCurriculoId);

  if (!selectedCurriculoId) {
    return (
      <ScreenContainer>
        <EmptyState
          title="Nenhum curriculo selecionado"
          description="Selecione um curriculo na Home para visualizar esta secao."
          actionLabel="Ir para Home"
          onAction={() => router.push(routes.home)}
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View className="gap-5">
        <View className="gap-1">
          <Text className="text-2xl font-semibold">Projetos</Text>
          <Text className="text-muted-foreground">
            Projetos do curriculo selecionado.
          </Text>
        </View>

        {isPending ? <LoadingState label="Carregando projetos..." /> : null}

        {isError ? (
          <ErrorState
            title="Erro ao carregar projetos"
            message={normalizeError(error)}
            onRetry={() => refetch()}
          />
        ) : null}

        {!isPending && !isError && !data?.length ? (
          <EmptyState
            title="Nenhum projeto encontrado"
            description="Este curriculo ainda nao possui projetos cadastrados."
          />
        ) : null}

        {!isPending && !isError && data?.length ? (
          <View className="gap-4">
            {data.map((projeto) => (
              <ProjetoCard key={projeto.id} projeto={projeto} />
            ))}
          </View>
        ) : null}

        <Button variant="outline" onPress={() => router.push(routes.home)}>
          <Text>Trocar curriculo</Text>
        </Button>
      </View>
    </ScreenContainer>
  );
}