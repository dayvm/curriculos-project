import { View } from "react-native";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { formatDateRange } from "@/lib/formatters/date.formatter";

import type { ExperienciaProfissional } from "@/features/experiencias-profissionais/types/experiencia-profissional.type";

type ExperienciaProfissionalCardProps = {
  experiencia: ExperienciaProfissional;
};

export function ExperienciaProfissionalCard({
  experiencia,
}: ExperienciaProfissionalCardProps) {
  return (
    <Card>
      <CardHeader className="gap-1">
        <CardTitle>{experiencia.cargo}</CardTitle>
        <CardDescription>{experiencia.empresa}</CardDescription>
      </CardHeader>

      <CardContent>
        <View className="gap-1">
          <Text className="text-muted-foreground text-sm">
            {formatDateRange(experiencia.dataInicio, experiencia.dataFim)}
          </Text>
        </View>
      </CardContent>
    </Card>
  );
}