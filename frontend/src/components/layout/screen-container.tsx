import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ScreenContainerProps = {
  children: ReactNode;
  scroll?: boolean;
  className?: string;
  contentClassName?: string;
};

export function ScreenContainer({
  children,
  scroll = true,
  className,
  contentClassName,
}: ScreenContainerProps) {
  const insets = useSafeAreaInsets();

  if (scroll) {
    return (
      <View
        className={cn("flex-1 bg-background", className)}
        style={{ paddingTop: insets.top }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 16) }}
        >
          <View className={cn("flex-1 px-4 py-4", contentClassName)}>
            {children}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View
      className={cn("flex-1 bg-background px-4 py-4", className, contentClassName)}
      style={{
        paddingTop: insets.top + 16,
        paddingBottom: Math.max(insets.bottom, 16),
      }}
    >
      {children}
    </View>
  );
}