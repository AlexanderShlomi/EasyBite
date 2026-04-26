import { usePostHog } from "posthog-react-native";

export type AnalyticsEvent =
  | "tap_primary"
  | "tap_secondary"
  | "tap_link"
  | "onboarding_view"
  | "onboarding_answered"
  | "onboarding_completed"
  | "dashboard_view";

export type AnalyticsProps = Record<string, unknown>;

export function useAnalytics() {
  const posthog = usePostHog();

  return {
    capture: (event: AnalyticsEvent, properties?: AnalyticsProps) => {
      // We intentionally avoid hard failures in early scaffolding / missing keys.
      posthog?.capture?.(event, properties);
    },
  };
}

