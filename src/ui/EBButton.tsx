import { PropsWithChildren } from "react";
import { Pressable, PressableProps, Text } from "react-native";
import { useAnalytics } from "@/src/analytics/analytics";
import { Colors } from "@/constants/theme";

type Variant = "primary" | "secondary" | "ghost";

type Props = PropsWithChildren<
  Omit<PressableProps, "onPress"> & {
    onPress: () => void;
    variant?: Variant;
    analyticsEvent?: Parameters<ReturnType<typeof useAnalytics>["capture"]>[0];
    analyticsProps?: Record<string, unknown>;
    label?: string;
  }
>;

export function EBButton({
  children,
  onPress,
  variant = "primary",
  analyticsEvent = "tap_primary",
  analyticsProps,
  accessibilityLabel,
  label,
  ...rest
}: Props) {
  const { capture } = useAnalytics();

  // PRD: min height 56, radius 12, button text 20px.
  const base =
    "min-h-14 rounded-3xl px-5 py-4 items-center justify-center active:opacity-90 shadow-card";
  const variants: Record<Variant, string> = {
    primary: `${base}`,
    secondary: `${base}`,
    ghost: `min-h-14 rounded-3xl px-5 py-4 items-center justify-center active:opacity-90 bg-transparent`,
  };

  const a11yLabel =
    accessibilityLabel ?? label ?? (typeof children === "string" ? children : undefined);
  const disabled = Boolean(rest.disabled);

  const primaryStyle = { backgroundColor: Colors.light.primary };
  const primaryDisabledStyle = { backgroundColor: Colors.light.border };
  const secondaryStyle = {
    backgroundColor: Colors.light.surface2,
    borderWidth: 1,
    borderColor: Colors.light.border,
  } as const;

  const textColor =
    variant === "primary"
      ? Colors.light.text
      : variant === "secondary"
        ? Colors.light.text
        : Colors.light.primary;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
      accessibilityState={{ disabled }}
      onPress={() => {
        capture(analyticsEvent, analyticsProps);
        onPress();
      }}
      className={`${variants[variant]} ${disabled ? "opacity-50" : ""}`}
      style={
        variant === "primary"
          ? disabled
            ? primaryDisabledStyle
            : primaryStyle
          : variant === "secondary"
            ? secondaryStyle
            : undefined
      }
      {...rest}
    >
      {typeof children === "string" ? (
        <Text className="text-xl font-semibold" style={{ color: textColor }}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

