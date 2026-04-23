import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Palette } from "@/constants/theme";
import type { Insight } from "@/src/features/insights/mockInsights";

function toneBg(tone: Insight["tone"]) {
  if (tone === "success") return Palette.green[50];
  if (tone === "warm") return Palette.yellow[50];
  return Palette.blue[50];
}

function toneBorder(tone: Insight["tone"]) {
  if (tone === "success") return Palette.green[200];
  if (tone === "warm") return Palette.yellow[200];
  return Palette.blue[200];
}

export function InsightsCard({ insight }: { insight: Insight }) {
  return (
    <View
      accessibilityRole="summary"
      className="rounded-3xl border p-6 shadow-card"
      style={{
        backgroundColor: toneBg(insight.tone),
        borderColor: toneBorder(insight.tone),
      }}
    >
      <View className="flex-row items-start justify-between gap-4">
        <View className="flex-1">
          <Text className="text-2xl font-semibold text-slate-900">{insight.title}</Text>
          <Text className="mt-2 text-lg text-slate-800">{insight.body}</Text>
        </View>
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          className="h-12 w-12 items-center justify-center rounded-2xl"
          style={{ backgroundColor: Colors.light.surface }}
        >
          <Ionicons name="sparkles-outline" size={24} color={Colors.light.primary} />
        </View>
      </View>

      <View className="mt-4 h-[3px] w-14 rounded-full" style={{ backgroundColor: Colors.light.primary }} />
    </View>
  );
}

