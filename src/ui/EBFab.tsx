import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, A11ySizing } from "@/constants/theme";
import { useAnalytics } from "@/src/analytics/analytics";

type Props = {
  onPress: () => void;
  accessibilityLabel?: string;
  analyticsProps: Record<string, unknown>;
};

export function EBFab({ onPress, accessibilityLabel, analyticsProps }: Props) {
  const { capture } = useAnalytics();
  return (
    <View className="absolute bottom-24 left-0 right-0 items-center">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? "העלאת תמונת אוכל"}
        onPress={() => {
          capture("tap_primary", analyticsProps);
          onPress();
        }}
        className="items-center justify-center rounded-full"
        style={{
          width: A11ySizing.fabSize,
          height: A11ySizing.fabSize,
          backgroundColor: Colors.light.primary,
          shadowColor: "#000",
          shadowOpacity: 0.18,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 10 },
          elevation: 6,
        }}
      >
        <Ionicons name="camera-outline" size={28} color={Colors.light.text} />
      </Pressable>
    </View>
  );
}

