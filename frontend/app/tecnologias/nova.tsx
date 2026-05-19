import { useRouter } from "expo-router";
import { View } from "react-native";

import { TecnologiaForm } from "@/components/domain/tecnologia-form";
import { ScreenContainer } from "@/components/layout/screen-container";
import { Text } from "@/components/ui/text";
import {
  type TecnologiaFormValues,
} from "@/features/tecnologias/schemas/tecnologia.schema";
import { useCreateTecnologia } from "@/features/tecnologias/hooks/use-create-tecnologia";
import { routes } from "@/lib/constants/routes";
import { normalizeError } from "@/lib/utils/normalize-error";

export default function NovaTecnologiaPage() {
  const router = useRouter();
  const createTecnologiaMutation = useCreateTecnologia();

  async function handleSubmit(values: TecnologiaFormValues) {
    await createTecnologiaMutation.mutateAsync(values);
    router.replace(routes.tecnologias);
  }

  return (
    <ScreenContainer>
      <View className="gap-5">
        <View className="gap-1">
          <Text className="text-2xl font-semibold">Nova tecnologia</Text>
          <Text className="text-muted-foreground">
            Cadastre uma tecnologia na API.
          </Text>
        </View>

        <TecnologiaForm
          submitLabel="Criar tecnologia"
          isPending={createTecnologiaMutation.isPending}
          errorMessage={
            createTecnologiaMutation.isError
              ? normalizeError(createTecnologiaMutation.error)
              : undefined
          }
          onSubmit={handleSubmit}
          onCancel={() => router.back()}
        />
      </View>
    </ScreenContainer>
  );
}