import { Linking, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { ScreenContainer } from "@/components/layout/screen-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { Text } from "@/components/ui/text";
import { useProjeto } from "@/features/projetos/hooks/use-projeto";
import { normalizeError } from "@/lib/utils/normalize-error";

function getTipoLabel(tipo: string) {
  switch (tipo) {
    case "ACADEMICO":
      return "Academico";
    case "PROFISSIONAL":
      return "Profissional";
    case "INDIVIDUAL":
      return "Individual";
    default:
      return tipo;
  }
}

export default function ProjetoDetailPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    curriculoId: string;
    projetoId: string;
  }>();

  const projetoId = Array.isArray(params.projetoId)
    ? params.projetoId[0]
    : params.projetoId;

  const { data, isPending, isError, error, refetch } = useProjeto(projetoId);

  async function handleOpenUrl(url: string) {
    await Linking.openURL(url);
  }

  return (
    <ScreenContainer>
      {isPending ? <LoadingState label="Carregando projeto..." /> : null}

      {isError ? (
        <ErrorState
          title="Erro ao carregar projeto"
          message={normalizeError(error)}
          onRetry={() => refetch()}
        />
      ) : null}

      {!isPending && !isError && data ? (
        <View className="gap-5">
          <View className="gap-2">
            <View className="flex-row items-start justify-between gap-3">
              <View className="flex-1 gap-1">
                <Text className="text-2xl font-semibold">{data.titulo}</Text>
                <Text className="text-muted-foreground">
                  {data.descricaoCurta}
                </Text>
              </View>

              <Badge variant="secondary">
                <Text>{getTipoLabel(data.tipo)}</Text>
              </Badge>
            </View>
          </View>

          <View className="gap-2">
            <Text className="text-base font-medium">Descricao</Text>
            <Text className="text-muted-foreground">{data.descricaoLonga}</Text>
          </View>

          <View className="gap-2">
            <Text className="text-base font-medium">Slug</Text>
            <Text className="text-muted-foreground">{data.slug}</Text>
          </View>

          {data.instituicao ? (
            <View className="gap-2">
              <Text className="text-base font-medium">Instituicao</Text>
              <Text className="text-muted-foreground">{data.instituicao}</Text>
            </View>
          ) : null}

          {data.tecnologias?.length ? (
            <View className="gap-2">
              <Text className="text-base font-medium">Tecnologias</Text>

              <View className="flex-row flex-wrap gap-2">
                {data.tecnologias.map((tecnologia) => (
                  <Badge key={tecnologia.id} variant="outline">
                    <Text>{tecnologia.nome}</Text>
                  </Badge>
                ))}
              </View>
            </View>
          ) : null}

          <View className="flex-row gap-3 pt-2">
            {data.githubUrl ? (
              <Button
                className="flex-1"
                variant="outline"
                onPress={() => handleOpenUrl(data.githubUrl as string)}
              >
                <Text>GitHub</Text>
              </Button>
            ) : null}

            {data.demoUrl ? (
              <Button
                className="flex-1"
                variant="outline"
                onPress={() => handleOpenUrl(data.demoUrl as string)}
              >
                <Text>Demo</Text>
              </Button>
            ) : null}
          </View>

          <Button variant="outline" onPress={() => router.back()}>
            <Text>Voltar</Text>
          </Button>
        </View>
      ) : null}
    </ScreenContainer>
  );
}