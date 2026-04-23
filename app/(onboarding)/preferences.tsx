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
        className="flex-1 bg-white dark:bg-[#0B1220]"
        contentContainerClassName="px-5 py-4"
        keyboardShouldPersistTaps="handled"
      >
        <Text className="mt-6 text-3xl font-semibold text-slate-900 dark:text-white">What do you want to focus on?</Text>
        <Text className="mt-3 text-lg text-slate-700 dark:text-slate-200">
          Choose your top 3 priorities. We’ll keep your plan simple, supportive, and built around foods you already enjoy.
        </Text>

        <View className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <Text className="text-lg font-semibold text-slate-900">Your Top 3</Text>
          <Text className="mt-1 text-lg text-slate-700">
            Selected: {selected.length}/3{selected.length === 3 ? " (locked in)" : ""}
          </Text>
        </View>

        <View className="mt-8">
          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-semibold text-slate-900 dark:text-white">Core Essentials</Text>
            <EBButton
              variant="ghost"
              analyticsEvent="tap_link"
              analyticsProps={{ screen: "preferences", action: expanded ? "collapse_all" : "see_all" }}
              onPress={() => setExpanded((v) => !v)}
            >
              {expanded ? "Show less" : "See all categories"}
            </EBButton>
          </View>
          <Text className="mt-1 text-lg text-slate-700 dark:text-slate-200">The highest-impact basics to feel better day to day.</Text>

          <View className="mt-3 flex-row flex-wrap gap-3">
            {groups.core.map((f) => {
              const isSelected = selected.includes(f.id);
              const rank = ranks.get(f.id);
              return (
                <Pressable
                  key={f.id}
                  accessibilityRole="button"
                  accessibilityLabel={`${f.title}. ${rank ? `Priority ${rank}` : isSelected ? "Selected" : "Not selected"}.`}
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => toggle(f.id)}
                  className="relative min-h-20 w-[48%] rounded-3xl border p-4"
                  style={toneStyle(f.tone, isSelected)}
                >
                  {rank ? <Badge rank={rank} /> : null}
                  <Text className="text-lg font-semibold text-slate-900">{f.title}</Text>
                  <Text className="mt-1 text-lg text-slate-700">{f.description}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {expanded ? (
          <>
            <View className="mt-8">
              <Text className="text-xl font-semibold text-slate-900 dark:text-white">Micro‑Nutrients</Text>
              <Text className="mt-1 text-lg text-slate-700 dark:text-slate-200">
                Vitamins and minerals that support energy, bones, and more.
              </Text>
              <View className="mt-3 flex-row flex-wrap gap-3">
                {groups.micro.map((f) => {
                  const isSelected = selected.includes(f.id);
                  const rank = ranks.get(f.id);
                  return (
                    <Pressable
                      key={f.id}
                      accessibilityRole="button"
                      accessibilityLabel={`${f.title}. ${rank ? `Priority ${rank}` : isSelected ? "Selected" : "Not selected"}.`}
                      accessibilityState={{ selected: isSelected }}
                      onPress={() => toggle(f.id)}
                      className="relative min-h-20 w-[48%] rounded-3xl border p-4"
                      style={toneStyle(f.tone, isSelected)}
                    >
                      {rank ? <Badge rank={rank} /> : null}
                      <Text className="text-lg font-semibold text-slate-900">{f.title}</Text>
                      <Text className="mt-1 text-lg text-slate-700">{f.description}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View className="mt-8">
              <Text className="text-xl font-semibold text-slate-900 dark:text-white">Functional & Phytochemicals</Text>
              <Text className="mt-1 text-lg text-slate-700 dark:text-slate-200">
                Helpful compounds often found in plants and healthy fats.
              </Text>
              <View className="mt-3 flex-row flex-wrap gap-3">
                {groups.functional.map((f) => {
                  const isSelected = selected.includes(f.id);
                  const rank = ranks.get(f.id);
                  return (
                    <Pressable
                      key={f.id}
                      accessibilityRole="button"
                      accessibilityLabel={`${f.title}. ${rank ? `Priority ${rank}` : isSelected ? "Selected" : "Not selected"}.`}
                      accessibilityState={{ selected: isSelected }}
                      onPress={() => toggle(f.id)}
                      className="relative min-h-20 w-[48%] rounded-3xl border p-4"
                      style={toneStyle(f.tone, isSelected)}
                    >
                      {rank ? <Badge rank={rank} /> : null}
                      <Text className="text-lg font-semibold text-slate-900">{f.title}</Text>
                      <Text className="mt-1 text-lg text-slate-700">{f.description}</Text>
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
            Continue to Dashboard
          </EBButton>
          <EBButton
            variant="ghost"
            analyticsEvent="tap_secondary"
            analyticsProps={{ screen: "preferences", action: "back" }}
            onPress={() => router.back()}
          >
            Back
          </EBButton>
        </View>
      </ScrollView>
    </EBScreen>
  );
}

