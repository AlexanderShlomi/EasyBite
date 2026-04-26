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

export default function QuestionHeightScreen() {
  const { capture } = useAnalytics();
  const { ready, answers, update } = useOnboardingAnswers();
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [cmValue, setCmValue] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");

  useEffect(() => {
    capture("onboarding_view", { screen: "question_height" });
  }, [capture]);

  useEffect(() => {
    const nextUnit = answers.unitSystem ?? "metric";
    setUnit(nextUnit);
    if (answers.heightCm) {
      setCmValue(String(answers.heightCm));
      const totalIn = Math.round(answers.heightCm / 2.54);
      setFeet(String(Math.floor(totalIn / 12)));
      setInches(String(totalIn % 12));
    }
  }, [answers.heightCm]);

  const parsedCm = useMemo(() => {
    if (unit === "metric") {
      const v = Number(cmValue);
      if (!Number.isFinite(v)) return undefined;
      const cm = Math.floor(v);
      if (cm < 100 || cm > 230) return undefined;
      return cm;
    }
    const f = Number(feet);
    const i = Number(inches);
    if (!Number.isFinite(f) || !Number.isFinite(i)) return undefined;
    const safeF = Math.floor(f);
    const safeI = Math.floor(i);
    if (safeF < 3 || safeF > 7) return undefined;
    if (safeI < 0 || safeI > 11) return undefined;
    const totalIn = safeF * 12 + safeI;
    const cm = Math.round(totalIn * 2.54);
    if (cm < 100 || cm > 230) return undefined;
    return cm;
  }, [cmValue, feet, inches, unit]);

  if (!ready) return null;

  return (
    <EBScreen>
      <View className="gap-4">
        <EBProgressBar step={3} total={4} accessibilityLabel="שלב 3 מתוך 4" />
        <EBContainer>
          <Text className="text-3xl font-semibold text-right" style={{ color: Colors.light.text }}>
            מה הגובה שלכם?
          </Text>
          <Text className="mt-2 text-lg text-right" style={{ color: Colors.light.textMuted }}>
            גם מספר משוער זה מעולה.
          </Text>
        </EBContainer>
      </View>

      <View className="mt-8 flex-1 gap-3">
        <EBContainer padded={false} className="overflow-hidden">
          <View className="px-5 pt-5">
            <Text className="text-lg font-semibold text-right" style={{ color: Colors.light.text }}>
              גובה
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
                  ס"מ
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
                  ft/in
                </Text>
              </Pressable>
            </View>

            {unit === "metric" ? (
              <View className="mt-4 flex-row items-center gap-3">
                <TextInput
                  accessibilityLabel="Height in centimeters"
                  keyboardType="number-pad"
                  inputMode="numeric"
                  value={cmValue}
                  onChangeText={(t) => setCmValue(t.replace(/[^\d]/g, "").slice(0, 3))}
                  placeholder="170"
                  placeholderTextColor={Colors.light.textMuted}
                  className="min-h-14 flex-1 rounded-3xl px-4 text-lg text-right"
                  style={{ backgroundColor: Colors.light.surface, color: Colors.light.text }}
                />
                <Text className="text-lg font-semibold" style={{ color: Colors.light.text }}>
                  ס״מ
                </Text>
              </View>
            ) : (
              <View className="mt-4 flex-row items-center gap-3">
                <TextInput
                  accessibilityLabel="Height in feet"
                  keyboardType="number-pad"
                  inputMode="numeric"
                  value={feet}
                  onChangeText={(t) => setFeet(t.replace(/[^\d]/g, "").slice(0, 1))}
                  placeholder="5"
                  placeholderTextColor={Colors.light.textMuted}
                  className="min-h-14 flex-1 rounded-3xl px-4 text-lg text-right"
                  style={{ backgroundColor: Colors.light.surface, color: Colors.light.text }}
                />
                <Text className="text-lg font-semibold" style={{ color: Colors.light.text }}>
                  ft
                </Text>
                <TextInput
                  accessibilityLabel="Height in inches"
                  keyboardType="number-pad"
                  inputMode="numeric"
                  value={inches}
                  onChangeText={(t) => setInches(t.replace(/[^\d]/g, "").slice(0, 2))}
                  placeholder="7"
                  placeholderTextColor={Colors.light.textMuted}
                  className="min-h-14 flex-1 rounded-3xl px-4 text-lg text-right"
                  style={{ backgroundColor: Colors.light.surface, color: Colors.light.text }}
                />
                <Text className="text-lg font-semibold" style={{ color: Colors.light.text }}>
                  in
                </Text>
              </View>
            )}

            <Text className="mt-3 text-lg text-right" style={{ color: Colors.light.textMuted }}>
              נשתמש בזה יחד עם המשקל כדי להתאים יעדים.
            </Text>
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
          חזרה
        </EBButton>
        <EBButton
          disabled={!parsedCm}
          analyticsProps={{ screen: "question_height", action: "continue" }}
          onPress={async () => {
            if (!parsedCm) return;
            capture("onboarding_answered", { question: "heightCm", value: parsedCm });
            await update({ heightCm: parsedCm });
            router.push("/(onboarding)/question-weight");
          }}
        >
          המשך
        </EBButton>
      </View>
    </EBScreen>
  );
}

