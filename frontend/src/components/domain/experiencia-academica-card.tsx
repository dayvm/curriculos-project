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

import type { ExperienciaAcademica } from "@/features/experiencias-academicas/types/experiencia-academica.type";

type ExperienciaAcademicaCardProps = {
  experiencia: ExperienciaAcademica;
};

export function ExperienciaAcademicaCard({
  experiencia,
}: ExperienciaAcademicaCardProps) {
  return (
    <Card>
      <CardHeader className="gap-1">
        <CardTitle>{experiencia.curso}</CardTitle>
        <CardDescription>{experiencia.instituicao}</CardDescription>
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