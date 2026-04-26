import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { EBScreen } from "@/src/ui/EBScreen";
import { EBButton } from "@/src/ui/EBButton";
import { useAnalytics } from "@/src/analytics/analytics";
import { CARE_FACTORS } from "@/src/features/onboarding/careFactorsMock";
import { useOnboardingAnswers } from "@/src/features/onboarding/useOnboardingAnswers";
import { setOnboardingDone } from "@/src/features/onboarding/onboardingStorage";
import { Colors, Palette } from "@/constants/theme";

function toneStyle(tone: "blue" | "green" | "yellow", selected: boolean) {
  const bg =
    tone === "blue"
      ? Palette.blue[50]
      : tone === "green"
        ? Palette.green[50]
        : Palette.yellow[50];
  const border =
    tone === "blue"
      ? Palette.blue[200]
      : tone === "green"
        ? Palette.green[200]
        : Palette.yellow[200];
  return {
    backgroundColor: selected ? Colors.light.surface2 : bg,
    borderColor: selected ? Colors.light.primary : border,
  } as const;
}

function Badge({ rank }: { rank: 1 | 2 | 3 }) {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      className="absolute top-3 right-3 min-h-8 min-w-8 items-center justify-center rounded-full bg-slate-900 px-2"
    >
      <Text className="text-lg font-semibold text-white">{rank}</Text>
    </View>
  );
}

