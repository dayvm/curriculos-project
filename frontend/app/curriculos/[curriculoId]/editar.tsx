import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";

import { CurriculoForm } from "@/components/domain/curriculo-form";
import { ScreenContainer } from "@/components/layout/screen-container";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { Text } from "@/components/ui/text";
import { useCurriculo } from "@/features/curriculos/hooks/use-curriculo";
import { useUpdateCurriculo } from "@/features/curriculos/hooks/use-update-curriculo";
import {
    type CurriculoFormValues,
} from "@/features/curriculos/schemas/curriculo.schema";
import { routes } from "@/lib/constants/routes";
import { normalizeError } from "@/lib/utils/normalize-error";

export default function EditarCurriculoPage() {
    const router = useRouter();
    const params = useLocalSearchParams<{ curriculoId: string }>();
    const curriculoId = Array.isArray(params.curriculoId)
        ? params.curriculoId[0]
        : params.curriculoId;

    const { data, isPending, isError, error, refetch } = useCurriculo(curriculoId);
    const updateCurriculoMutation = useUpdateCurriculo();

    async function handleSubmit(values: CurriculoFormValues) {
        if (!curriculoId) {
            return;
        }

        await updateCurriculoMutation.mutateAsync({
            id: curriculoId,
            data: values,
        });

        router.replace(routes.curriculoDetail(curriculoId));
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
                <View className="gap-5">
                    <View className="gap-1">
                        <Text className="text-2xl font-semibold">Editar curriculo</Text>
                        <Text className="text-muted-foreground">
                            Atualize os dados principais do curriculo.
                        </Text>
                    </View>

                    <CurriculoForm
                        initialValues={{
                            nome: data.nome,
                            titulo: data.titulo,
                            resumo: data.resumo,
                            email: data.email,
                            telefone: data.telefone ?? undefined,
                            fotoUrl: data.fotoUrl ?? undefined,
                            status: data.status,
                        }}
                        submitLabel="Salvar alteracoes"
                        isPending={updateCurriculoMutation.isPending}
                        errorMessage={
                            updateCurriculoMutation.isError
                                ? normalizeError(updateCurriculoMutation.error)
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