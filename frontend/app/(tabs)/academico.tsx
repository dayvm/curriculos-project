import { useRouter } from "expo-router";
import { View } from "react-native";

import { ExperienciaAcademicaCard } from "@/components/domain/experiencia-academica-card";
import { ScreenContainer } from "@/components/layout/screen-container";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { Text } from "@/components/ui/text";
import { useExperienciasAcademicas } from "@/features/experiencias-academicas/hooks/use-experiencias-academicas";
import { routes } from "@/lib/constants/routes";
import { normalizeError } from "@/lib/utils/normalize-error";
import { useCurriculoStore } from "@/store/curriculo.store";

export default function AcademicoTab() {
  const router = useRouter();
  const selectedCurriculoId = useCurriculoStore(
    (state) => state.selectedCurriculoId,
  );

  const { data, isPending, isError, error, refetch } =
    useExperienciasAcademicas(selectedCurriculoId);

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
          <Text className="text-2xl font-semibold">Academico</Text>
          <Text className="text-muted-foreground">
            Experiencias academicas do curriculo selecionado.
          </Text>
        </View>

        {isPending ? (
          <LoadingState label="Carregando experiencias academicas..." />
        ) : null}

        {isError ? (
          <ErrorState
            title="Erro ao carregar experiencias academicas"
            message={normalizeError(error)}
            onRetry={() => refetch()}
          />
        ) : null}

        {!isPending && !isError && !data?.length ? (
          <EmptyState
            title="Nenhuma experiencia academica encontrada"
            description="Este curriculo ainda nao possui formacoes cadastradas."
          />
        ) : null}

        {!isPending && !isError && data?.length ? (
          <View className="gap-4">
            {data.map((experiencia) => (
              <ExperienciaAcademicaCard
                key={experiencia.id}
                experiencia={experiencia}
              />
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