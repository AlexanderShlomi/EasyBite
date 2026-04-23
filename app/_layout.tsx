import { Stack } from "expo-router";
import { PostHogProvider } from "posthog-react-native";

const posthogKey = process.env.EXPO_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.EXPO_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com";

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
          contentStyle: { backgroundColor: "#F9F9F7" },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </PostHogProvider>
  );
}
