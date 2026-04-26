import { Alert, Text, View } from "react-native";
import { EBScreen } from "@/src/ui/EBScreen";
import { EBButton } from "@/src/ui/EBButton";
import { setOnboardingDone } from "@/src/features/onboarding/onboardingStorage";
import { router } from "expo-router";
import { InsightsCard } from "@/src/ui/InsightsCard";
import { getMockInsightForToday } from "@/src/features/insights/mockInsights";
import { EBFab } from "@/src/ui/EBFab";
import { useAnalytics } from "@/src/analytics/analytics";
import { useEffect } from "react";
import { Header } from "@/src/ui/Header";
import { EBContainer } from "@/src/ui/EBContainer";

export default function HomeScreen() {
  const { capture } = useAnalytics();
  const insight = getMockInsightForToday();
  useEffect(() => {
    capture("dashboard_view", { screen: "home" });
  }, [capture]);
  return (
    <EBScreen padded={false}>
      <View className="flex-1 px-5 py-5">
        <View className="mt-2">
          <Header name="אורח/ת" subtitle="בריאות בפשטות" showUpgradeBadge />
        </View>

        <View className="mt-10">
          <EBContainer>
            <Text className="text-2xl font-bold text-slate-900 text-right">המיקוד להיום</Text>
            <Text className="mt-2 text-lg text-slate-700 text-right">
              בלי שיפוטיות — רק בהירות פרקטית לגבי המאכלים שאתם כבר אוהבים.
            </Text>
          </EBContainer>
        </View>

        <View className="mt-6">
          <InsightsCard insight={insight} />
        </View>

        <View className="mt-6 gap-3">
          <EBButton
            variant="secondary"
            analyticsEvent="tap_secondary"
            analyticsProps={{ screen: "home", action: "open_history" }}
            onPress={() => router.push("/(tabs)/history")}
          >
            היסטוריה
          </EBButton>
          <EBButton
            variant="secondary"
            analyticsEvent="tap_secondary"
            analyticsProps={{ screen: "home", action: "open_reports" }}
            onPress={() => router.push("/(tabs)/reports")}
          >
            דוחות
          </EBButton>
          <EBButton
            variant="secondary"
            analyticsEvent="tap_secondary"
            analyticsProps={{ screen: "home", action: "open_info_bot" }}
            onPress={() => router.push("/(tabs)/info-bot")}
          >
            בוט מידע
          </EBButton>
        </View>

        <View className="mt-8">
          {__DEV__ ? (
            <EBButton
              variant="ghost"
              analyticsEvent="tap_link"
              analyticsProps={{ screen: "home", action: "restart_onboarding_debug" }}
              onPress={async () => {
                await setOnboardingDone(false);
                router.replace("/(onboarding)/intro-1");
              }}
            >
              איפוס אונבורדינג (דיבאג)
            </EBButton>
          ) : null}
        </View>

        <EBFab
          analyticsProps={{ screen: "home", action: "fab_upload_photo" }}
          onPress={() => {
            capture("tap_primary", { screen: "home", action: "fab_upload_photo" });
            Alert.alert("העלאה (דמו)", "כאן תיפתח מצלמה/גלריה בהמשך, עם זרימת Edge Function.");
          }}
        />
      </View>
    </EBScreen>
  );
}

