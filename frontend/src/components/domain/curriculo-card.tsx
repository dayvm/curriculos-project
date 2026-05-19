import { Mail, Pencil, Trash2 } from "lucide-react-native";
import { Pressable, View } from "react-native";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

import type { Curriculo } from "@/features/curriculos/types/curriculo.type";

type CurriculoCardProps = {
  curriculo: Curriculo;
  isSelected?: boolean;
  onSelect?: () => void;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

function getResumoCurto(resumo: string) {
  if (resumo.length <= 140) {
    return resumo;
  }

  return `${resumo.slice(0, 137)}...`;
}

export function CurriculoCard({
  curriculo,
  isSelected = false,
  onSelect,
  onPress,
  onEdit,
  onDelete,
}: CurriculoCardProps) {
  return (
    <Pressable onPress={onSelect}>
      <Card className={cn(isSelected && "border-primary bg-primary/5")}>
        <CardHeader className="gap-2">
          <View className="flex-row items-start justify-between gap-3">
            <View className="flex-1 gap-1">
              <CardTitle>{curriculo.nome}</CardTitle>
              <CardDescription>{curriculo.titulo}</CardDescription>
            </View>

            <View className="items-end gap-2">
              <View
                className={cn(
                  "rounded-full px-2 py-1",
                  curriculo.status === "ATIVO" ? "bg-emerald-100" : "bg-zinc-200",
                )}
              >
                <Text className="text-xs font-medium">
                  {curriculo.status === "ATIVO" ? "Ativo" : "Inativo"}
                </Text>
              </View>

              {isSelected ? (
                <View className="rounded-full bg-primary px-2 py-1">
                  <Text className="text-xs font-medium text-primary-foreground">
                    Selecionado
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </CardHeader>

        <CardContent className="gap-3">
          <Text className="text-muted-foreground text-sm">
            {getResumoCurto(curriculo.resumo)}
          </Text>

          <View className="flex-row items-center gap-2">
            <Mail size={16} />
            <Text className="text-sm">{curriculo.email}</Text>
          </View>
        </CardContent>

        <CardFooter className="gap-2">
          {onPress ? (
            <Button className="flex-1" onPress={onPress}>
              <Text>Abrir</Text>
            </Button>
          ) : null}

          {onEdit ? (
            <Button size="icon" variant="outline" onPress={onEdit}>
              <Pencil size={16} />
            </Button>
          ) : null}

          {onDelete ? (
            <Button size="icon" variant="destructive" onPress={onDelete}>
              <Trash2 size={16} />
            </Button>
          ) : null}
        </CardFooter>
      </Card>
    </Pressable>
  );
}