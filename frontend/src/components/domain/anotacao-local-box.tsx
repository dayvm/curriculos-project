import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

type AnotacaoLocalBoxProps = {
  conteudo: string;
  atualizadoEm: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

function formatarDataHora(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

export function AnotacaoLocalBox({
  conteudo,
  atualizadoEm,
  onEdit,
  onDelete,
}: AnotacaoLocalBoxProps) {
  return (
    <Card>
      <CardHeader className="gap-1">
        <CardTitle>Anotacao local</CardTitle>
        <Text className="text-muted-foreground text-sm">
          Atualizada em {formatarDataHora(atualizadoEm)}
        </Text>
      </CardHeader>

      <CardContent className="gap-4">
        <Text className="text-muted-foreground">{conteudo}</Text>

        <View className="flex-row gap-3">
          {onEdit ? (
            <Button className="flex-1" variant="outline" onPress={onEdit}>
              <Text>Editar</Text>
            </Button>
          ) : null}

          {onDelete ? (
            <Button className="flex-1" variant="destructive" onPress={onDelete}>
              <Text>Excluir</Text>
            </Button>
          ) : null}
        </View>
      </CardContent>
    </Card>
  );
}