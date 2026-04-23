import { Text, View } from "react-native";
import { Colors } from "@/constants/theme";

type Props = {
  name: string;
  subtitle?: string;
  showUpgradeBadge?: boolean;
};

export function Header({ name, subtitle, showUpgradeBadge = true }: Props) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-3">
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          className="h-12 w-12 rounded-full"
          style={{ backgroundColor: Colors.light.surface2, borderWidth: 1, borderColor: Colors.light.border }}
        />
        <View className="gap-1">
          <Text className="text-xl font-bold text-slate-900 dark:text-white">{name}</Text>
          {subtitle ? <Text className="text-lg text-slate-500 dark:text-slate-200">{subtitle}</Text> : null}
        </View>
      </View>

      {showUpgradeBadge ? (
        <View
          accessibilityRole="text"
          className="rounded-full px-3 py-2"
          style={{ backgroundColor: Colors.light.primary }}
        >
          <Text className="text-lg font-semibold text-white">Upgrade</Text>
        </View>
      ) : null}
    </View>
  );
}

