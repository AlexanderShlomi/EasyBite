import { useEffect } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { EBScreen } from "@/src/ui/EBScreen";
import { EBButton } from "@/src/ui/EBButton";
import { useAnalytics } from "@/src/analytics/analytics";

export default function AuthScreen() {
  const { capture } = useAnalytics();

  useEffect(() => {
    capture("onboarding_view", { screen: "auth" });
  }, [capture]);

  const goNext = () => router.push("/(onboarding)/preferences");

  return (
    <EBScreen>
      <View className="flex-1">
        <Text className="mt-6 text-3xl font-semibold text-slate-900 dark:text-white">Sign in to save your progress</Text>
        <Text className="mt-3 text-lg text-slate-700 dark:text-slate-200">
          Choose what’s easiest. You can always switch methods later.
        </Text>

        <View className="mt-8 gap-3">
          <EBButton
            analyticsProps={{ screen: "auth", provider: "apple", action: "tap_sign_in" }}
            onPress={() => {
              capture("tap_primary", { screen: "auth", provider: "apple" });
              goNext();
            }}
          >
            Continue with Apple
          </EBButton>

          <EBButton
            variant="secondary"
            analyticsEvent="tap_secondary"
            analyticsProps={{ screen: "auth", provider: "google", action: "tap_sign_in" }}
            onPress={() => goNext()}
          >
            Continue with Google
          </EBButton>

          <EBButton
            variant="secondary"
            analyticsEvent="tap_secondary"
            analyticsProps={{ screen: "auth", provider: "email", action: "tap_sign_in" }}
            onPress={() => goNext()}
          >
            Continue with Email
          </EBButton>

          <EBButton
            variant="secondary"
            analyticsEvent="tap_secondary"
            analyticsProps={{ screen: "auth", provider: "facebook", action: "tap_sign_in" }}
            onPress={() => goNext()}
          >
            Continue with Facebook
          </EBButton>
        </View>
      </View>

      <EBButton
        variant="ghost"
        analyticsEvent="tap_link"
        analyticsProps={{ screen: "auth", action: "back" }}
        onPress={() => router.back()}
      >
        Back
      </EBButton>
    </EBScreen>
  );
}

