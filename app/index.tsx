import { Redirect } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { useOnboardingGate } from "@/src/features/onboarding/useOnboardingGate";
export default function Index() {
  const { ready, done } = useOnboardingGate();

  if (!ready) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-[#0B1220] px-5">
        <ActivityIndicator />
        <Text className="mt-4 text-lg text-slate-900 dark:text-white">Loading…</Text>
      </View>
    );
  }

  if (!done) return <Redirect href="/(onboarding)/intro-1" />;
  return <Redirect href="/(tabs)/home" />;
}