export default function PreferencesScreen() {
  const { capture } = useAnalytics();
  const { ready, answers, update } = useOnboardingAnswers();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    capture("onboarding_view", { screen: "preferences" });
  }, [capture]);

  const selected = answers.careFactorIds ?? [];
  const ranks = useMemo(() => {
    const map = new Map<string, 1 | 2 | 3>();
    selected.slice(0, 3).forEach((id, idx) => map.set(id, (idx + 1) as 1 | 2 | 3));
    return map;
  }, [selected]);

  const groups = useMemo(() => {
    const core = CARE_FACTORS.filter((f) => f.category === "core");
    const micro = CARE_FACTORS.filter((f) => f.category === "micro");
    const functional = CARE_FACTORS.filter((f) => f.category === "functional");
    return { core, micro, functional };
  }, []);

  const toggle = async (id: string) => {
    const exists = selected.includes(id);
    const next = exists ? selected.filter((x) => x !== id) : selected.length >= 3 ? selected : [...selected, id];
    const prevented = !exists && selected.length >= 3;
    capture("tap_secondary", {
      screen: "preferences",
      action: "toggle_factor",
      id,
      selected: !exists,
      prevented,
    });
    await update({ careFactorIds: next });
  };

  if (!ready) return null;

  return (
    <EBScreen padded={false}>
      <ScrollView
        className="flex-1 dark:bg-[#0B1220]"
        style={{ backgroundColor: Colors.light.background }}
        contentContainerClassName="px-5 py-4"
        keyboardShouldPersistTaps="handled"
      >
        <Text className="mt-6 text-3xl font-semibold text-right" style={{ color: Colors.light.text }}>
          על מה תרצו להתמקד?
        </Text>
        <Text className="mt-3 text-lg text-right" style={{ color: Colors.light.textMuted }}>
          סמנו עד 3 עדיפויות. נשמור על זה פשוט, תומך ומבוסס על מאכלים שאתם כבר נהנים מהם.
        </Text>

        <View
          className="mt-6 rounded-3xl border p-4"
          style={{ backgroundColor: Colors.light.surface, borderColor: Colors.light.border }}
        >
          <Text className="text-lg font-semibold text-right" style={{ color: Colors.light.text }}>
            שלושת המובילים שלכם
          </Text>
          <Text className="mt-1 text-lg text-right" style={{ color: Colors.light.textMuted }}>
            נבחרו: {selected.length}/3{selected.length === 3 ? " (נעול)" : ""}
          </Text>
        </View>

        <View className="mt-8">
          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-semibold text-right" style={{ color: Colors.light.text }}>
              עיקרי הליבה
            </Text>
            <EBButton
              variant="ghost"
              analyticsEvent="tap_link"
              analyticsProps={{ screen: "preferences", action: expanded ? "collapse_all" : "see_all" }}
              onPress={() => setExpanded((v) => !v)}
            >
              {expanded ? "פחות קטגוריות" : "כל הקטגוריות"}
            </EBButton>
          </View>
          <Text className="mt-1 text-lg text-right" style={{ color: Colors.light.textMuted }}>
            הבסיס בעל ההשפעה הגבוהה ביותר ליום־יום.
          </Text>

          <View className="mt-3 flex-row flex-wrap gap-3">
            {groups.core.map((f) => {
              const isSelected = selected.includes(f.id);
              const rank = ranks.get(f.id);
              return (
                <Pressable
                  key={f.id}
                  accessibilityRole="button"
                  accessibilityLabel={`${f.title}. ${rank ? `עדיפות ${rank}` : isSelected ? "נבחר" : "לא נבחר"}.`}
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => toggle(f.id)}
                  className="relative min-h-20 w-[48%] rounded-3xl border p-4"
                  style={toneStyle(f.tone, isSelected)}
                >
                  {rank ? <Badge rank={rank} /> : null}
                  <Text className="text-lg font-semibold" style={{ color: Colors.light.text }}>
                    {f.title}
                  </Text>
                  <Text className="mt-1 text-lg text-right" style={{ color: Colors.light.textMuted }}>
                    {f.description}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {expanded ? (
          <>
            <View className="mt-8">
              <Text className="text-xl font-semibold text-right" style={{ color: Colors.light.text }}>
                ויטמינים ומינרלים
              </Text>
              <Text className="mt-1 text-lg text-right" style={{ color: Colors.light.textMuted }}>
                רכיבים שתומכים באנרגיה, עצמות ועוד.
              </Text>
              <View className="mt-3 flex-row flex-wrap gap-3">
                {groups.micro.map((f) => {
                  const isSelected = selected.includes(f.id);
                  const rank = ranks.get(f.id);
                  return (
                    <Pressable
                      key={f.id}
                      accessibilityRole="button"
                      accessibilityLabel={`${f.title}. ${rank ? `עדיפות ${rank}` : isSelected ? "נבחר" : "לא נבחר"}.`}
                      accessibilityState={{ selected: isSelected }}
                      onPress={() => toggle(f.id)}
                      className="relative min-h-20 w-[48%] rounded-3xl border p-4"
                      style={toneStyle(f.tone, isSelected)}
                    >
                      {rank ? <Badge rank={rank} /> : null}
                      <Text className="text-lg font-semibold" style={{ color: Colors.light.text }}>
                        {f.title}
                      </Text>
                      <Text className="mt-1 text-lg text-right" style={{ color: Colors.light.textMuted }}>
                        {f.description}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View className="mt-8">
              <Text className="text-xl font-semibold text-right" style={{ color: Colors.light.text }}>
                רכיבים פונקציונליים
              </Text>
              <Text className="mt-1 text-lg text-right" style={{ color: Colors.light.textMuted }}>
                תרכובות מועילות שנמצאות לרוב בצמחים ושומנים טובים.
              </Text>
              <View className="mt-3 flex-row flex-wrap gap-3">
                {groups.functional.map((f) => {
                  const isSelected = selected.includes(f.id);
                  const rank = ranks.get(f.id);
                  return (
                    <Pressable
                      key={f.id}
                      accessibilityRole="button"
                      accessibilityLabel={`${f.title}. ${rank ? `עדיפות ${rank}` : isSelected ? "נבחר" : "לא נבחר"}.`}
                      accessibilityState={{ selected: isSelected }}
                      onPress={() => toggle(f.id)}
                      className="relative min-h-20 w-[48%] rounded-3xl border p-4"
                      style={toneStyle(f.tone, isSelected)}
                    >
                      {rank ? <Badge rank={rank} /> : null}
                      <Text className="text-lg font-semibold" style={{ color: Colors.light.text }}>
                        {f.title}
                      </Text>
                      <Text className="mt-1 text-lg text-right" style={{ color: Colors.light.textMuted }}>
                        {f.description}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </>
        ) : null}

        <View className="mt-10 gap-3 pb-8">
          <EBButton
            disabled={selected.length === 0}
            analyticsProps={{ screen: "preferences", action: "finish", selectedCount: selected.length }}
            onPress={async () => {
              capture("onboarding_completed", { selectedCount: selected.length });
              await setOnboardingDone(true);
              router.replace("/(tabs)/home");
            }}
          >
            המשך לדף הבית
          </EBButton>
          <EBButton
            variant="ghost"
            analyticsEvent="tap_secondary"
            analyticsProps={{ screen: "preferences", action: "back" }}
            onPress={() => router.back()}
          >
            חזרה
          </EBButton>
        </View>
      </ScrollView>
    </EBScreen>
  );
}

