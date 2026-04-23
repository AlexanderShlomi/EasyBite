import { useEffect, useMemo, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { EBScreen } from "@/src/ui/EBScreen";
import { EBProgressBar } from "@/src/ui/EBProgressBar";
import { EBButton } from "@/src/ui/EBButton";
import { useAnalytics } from "@/src/analytics/analytics";
import { useOnboardingAnswers } from "@/src/features/onboarding/useOnboardingAnswers";
import { EBContainer } from "@/src/ui/EBContainer";
import { Colors } from "@/constants/theme";

export default function QuestionWeightScreen() {
  const { capture } = useAnalytics();
  const { ready, answers, update } = useOnboardingAnswers();
  const [value, setValue] = useState("");

  useEffect(() => {
    capture("onboarding_view", { screen: "question_weight" });
  }, [capture]);

  useEffect(() => {
    if (answers.weightKg) setValue(String(answers.weightKg));
  }, [answers.weightKg]);

  const parsed = useMemo(() => {
    const v = Number(value);
    if (!Number.isFinite(v)) return undefined;
    const kg = Math.round(v * 10) / 10;
    if (kg < 30 || kg > 250) return undefined;
    return kg;
  }, [value]);

  if (!ready) return null;

  return (
    <EBScreen>
      <View className="gap-4">
        <EBProgressBar step={4} total={4} accessibilityLabel="Step 4 of 4" />
        <EBContainer>
          <Text className="text-3xl font-semibold text-slate-900">What’s your weight?</Text>
          <Text className="mt-2 text-lg text-slate-700">
            This is only used to personalize targets. You’re always in control.
          </Text>
        </EBContainer>
      </View>

      <View className="mt-8 flex-1 gap-3">
        <EBContainer padded={false} className="overflow-hidden">
          <View className="px-5 pt-5">
            <Text className="text-lg font-semibold text-slate-900">Weight</Text>
          </View>
          <View className="px-5 pb-5 pt-3">
            <View className="flex-row items-center gap-3">
              <TextInput
                accessibilityLabel="Weight in kilograms"
                keyboardType="decimal-pad"
                inputMode="decimal"
                value={value}
                onChangeText={(t) => setValue(t.replace(/[^\d.]/g, "").slice(0, 5))}
                placeholder="72.5"
                placeholderTextColor="#64748B"
                className="min-h-14 flex-1 rounded-3xl px-4 text-lg text-slate-900"
                style={{ backgroundColor: Colors.light.surface }}
              />
              <Text className="text-lg font-semibold text-slate-900">kg</Text>
            </View>
            <Text className="mt-3 text-lg text-slate-700">If you prefer, you can update this later.</Text>
          </View>
        </EBContainer>
      </View>

      <View className="gap-3">
        <EBButton
          variant="ghost"
          analyticsEvent="tap_secondary"
          analyticsProps={{ screen: "question_weight", action: "back" }}
          onPress={() => router.back()}
        >
          Back
        </EBButton>
        <EBButton
          disabled={!parsed}
          analyticsProps={{ screen: "question_weight", action: "continue_to_auth" }}
          onPress={async () => {
            if (!parsed) return;
            capture("onboarding_answered", { question: "weightKg", value: parsed });
            await update({ weightKg: parsed });
            router.push("/(onboarding)/auth");
          }}
        >
          Continue
        </EBButton>
      </View>
    </EBScreen>
  );
}

