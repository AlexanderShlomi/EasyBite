import { useEffect } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { EBScreen } from "@/src/ui/EBScreen";
import { EBButton } from "@/src/ui/EBButton";
import { EBContainer } from "@/src/ui/EBContainer";
import { useAnalytics } from "@/src/analytics/analytics";
import { Colors } from "@/constants/theme";

export default function PermissionsScreen() {
  const { capture } = useAnalytics();

  useEffect(() => {
    capture("onboarding_view", { screen: "permissions" });
  }, [capture]);

  const close = () => router.replace("/(onboarding)/preferences");

  return (
    <EBScreen padded={false}>
      <Modal animationType="fade" transparent visible>
        <View className="flex-1 items-center justify-center px-5" style={{ backgroundColor: "rgba(0,0,0,0.25)" }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="סגור"
            onPress={close}
            className="absolute inset-0"
          />

          <EBContainer className="w-full" padded>
            <Text className="text-2xl font-semibold text-right" style={{ color: Colors.light.text }}>
              הודעות חשובות (רק כשצריך)
            </Text>
            <Text className="mt-3 text-lg text-right" style={{ color: Colors.light.textMuted }}>
              כדי שנוכל להזכיר לכם על מרכיבים חיוניים ולשתף עדכונים חשובים, נשמח לשלוח לכם התראות.
            </Text>

            <View className="mt-6 flex-row gap-3">
              <View className="flex-1">
                <EBButton
                  variant="ghost"
                  analyticsEvent="tap_secondary"
                  analyticsProps={{ screen: "permissions", action: "maybe_later" }}
                  onPress={close}
                >
                  אולי אחר כך
                </EBButton>
              </View>
              <View className="flex-1">
                <EBButton analyticsProps={{ screen: "permissions", action: "allow_notifications" }} onPress={close}>
                  אפשר התראות
                </EBButton>
              </View>
            </View>
          </EBContainer>
        </View>
      </Modal>
    </EBScreen>
  );
}

