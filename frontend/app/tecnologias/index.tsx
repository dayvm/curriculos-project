import { View } from "react-native";

import { TecnologiaBadge } from "@/components/domain/tecnologia-badge";
import { ScreenContainer } from "@/components/layout/screen-container";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { Text } from "@/components/ui/text";
import { useTecnologias } from "@/features/tecnologias/hooks/use-tecnologias";
import { normalizeError } from "@/lib/utils/normalize-error";

export default function TecnologiasPage() {
  const { data, isPending, isError, error, refetch } = useTecnologias();

  return (
    <ScreenContainer>
      <View className="gap-5">
        <View className="gap-1">
          <Text className="text-2xl font-semibold">Tecnologias</Text>
          <Text className="text-muted-foreground">
            Lista de tecnologias cadastradas na API.
          </Text>
        </View>

        {isPending ? <LoadingState label="Carregando tecnologias..." /> : null}

        {isError ? (
          <ErrorState
            title="Erro ao carregar tecnologias"
            message={normalizeError(error)}
            onRetry={() => refetch()}
          />
        ) : null}

        {!isPending && !isError && !data?.length ? (
          <EmptyState
            title="Nenhuma tecnologia encontrada"
            description="Sua API ainda nao possui tecnologias cadastradas."
          />
        ) : null}

        {!isPending && !isError && data?.length ? (
          <View className="flex-row flex-wrap gap-3">
            {data.map((tecnologia) => (
              <TecnologiaBadge key={tecnologia.id} tecnologia={tecnologia} />
            ))}
          </View>
        ) : null}
      </View>
    </ScreenContainer>
  );
}