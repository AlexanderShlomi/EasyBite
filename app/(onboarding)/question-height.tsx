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

export default function QuestionHeightScreen() {
  const { capture } = useAnalytics();
  const { ready, answers, update } = useOnboardingAnswers();
  const [value, setValue] = useState("");

  useEffect(() => {
    capture("onboarding_view", { screen: "question_height" });
  }, [capture]);

  useEffect(() => {
    if (answers.heightCm) setValue(String(answers.heightCm));
  }, [answers.heightCm]);

  const parsed = useMemo(() => {
    const v = Number(value);
    if (!Number.isFinite(v)) return undefined;
    const cm = Math.floor(v);
    if (cm < 100 || cm > 230) return undefined;
    return cm;
  }, [value]);

  if (!ready) return null;

  return (
    <EBScreen>
      <View className="gap-4">
        <EBProgressBar step={3} total={4} accessibilityLabel="Step 3 of 4" />
        <EBContainer>
          <Text className="text-3xl font-semibold text-slate-900">What’s your height?</Text>
          <Text className="mt-2 text-lg text-slate-700">Just a rough number is fine.</Text>
        </EBContainer>
      </View>

      <View className="mt-8 flex-1 gap-3">
        <EBContainer padded={false} className="overflow-hidden">
          <View className="px-5 pt-5">
            <Text className="text-lg font-semibold text-slate-900">Height</Text>
          </View>
          <View className="px-5 pb-5 pt-3">
            <View className="flex-row items-center gap-3">
              <TextInput
                accessibilityLabel="Height in centimeters"
                keyboardType="number-pad"
                inputMode="numeric"
                value={value}
                onChangeText={(t) => setValue(t.replace(/[^\d]/g, "").slice(0, 3))}
                placeholder="170"
                placeholderTextColor="#64748B"
                className="min-h-14 flex-1 rounded-3xl px-4 text-lg text-slate-900"
                style={{ backgroundColor: Colors.light.surface }}
              />
              <Text className="text-lg font-semibold text-slate-900">cm</Text>
            </View>
            <Text className="mt-3 text-lg text-slate-700">We’ll use this with weight to personalize targets.</Text>
          </View>
        </EBContainer>
      </View>

      <View className="gap-3">
        <EBButton
          variant="ghost"
          analyticsEvent="tap_secondary"
          analyticsProps={{ screen: "question_height", action: "back" }}
          onPress={() => router.back()}
        >
          Back
        </EBButton>
        <EBButton
          disabled={!parsed}
          analyticsProps={{ screen: "question_height", action: "continue" }}
          onPress={async () => {
            if (!parsed) return;
            capture("onboarding_answered", { question: "heightCm", value: parsed });
            await update({ heightCm: parsed });
            router.push("/(onboarding)/question-weight");
          }}
        >
          Continue
        </EBButton>
      </View>
    </EBScreen>
  );
}

