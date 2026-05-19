import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { CircleAlert } from "lucide-react-native";
import { View } from "react-native";

type ErrorStateProps = {
  title?: string;
  message?: string;
  retryLabel?: string;
  onRetry?: () => void;
  className?: string;
};

export function ErrorState({
  title = "Erro ao carregar",
  message = "Tente novamente em instantes.",
  retryLabel = "Tentar novamente",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <View className={cn("items-center justify-center gap-4 py-10", className)}>
      <View className="bg-destructive/10 rounded-full p-3">
        <CircleAlert className="text-destructive" size={22} />
      </View>

      <View className="items-center gap-1">
        <Text className="text-foreground text-base font-semibold">{title}</Text>
        <Text className="text-muted-foreground text-center text-sm">{message}</Text>
      </View>

      {onRetry ? (
        <Button onPress={onRetry}>
          <Text>{retryLabel}</Text>
        </Button>
      ) : null}
    </View>
  );
}