import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";

import { CurriculoHeader } from "@/components/domain/curriculo-header";
import { ScreenContainer } from "@/components/layout/screen-container";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { Text } from "@/components/ui/text";
import { useCurriculoCompleto } from "@/features/curriculos/hooks/use-curriculo-completo";
import { useDeleteCurriculo } from "@/features/curriculos/hooks/use-delete-curriculo";
import { routes } from "@/lib/constants/routes";
import { normalizeError } from "@/lib/utils/normalize-error";

export default function CurriculoDetailPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ curriculoId: string }>();
  const curriculoId = Array.isArray(params.curriculoId)
    ? params.curriculoId[0]
    : params.curriculoId;

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { data, isPending, isError, error, refetch } =
    useCurriculoCompleto(curriculoId);

  const deleteCurriculoMutation = useDeleteCurriculo();

  async function handleDelete() {
    if (!curriculoId) {
      return;
    }

    await deleteCurriculoMutation.mutateAsync(curriculoId);
    setOpenDeleteDialog(false);
    router.replace(routes.home);
  }

  return (
    <ScreenContainer>
      {isPending ? <LoadingState label="Carregando curriculo..." /> : null}

      {isError ? (
        <ErrorState
          title="Erro ao carregar curriculo"
          message={normalizeError(error)}
          onRetry={() => refetch()}
        />
      ) : null}

      {!isPending && !isError && data ? (
        <View className="gap-4">
          <CurriculoHeader curriculo={data} />

          <View className="gap-2">
            <Text className="text-lg font-semibold">Resumo dos modulos</Text>
            <Text className="text-muted-foreground">
              Academico: {data.experienciasAcademicas.length}
            </Text>
            <Text className="text-muted-foreground">
              Profissional: {data.experienciasProfissionais.length}
            </Text>
            <Text className="text-muted-foreground">
              Projetos: {data.projetos.length}
            </Text>
          </View>

          <View className="pt-2">
            <Text
              className="text-destructive text-sm font-medium"
              onPress={() => setOpenDeleteDialog(true)}
            >
              Excluir curriculo
            </Text>
          </View>
        </View>
      ) : null}

      <ConfirmDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        title="Excluir curriculo"
        description="Essa acao remove o curriculo permanentemente."
        confirmLabel={
          deleteCurriculoMutation.isPending ? "Excluindo..." : "Excluir"
        }
        cancelLabel="Cancelar"
        onConfirm={handleDelete}
      />
    </ScreenContainer>
  );
}