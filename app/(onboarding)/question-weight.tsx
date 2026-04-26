import { useEffect, useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
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
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [kgValue, setKgValue] = useState("");
  const [lbsValue, setLbsValue] = useState("");

  useEffect(() => {
    capture("onboarding_view", { screen: "question_weight" });
  }, [capture]);

  useEffect(() => {
    const nextUnit = answers.unitSystem ?? "metric";
    setUnit(nextUnit);
    if (answers.weightKg) {
      setKgValue(String(answers.weightKg));
      setLbsValue(String(Math.round(answers.weightKg * 2.20462)));
    }
  }, [answers.weightKg]);

  const parsedKg = useMemo(() => {
    if (unit === "metric") {
      const v = Number(kgValue);
      if (!Number.isFinite(v)) return undefined;
      const kg = Math.round(v * 10) / 10;
      if (kg < 30 || kg > 250) return undefined;
      return kg;
    }
    const v = Number(lbsValue);
    if (!Number.isFinite(v)) return undefined;
    const lbs = Math.round(v * 10) / 10;
    if (lbs < 66 || lbs > 551) return undefined;
    const kg = Math.round((lbs / 2.20462) * 10) / 10;
    if (kg < 30 || kg > 250) return undefined;
    return kg;
  }, [kgValue, lbsValue, unit]);

  if (!ready) return null;

  return (
    <EBScreen>
      <View className="gap-4">
        <EBProgressBar step={4} total={4} accessibilityLabel="שלב 4 מתוך 4" />
        <EBContainer>
          <Text className="text-3xl font-semibold text-right" style={{ color: Colors.light.text }}>
            מה המשקל שלכם?
          </Text>
          <Text className="mt-2 text-lg text-right" style={{ color: Colors.light.textMuted }}>
            זה משמש רק להתאמת יעדים. אתם תמיד בשליטה.
          </Text>
        </EBContainer>
      </View>

      <View className="mt-8 flex-1 gap-3">
        <EBContainer padded={false} className="overflow-hidden">
          <View className="px-5 pt-5">
            <Text className="text-lg font-semibold text-right" style={{ color: Colors.light.text }}>
              משקל
            </Text>
          </View>
          <View className="px-5 pb-5 pt-3">
            <View className="flex-row items-center gap-2">
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Metric units"
                accessibilityState={{ selected: unit === "metric" }}
                onPress={async () => {
                  setUnit("metric");
                  await update({ unitSystem: "metric" });
                }}
                className="min-h-14 flex-1 items-center justify-center rounded-3xl border"
                style={{
                  backgroundColor: unit === "metric" ? Colors.light.primary : Colors.light.surface,
                  borderColor: unit === "metric" ? Colors.light.primary : Colors.light.border,
                }}
              >
                <Text className="text-lg font-semibold" style={{ color: Colors.light.text }}>
                  ק"ג
                </Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Imperial units"
                accessibilityState={{ selected: unit === "imperial" }}
                onPress={async () => {
                  setUnit("imperial");
                  await update({ unitSystem: "imperial" });
                }}
                className="min-h-14 flex-1 items-center justify-center rounded-3xl border"
                style={{
                  backgroundColor: unit === "imperial" ? Colors.light.primary : Colors.light.surface,
                  borderColor: unit === "imperial" ? Colors.light.primary : Colors.light.border,
                }}
              >
                <Text className="text-lg font-semibold" style={{ color: Colors.light.text }}>
                  lbs
                </Text>
              </Pressable>
            </View>

            {unit === "metric" ? (
              <View className="mt-4 flex-row items-center gap-3">
                <TextInput
                  accessibilityLabel="Weight in kilograms"
                  keyboardType="decimal-pad"
                  inputMode="decimal"
                  value={kgValue}
                  onChangeText={(t) => setKgValue(t.replace(/[^\d.]/g, "").slice(0, 5))}
                  placeholder="72.5"
                  placeholderTextColor={Colors.light.textMuted}
                  className="min-h-14 flex-1 rounded-3xl px-4 text-lg text-right"
                  style={{ backgroundColor: Colors.light.surface, color: Colors.light.text }}
                />
                <Text className="text-lg font-semibold" style={{ color: Colors.light.text }}>
                  ק״ג
                </Text>
              </View>
            ) : (
              <View className="mt-4 flex-row items-center gap-3">
                <TextInput
                  accessibilityLabel="Weight in pounds"
                  keyboardType="decimal-pad"
                  inputMode="decimal"
                  value={lbsValue}
                  onChangeText={(t) => setLbsValue(t.replace(/[^\d.]/g, "").slice(0, 6))}
                  placeholder="160"
                  placeholderTextColor={Colors.light.textMuted}
                  className="min-h-14 flex-1 rounded-3xl px-4 text-lg text-right"
                  style={{ backgroundColor: Colors.light.surface, color: Colors.light.text }}
                />
                <Text className="text-lg font-semibold" style={{ color: Colors.light.text }}>
                  lbs
                </Text>
              </View>
            )}

            <Text className="mt-3 text-lg text-right" style={{ color: Colors.light.textMuted }}>
              אם תרצו — תוכלו לעדכן את זה אחר כך.
            </Text>
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
          חזרה
        </EBButton>
        <EBButton
          disabled={!parsedKg}
          analyticsProps={{ screen: "question_weight", action: "continue_to_auth" }}
          onPress={async () => {
            if (!parsedKg) return;
            capture("onboarding_answered", { question: "weightKg", value: parsedKg });
            await update({ weightKg: parsedKg });
            router.push("/(onboarding)/auth");
          }}
        >
          המשך
        </EBButton>
      </View>
    </EBScreen>
  );
}

