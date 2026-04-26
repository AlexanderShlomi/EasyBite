import { useEffect } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { EBScreen } from "@/src/ui/EBScreen";
import { EBButton } from "@/src/ui/EBButton";
import { useAnalytics } from "@/src/analytics/analytics";
import { Colors } from "@/constants/theme";

export default function AuthScreen() {
  const { capture } = useAnalytics();

  useEffect(() => {
    capture("onboarding_view", { screen: "auth" });
  }, [capture]);

  const goNext = () => router.push("/(onboarding)/permissions");

  return (
    <EBScreen>
      <View className="flex-1">
        <Text className="mt-6 text-3xl font-semibold text-right" style={{ color: Colors.light.text }}>
          התחברו כדי לשמור את ההתקדמות
        </Text>
        <Text className="mt-3 text-lg text-right" style={{ color: Colors.light.textMuted }}>
          בחרו מה שהכי נוח. תמיד אפשר לשנות שיטה אחר כך.
        </Text>

        <View className="mt-8 gap-3">
          <EBButton
            analyticsProps={{ screen: "auth", provider: "apple", action: "tap_sign_in" }}
            onPress={() => {
              capture("tap_primary", { screen: "auth", provider: "apple" });
              goNext();
            }}
          >
            המשך עם Apple
          </EBButton>

          <EBButton
            variant="secondary"
            analyticsEvent="tap_secondary"
            analyticsProps={{ screen: "auth", provider: "google", action: "tap_sign_in" }}
            onPress={() => goNext()}
          >
            המשך עם Google
          </EBButton>

          <EBButton
            variant="secondary"
            analyticsEvent="tap_secondary"
            analyticsProps={{ screen: "auth", provider: "email", action: "tap_sign_in" }}
            onPress={() => goNext()}
          >
            המשך עם Email
          </EBButton>

          <EBButton
            variant="secondary"
            analyticsEvent="tap_secondary"
            analyticsProps={{ screen: "auth", provider: "facebook", action: "tap_sign_in" }}
            onPress={() => goNext()}
          >
            המשך עם Facebook
          </EBButton>
        </View>

        <Text className="mt-6 text-right" style={{ fontSize: 14, color: Colors.light.textMuted, lineHeight: 20 }}>
          בעצם המשך התהליך, הנכם מאשרים את תנאי השימוש ומדיניות הפרטיות של Easy Bites.
        </Text>
      </View>

      <EBButton
        variant="ghost"
        analyticsEvent="tap_link"
        analyticsProps={{ screen: "auth", action: "back" }}
        onPress={() => router.back()}
      >
        חזרה
      </EBButton>
    </EBScreen>
  );
}

