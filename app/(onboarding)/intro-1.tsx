import { useEffect } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { EBScreen } from "@/src/ui/EBScreen";
import { useAnalytics } from "@/src/analytics/analytics";

export default function Intro1Screen() {
  const { capture } = useAnalytics();

  useEffect(() => {
    capture("onboarding_view", { screen: "intro_1" });
  }, [capture]);

  return (
    <EBScreen padded={false}>
      <View className="flex-1 bg-[#FAFAFA] px-6 py-6">
        <View className="flex-[4]">
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1400&q=80" }}
            resizeMode="cover"
            accessibilityIgnoresInvertColors
            className="h-full w-full rounded-3xl shadow-lg"
          />
        </View>

        <View className="flex-[6] justify-between gap-8 pt-6">
          <View className="items-center gap-4">
            <Text
              className="text-3xl font-semibold text-gray-800 text-center leading-relaxed"
              style={{ writingDirection: "rtl" }}
              accessibilityRole="header"
            >
              להפיק את המקסימום ממה שאתם אוהבים.
            </Text>
            <Text
              className="text-xl text-gray-600 text-center leading-relaxed"
              style={{ writingDirection: "rtl" }}
            >
              כלים פשוטים שיעזרו לכם להבין מה באמת חשוב בתזונה שלכם — בלי לשנות את שגרת החיים.
            </Text>
          </View>

          <View className="gap-4">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="התחל עכשיו"
              accessibilityHint="מעבר לשאלות ההיכרות"
              className="min-h-14 items-center justify-center rounded-xl bg-[#D4AF37] py-4 shadow-lg active:opacity-90"
              onPress={() => {
                capture("tap_primary", { screen: "intro_1", action: "start_now" });
                router.push("/(onboarding)/question-gender");
              }}
            >
              <Text className="text-xl font-bold text-white" style={{ writingDirection: "rtl" }}>
                התחל עכשיו
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="link"
              accessibilityLabel="כבר יש לך חשבון? התחבר/י"
              accessibilityHint="מעבר למסך התחברות"
              className="min-h-12 items-center justify-center py-2 active:opacity-80"
              onPress={() => {
                capture("tap_link", { screen: "intro_1", action: "login" });
                router.push("/(onboarding)/auth");
              }}
            >
              <Text className="text-lg text-gray-500 underline" style={{ writingDirection: "rtl" }}>
                כבר יש לך חשבון? התחבר/י
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </EBScreen>
  );
}

