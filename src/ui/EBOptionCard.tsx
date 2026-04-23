import { PropsWithChildren } from "react";
import { Pressable, PressableProps, Text, View } from "react-native";
import { useAnalytics } from "@/src/analytics/analytics";
import { Colors } from "@/constants/theme";

type Props = PropsWithChildren<
  Omit<PressableProps, "onPress"> & {
    title: string;
    description?: string;
    selected?: boolean;
    onPress: () => void;
    analyticsProps: Record<string, unknown>;
  }
>;

export function EBOptionCard({
  title,
  description,
  selected,
  onPress,
  analyticsProps,
  accessibilityLabel,
  ...rest
}: Props) {
  const { capture } = useAnalytics();
  const border = selected ? Colors.light.primary : Colors.light.border;
  const bg = selected ? Colors.light.surface2 : "#FFFFFF";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ selected: Boolean(selected) }}
      onPress={() => {
        capture("tap_secondary", analyticsProps);
        onPress();
      }}
      className="min-h-14 rounded-3xl border p-5 shadow-card"
      style={{
        borderColor: border,
        backgroundColor: bg,
      }}
      {...rest}
    >
      <Text className="text-lg font-semibold text-slate-900">{title}</Text>
      {description ? (
        <Text className="mt-1 text-lg text-slate-700">{description}</Text>
      ) : (
        <View />
      )}
    </Pressable>
  );
}

