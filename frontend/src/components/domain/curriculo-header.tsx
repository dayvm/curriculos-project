import { View } from "react-native";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

import type { CurriculoCompleto } from "@/features/curriculos/types/curriculo.type";

type CurriculoHeaderProps = {
  curriculo: CurriculoCompleto;
};

export function CurriculoHeader({ curriculo }: CurriculoHeaderProps) {
  return (
    <Card>
      <CardHeader className="gap-2">
        <View className="gap-1">
          <CardTitle>{curriculo.nome}</CardTitle>
          <Text className="text-muted-foreground">{curriculo.titulo}</Text>
        </View>
      </CardHeader>

      <CardContent className="gap-4">
        <Text>{curriculo.resumo}</Text>

        <View className="gap-1">
          <Text className="text-sm font-medium">Email</Text>
          <Text className="text-muted-foreground">{curriculo.email}</Text>
        </View>

        {curriculo.telefone ? (
          <View className="gap-1">
            <Text className="text-sm font-medium">Telefone</Text>
            <Text className="text-muted-foreground">{curriculo.telefone}</Text>
          </View>
        ) : null}

        <View className="flex-row flex-wrap gap-2">
          <Badge variant="secondary">
            <Text>{curriculo.status === "ATIVO" ? "Ativo" : "Inativo"}</Text>
          </Badge>

          <Badge variant="outline">
            <Text>{curriculo.experienciasAcademicas.length} academicas</Text>
          </Badge>

          <Badge variant="outline">
            <Text>{curriculo.experienciasProfissionais.length} profissionais</Text>
          </Badge>

          <Badge variant="outline">
            <Text>{curriculo.projetos.length} projetos</Text>
          </Badge>
        </View>

        {curriculo.tecnologias.length ? (
          <View className="gap-2">
            <Text className="text-sm font-medium">Tecnologias</Text>

            <View className="flex-row flex-wrap gap-2">
              {curriculo.tecnologias.map((tecnologia) => (
                <Badge key={tecnologia.id} variant="outline">
                  <Text>{tecnologia.nome}</Text>
                </Badge>
              ))}
            </View>
          </View>
        ) : null}
      </CardContent>
    </Card>
  );
}