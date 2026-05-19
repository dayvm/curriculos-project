import { useRouter } from "expo-router";
import { View } from "react-native";

import { CurriculoForm } from "@/components/domain/curriculo-form";
import { ScreenContainer } from "@/components/layout/screen-container";
import { Text } from "@/components/ui/text";
import {
  type CurriculoFormValues,
} from "@/features/curriculos/schemas/curriculo.schema";
import { useCreateCurriculo } from "@/features/curriculos/hooks/use-create-curriculo";
import { routes } from "@/lib/constants/routes";
import { normalizeError } from "@/lib/utils/normalize-error";

export default function NovoCurriculoPage() {
  const router = useRouter();
  const createCurriculoMutation = useCreateCurriculo();

  async function handleSubmit(values: CurriculoFormValues) {
    const curriculo = await createCurriculoMutation.mutateAsync(values);
    router.replace(routes.curriculoDetail(curriculo.id));
  }

  return (
    <ScreenContainer>
      <View className="gap-5">
        <View className="gap-1">
          <Text className="text-2xl font-semibold">Novo curriculo</Text>
          <Text className="text-muted-foreground">
            Preencha os dados principais do curriculo.
          </Text>
        </View>

        <CurriculoForm
          submitLabel="Criar curriculo"
          isPending={createCurriculoMutation.isPending}
          errorMessage={
            createCurriculoMutation.isError
              ? normalizeError(createCurriculoMutation.error)
              : undefined
          }
          onSubmit={handleSubmit}
          onCancel={() => router.back()}
        />
      </View>
    </ScreenContainer>
  );
}