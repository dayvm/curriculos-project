import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";

import { AnotacaoLocalBox } from "@/components/domain/anotacao-local-box";
import { ScreenContainer } from "@/components/layout/screen-container";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import { useAnotacaoLocal } from "@/features/anotacoes/hooks/use-anotacao-local";
import { useDeleteAnotacaoLocal } from "@/features/anotacoes/hooks/use-delete-anotacao-local";
import { useSaveAnotacaoLocal } from "@/features/anotacoes/hooks/use-save-anotacao-local";
import { anotacaoLocalSchema } from "@/features/anotacoes/schemas/anotacao-local.schema";
import { normalizeError } from "@/lib/utils/normalize-error";

export default function AnotacaoCurriculoPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ curriculoId: string }>();
  const curriculoId = Array.isArray(params.curriculoId)
    ? params.curriculoId[0]
    : params.curriculoId;

  const { data, isPending, isError, error, refetch } =
    useAnotacaoLocal(curriculoId);

  const saveAnotacaoMutation = useSaveAnotacaoLocal();
  const deleteAnotacaoMutation = useDeleteAnotacaoLocal();

  const [conteudo, setConteudo] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    if (data?.conteudo) {
      setConteudo(data.conteudo);
    } else {
      setConteudo("");
    }
  }, [data]);

  async function handleSave() {
    const parsed = anotacaoLocalSchema.safeParse({ conteudo });

    if (!parsed.success) {
      setFieldError(parsed.error.issues[0]?.message ?? "Anotacao invalida.");
      return;
    }

    if (!curriculoId) {
      return;
    }

    setFieldError(null);

    await saveAnotacaoMutation.mutateAsync({
      curriculoId,
      conteudo: parsed.data.conteudo,
    });
  }

  async function handleDelete() {
    if (!curriculoId) {
      return;
    }

    await deleteAnotacaoMutation.mutateAsync(curriculoId);
    setOpenDeleteDialog(false);
    setConteudo("");
  }

  return (
    <ScreenContainer>
      <View className="gap-5">
        <View className="gap-1">
          <Text className="text-2xl font-semibold">Anotacao local</Text>
          <Text className="text-muted-foreground">
            Esta anotacao fica salva apenas no dispositivo.
          </Text>
        </View>

        {isPending ? <LoadingState label="Carregando anotacao..." /> : null}

        {isError ? (
          <ErrorState
            title="Erro ao carregar anotacao"
            message={normalizeError(error)}
            onRetry={() => refetch()}
          />
        ) : null}

        {!isPending && !isError && data ? (
          <AnotacaoLocalBox
            conteudo={data.conteudo}
            atualizadoEm={data.atualizadoEm}
            onEdit={() => setConteudo(data.conteudo)}
            onDelete={() => setOpenDeleteDialog(true)}
          />
        ) : null}

        {!isPending && !isError && !data ? (
          <EmptyState
            title="Nenhuma anotacao salva"
            description="Crie uma anotacao privada para este curriculo."
          />
        ) : null}

        <View className="gap-2">
          <Text className="text-base font-medium">Escrever anotacao</Text>

          <Textarea
            placeholder="Digite sua anotacao aqui..."
            value={conteudo}
            onChangeText={(value) => {
              setConteudo(value);
              setFieldError(null);
            }}
            numberOfLines={8}
          />

          {fieldError ? (
            <Text className="text-destructive text-sm">{fieldError}</Text>
          ) : null}

          {(saveAnotacaoMutation.isError || deleteAnotacaoMutation.isError) ? (
            <Text className="text-destructive text-sm">
              {saveAnotacaoMutation.isError
                ? normalizeError(saveAnotacaoMutation.error)
                : normalizeError(deleteAnotacaoMutation.error)}
            </Text>
          ) : null}
        </View>

        <View className="flex-row gap-3">
          <Button className="flex-1" variant="outline" onPress={() => router.back()}>
            <Text>Voltar</Text>
          </Button>

          <Button
            className="flex-1"
            onPress={handleSave}
            disabled={saveAnotacaoMutation.isPending}
          >
            <Text>
              {saveAnotacaoMutation.isPending ? "Salvando..." : "Salvar"}
            </Text>
          </Button>
        </View>
      </View>

      <ConfirmDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        title="Excluir anotacao"
        description="Deseja remover esta anotacao local?"
        confirmLabel={
          deleteAnotacaoMutation.isPending ? "Excluindo..." : "Excluir"
        }
        cancelLabel="Cancelar"
        onConfirm={handleDelete}
      />
    </ScreenContainer>
  );
}