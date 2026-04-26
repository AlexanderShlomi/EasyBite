import { View } from "react-native";
import { Colors } from "@/constants/theme";

type Props = {
  step: number;
  total: number;
  accessibilityLabel?: string;
};

export function EBProgressBar({ step, total, accessibilityLabel }: Props) {
  const safeTotal = Math.max(1, total);
  const safeStep = Math.min(Math.max(0, step), safeTotal);
  const pct = Math.round((safeStep / safeTotal) * 100);

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel ?? "התקדמות בהרשמה"}
      accessibilityValue={{ min: 0, max: 100, now: pct, text: `${pct}%` }}
      className="h-3 w-full overflow-hidden rounded-full border"
      style={{ backgroundColor: Colors.light.surface, borderColor: Colors.light.border }}
    >
      <View className="h-full" style={{ width: `${pct}%`, backgroundColor: Colors.light.primary }} />
    </View>
  );
}

