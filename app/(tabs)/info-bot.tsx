import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { EBScreen } from "@/src/ui/EBScreen";
import { EBButton } from "@/src/ui/EBButton";
import { useAnalytics } from "@/src/analytics/analytics";
import { EBContainer } from "@/src/ui/EBContainer";
import { Colors } from "@/constants/theme";

export default function InfoBotScreen() {
  const { capture } = useAnalytics();
  const [q, setQ] = useState("");

  useEffect(() => {
    capture("onboarding_view", { screen: "info_bot" });
  }, [capture]);

  return (
    <EBScreen>
      <EBContainer>
        <Text className="text-3xl font-semibold text-slate-900 text-right">בוט מידע</Text>
        <Text className="mt-3 text-lg text-slate-700 text-right">
          שאלו כל שאלה תזונתית בשפה פשוטה. נענה בצורה תומכת ופרקטית.
        </Text>
      </EBContainer>

      <View className="mt-6 gap-3">
        <EBContainer padded={false} className="overflow-hidden">
          <TextInput
            accessibilityLabel="שאלו שאלה"
            placeholder="למשל: האם B12 חשוב לאנרגיה?"
            placeholderTextColor="#64748B"
            value={q}
            onChangeText={setQ}
            className="min-h-14 px-5 py-4 text-lg text-slate-900 text-right"
            style={{ backgroundColor: Colors.light.surface }}
          />
        </EBContainer>
        <EBButton
          disabled={q.trim().length === 0}
          analyticsProps={{ screen: "info_bot", action: "ask_question" }}
          onPress={() => {
            capture("tap_primary", { screen: "info_bot", action: "ask_question", length: q.trim().length });
            setQ("");
          }}
        >
          שאל/י
        </EBButton>
      </View>
    </EBScreen>
  );
}

