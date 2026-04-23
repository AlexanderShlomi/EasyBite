import { useEffect } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { EBScreen } from "@/src/ui/EBScreen";
import { EBButton } from "@/src/ui/EBButton";
import { useAnalytics } from "@/src/analytics/analytics";

export default function Intro2Screen() {
  const { capture } = useAnalytics();

  useEffect(() => {
    capture("onboarding_view", { screen: "intro_2" });
  }, [capture]);

  return (
    <EBScreen>
      <View className="flex-1">
        <Text className="mt-6 text-3xl font-semibold text-slate-900 dark:text-white">
          No diet changes—just better awareness
        </Text>
        <Text className="mt-3 text-lg text-slate-700 dark:text-slate-200">
          Keep your routines. Keep your favorites. Easy Bite helps you understand the nutrition behind what you already eat.
        </Text>

        <View className="mt-8 rounded-3xl bg-[#FFFBEB] p-5">
          <Text className="text-xl font-semibold text-slate-900">Quick setup, gentle guidance</Text>
          <Text className="mt-2 text-lg text-slate-800">
            Answer a few quick questions. Then we’ll show supportive insights—like celebrating nutrients you’ve already hit.
          </Text>
        </View>
      </View>

      <View className="gap-3">
        <EBButton
          variant="ghost"
          analyticsEvent="tap_secondary"
          analyticsProps={{ screen: "intro_2", action: "back" }}
          onPress={() => router.back()}
        >
          Back
        </EBButton>
        <EBButton
          analyticsEvent="tap_primary"
          analyticsProps={{ screen: "intro_2", action: "continue" }}
          onPress={() => router.push("/(onboarding)/intro-3")}
        >
          Continue
        </EBButton>
      </View>
    </EBScreen>
  );
}

