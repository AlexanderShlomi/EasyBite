import { useEffect } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { EBScreen } from "@/src/ui/EBScreen";
import { EBButton } from "@/src/ui/EBButton";
import { useAnalytics } from "@/src/analytics/analytics";

export default function Intro3Screen() {
  const { capture } = useAnalytics();

  useEffect(() => {
    capture("onboarding_view", { screen: "intro_3" });
  }, [capture]);

  return (
    <EBScreen>
      <View className="flex-1">
        <View className="mt-6 rounded-3xl bg-[#EFF8FF] p-5">
          <Text className="text-2xl font-semibold text-slate-900">No diet changes required</Text>
          <Text className="mt-3 text-lg text-slate-800">
            Eat the foods you actually love. We’ll help you see what they’re doing for you—so you can make better choices
            with confidence.
          </Text>
        </View>

        <View className="mt-6 rounded-3xl bg-[#ECFDF5] p-5">
          <Text className="text-xl font-semibold text-slate-900">Tools and knowledge, not judgment</Text>
          <Text className="mt-2 text-lg text-slate-800">
            We’re here to support awareness—not to judge, lecture, or “fix” you. Small insights add up.
          </Text>
        </View>
      </View>

      <View className="gap-3">
        <EBButton
          variant="ghost"
          analyticsEvent="tap_secondary"
          analyticsProps={{ screen: "intro_3", action: "back" }}
          onPress={() => router.back()}
        >
          Back
        </EBButton>
        <EBButton
          analyticsProps={{ screen: "intro_3", action: "get_started" }}
          onPress={() => router.push("/(onboarding)/question-gender")}
        >
          Get Started
        </EBButton>
      </View>
    </EBScreen>
  );
}

