import { useEffect } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { EBScreen } from "@/src/ui/EBScreen";
import { EBProgressBar } from "@/src/ui/EBProgressBar";
import { EBOptionCard } from "@/src/ui/EBOptionCard";
import { EBButton } from "@/src/ui/EBButton";
import { useAnalytics } from "@/src/analytics/analytics";
import { useOnboardingAnswers } from "@/src/features/onboarding/useOnboardingAnswers";
import type { Gender } from "@/src/features/onboarding/onboardingSchema";

const OPTIONS: Array<{ id: Gender; title: string; description: string }> = [
  { id: "female", title: "Female", description: "For nutrition estimates." },
  { id: "male", title: "Male", description: "For nutrition estimates." },
  { id: "non_binary", title: "Non‑binary", description: "We’ll keep things flexible." },
  { id: "prefer_not_say", title: "Prefer not to say", description: "That’s totally okay." },
];

export default function QuestionGenderScreen() {
  const { capture } = useAnalytics();
  const { ready, answers, update } = useOnboardingAnswers();

  useEffect(() => {
    capture("onboarding_view", { screen: "question_gender" });
  }, [capture]);

  if (!ready) return null;

  return (
    <EBScreen>
      <View className="gap-4">
        <EBProgressBar step={1} total={4} accessibilityLabel="Step 1 of 4" />
        <Text className="text-3xl font-semibold text-slate-900 dark:text-white">How do you identify?</Text>
        <Text className="text-lg text-slate-700 dark:text-slate-200">
          This helps with a few baseline nutrition calculations. You can change it later.
        </Text>
      </View>

      <View className="mt-6 flex-1 gap-3">
        {OPTIONS.map((o) => (
          <EBOptionCard
            key={o.id}
            title={o.title}
            description={o.description}
            selected={answers.gender === o.id}
            analyticsProps={{ screen: "question_gender", action: "select_gender", value: o.id }}
            onPress={async () => {
              capture("onboarding_answered", { question: "gender", value: o.id });
              await update({ gender: o.id });
            }}
          />
        ))}
      </View>

      <View className="gap-3">
        <EBButton
          variant="ghost"
          analyticsEvent="tap_secondary"
          analyticsProps={{ screen: "question_gender", action: "back" }}
          onPress={() => router.back()}
        >
          Back
        </EBButton>
        <EBButton
          disabled={!answers.gender}
          analyticsProps={{ screen: "question_gender", action: "continue" }}
          onPress={() => router.push("/(onboarding)/question-birth-year")}
        >
          Continue
        </EBButton>
      </View>
    </EBScreen>
  );
}

