import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { Inbox } from "lucide-react-native";
import type { ReactNode } from "react";
import { View } from "react-native";

type EmptyStateProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
  className?: string;
};

export function EmptyState({
  title = "Nenhum item encontrado",
  description = "Adicione um novo item para começar.",
  actionLabel,
  onAction,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <View className={cn("items-center justify-center gap-4 py-10", className)}>
      <View className="bg-muted rounded-full p-3">
        {icon ?? <Inbox className="text-muted-foreground" size={22} />}
      </View>

      <View className="items-center gap-1">
        <Text className="text-foreground text-base font-semibold">{title}</Text>
        <Text className="text-muted-foreground text-center text-sm">
          {description}
        </Text>
      </View>

      {actionLabel && onAction ? (
        <Button onPress={onAction}>
          <Text>{actionLabel}</Text>
        </Button>
      ) : null}
    </View>
  );
}