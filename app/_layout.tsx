import { Stack } from "expo-router";
import { PostHogProvider } from "posthog-react-native";
import { Platform } from "react-native";
import { Colors } from "@/constants/theme";

const posthogKey = process.env.EXPO_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.EXPO_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com";

if (Platform.OS === "web") {
  require("../global.css");
}

export default function RootLayout() {
  return (
    <PostHogProvider
      apiKey={posthogKey ?? "disabled"}
      options={{
        host: posthogHost,
        disabled: !posthogKey,
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.light.background },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </PostHogProvider>
  );
}
