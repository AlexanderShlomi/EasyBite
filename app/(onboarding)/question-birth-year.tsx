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

export default function QuestionBirthYearScreen() {
  const { capture } = useAnalytics();
  const { ready, answers, update } = useOnboardingAnswers();
  const [value, setValue] = useState("");

  useEffect(() => {
    capture("onboarding_view", { screen: "question_birth_year" });
  }, [capture]);

  useEffect(() => {
    if (answers.birthYear) setValue(String(answers.birthYear));
  }, [answers.birthYear]);

  const parsed = useMemo(() => {
    const v = Number(value);
    if (!Number.isFinite(v)) return undefined;
    const year = Math.floor(v);
    const now = new Date().getFullYear();
    if (year < 1900 || year > now) return undefined;
    return year;
  }, [value]);

  if (!ready) return null;

  return (
    <EBScreen>
      <View className="gap-4">
        <EBProgressBar step={2} total={4} accessibilityLabel="Step 2 of 4" />
        <EBContainer>
          <Text className="text-3xl font-semibold text-slate-900">What year were you born?</Text>
          <Text className="mt-2 text-lg text-slate-700">We use this to personalize targets gently.</Text>
        </EBContainer>
      </View>

      <View className="mt-8 flex-1">
        <EBContainer padded={false} className="overflow-hidden">
          <View className="px-5 pt-5">
            <Text className="text-lg font-semibold text-slate-900">Birth year</Text>
          </View>
          <View className="px-5 pb-5 pt-3">
            <TextInput
              accessibilityLabel="Birth year"
              keyboardType="number-pad"
              inputMode="numeric"
              value={value}
              onChangeText={(t) => setValue(t.replace(/[^\d]/g, "").slice(0, 4))}
              placeholder="e.g. 1962"
              placeholderTextColor="#64748B"
              className="min-h-14 rounded-3xl px-4 text-lg text-slate-900"
              style={{ backgroundColor: Colors.light.surface }}
            />
            <Text className="mt-3 text-lg text-slate-700">Tip: If you’re not sure, a close estimate is fine.</Text>
          </View>
        </EBContainer>
      </View>

      <View className="gap-3">
        <EBButton
          variant="ghost"
          analyticsEvent="tap_secondary"
          analyticsProps={{ screen: "question_birth_year", action: "back" }}
          onPress={() => router.back()}
        >
          Back
        </EBButton>
        <EBButton
          disabled={!parsed}
          analyticsProps={{ screen: "question_birth_year", action: "continue" }}
          onPress={async () => {
            if (!parsed) return;
            capture("onboarding_answered", { question: "birthYear", value: parsed });
            await update({ birthYear: parsed });
            router.push("/(onboarding)/question-height");
          }}
        >
          Continue
        </EBButton>
      </View>
    </EBScreen>
  );
}

