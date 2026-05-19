import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { ActivityIndicator, View } from "react-native";

type LoadingStateProps = {
  label?: string;
  className?: string;
};

export function LoadingState({
  label = "Carregando...",
  className,
}: LoadingStateProps) {
  return (
    <View className={cn("flex-1 items-center justify-center gap-3 py-10", className)}>
      <ActivityIndicator size="large" />
      <Text className="text-muted-foreground text-sm">{label}</Text>
    </View>
  );
}