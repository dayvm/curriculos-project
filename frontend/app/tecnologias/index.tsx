import { useState } from "react";
import { useRouter } from "expo-router";
import { View } from "react-native";

import { TecnologiaBadge } from "@/components/domain/tecnologia-badge";
import { ScreenContainer } from "@/components/layout/screen-container";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { Text } from "@/components/ui/text";
import { useDeleteTecnologia } from "@/features/tecnologias/hooks/use-delete-tecnologia";
import { useTecnologias } from "@/features/tecnologias/hooks/use-tecnologias";
import { routes } from "@/lib/constants/routes";
import { normalizeError } from "@/lib/utils/normalize-error";
import type { Tecnologia } from "@/features/tecnologias/types/tecnologia.type";

export default function TecnologiasPage() {
  const router = useRouter();
  const { data, isPending, isError, error, refetch } = useTecnologias();
  const deleteTecnologiaMutation = useDeleteTecnologia();
  const [selectedTecnologia, setSelectedTecnologia] = useState<Tecnologia | null>(null);

  async function handleDelete() {
    if (!selectedTecnologia) {
      return;
    }

    await deleteTecnologiaMutation.mutateAsync(selectedTecnologia.id);
    setSelectedTecnologia(null);
  }

  return (
    <ScreenContainer>
      <View className="gap-5">
        <View className="flex-row items-center justify-between gap-3">
          <View className="flex-1 gap-1">
            <Text className="text-2xl font-semibold">Tecnologias</Text>
            <Text className="text-muted-foreground">
              Lista de tecnologias cadastradas na API.
            </Text>
          </View>

          <Button onPress={() => router.push(routes.tecnologiaNova)}>
            <Text>Nova</Text>
          </Button>
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
          <View className="gap-4">
            {data.map((tecnologia) => (
              <Card key={tecnologia.id}>
                <CardHeader className="gap-2">
                  <CardTitle>{tecnologia.nome}</CardTitle>
                </CardHeader>

                <CardContent className="gap-3">
                  <TecnologiaBadge tecnologia={tecnologia} />

                  {tecnologia.descricao ? (
                    <Text className="text-muted-foreground text-sm">
                      {tecnologia.descricao}
                    </Text>
                  ) : null}
                </CardContent>

                <CardFooter className="gap-2">
                  <Button
                    className="flex-1"
                    variant="outline"
                    onPress={() =>
                      router.push(routes.tecnologiaEditar(tecnologia.id))
                    }
                  >
                    <Text>Editar</Text>
                  </Button>

                  <Button
                    className="flex-1"
                    variant="destructive"
                    onPress={() => setSelectedTecnologia(tecnologia)}
                  >
                    <Text>Excluir</Text>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </View>
        ) : null}
      </View>

      <ConfirmDialog
        open={Boolean(selectedTecnologia)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedTecnologia(null);
          }
        }}
        title="Excluir tecnologia"
        description={
          selectedTecnologia
            ? `Deseja excluir ${selectedTecnologia.nome}?`
            : "Deseja excluir esta tecnologia?"
        }
        confirmLabel={
          deleteTecnologiaMutation.isPending ? "Excluindo..." : "Excluir"
        }
        cancelLabel="Cancelar"
        onConfirm={handleDelete}
      />
    </ScreenContainer>
  );
}