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
import { Colors } from "@/constants/theme";

const OPTIONS: Array<{ id: Gender; title: string; description: string }> = [
  { id: "female", title: "אישה", description: "עוזר לנו להתאים הערכות בעדינות." },
  { id: "male", title: "גבר", description: "עוזר לנו להתאים הערכות בעדינות." },
  { id: "non_binary", title: "לא־בינארי/ת", description: "נשמור על גמישות." },
  { id: "prefer_not_say", title: "מעדיף/ה לא לציין", description: "זה לגמרי בסדר." },
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
        <EBProgressBar step={1} total={4} accessibilityLabel="שלב 1 מתוך 4" />
        <Text className="text-3xl font-semibold text-right" style={{ color: Colors.light.text }}>
          איך תרצו להזדהות?
        </Text>
        <Text className="text-lg text-right" style={{ color: Colors.light.textMuted }}>
          זה עוזר לנו לכמה התאמות בסיסיות. אפשר לשנות בהמשך.
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
          חזרה
        </EBButton>
        <EBButton
          disabled={!answers.gender}
          analyticsProps={{ screen: "question_gender", action: "continue" }}
          onPress={() => router.push("/(onboarding)/question-birth-year")}
        >
          המשך
        </EBButton>
      </View>
    </EBScreen>
  );
}

