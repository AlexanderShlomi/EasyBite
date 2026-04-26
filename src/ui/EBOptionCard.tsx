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
  const bg = Colors.light.surface;
  const titleColor = Colors.light.text;
  const descColor = Colors.light.textMuted;

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
      <Text className="text-lg font-semibold" style={{ color: titleColor }}>
        {title}
      </Text>
      {description ? (
        <Text className="mt-1 text-lg" style={{ color: descColor }}>
          {description}
        </Text>
      ) : (
        <View />
      )}
    </Pressable>
  );
}

