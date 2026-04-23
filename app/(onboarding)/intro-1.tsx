import { useEffect } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { EBScreen } from "@/src/ui/EBScreen";
import { EBButton } from "@/src/ui/EBButton";
import { useAnalytics } from "@/src/analytics/analytics";

export default function Intro1Screen() {
  const { capture } = useAnalytics();

  useEffect(() => {
    capture("onboarding_view", { screen: "intro_1" });
  }, [capture]);

  return (
    <EBScreen>
      <View className="flex-1">
        <View className="mt-6 rounded-3xl bg-[#EFF8FF] p-5">
          <Text className="text-2xl font-semibold text-slate-900">Welcome to Easy Bite</Text>
          <Text className="mt-3 text-lg text-slate-800">
            We’re here to provide tools and knowledge—not to judge, lecture, or “educate.”
          </Text>
        </View>

        <View className="mt-6 rounded-3xl bg-[#ECFDF5] p-5">
          <Text className="text-xl font-semibold text-slate-900">Food you love, with better awareness</Text>
          <Text className="mt-2 text-lg text-slate-800">
            We want to help you make better choices based on the food you actually love.
          </Text>
        </View>
      </View>

      <EBButton
        analyticsEvent="tap_primary"
        analyticsProps={{ screen: "intro_1", action: "continue" }}
        onPress={() => router.push("/(onboarding)/intro-2")}
      >
        Continue
      </EBButton>
    </EBScreen>
  );
}

