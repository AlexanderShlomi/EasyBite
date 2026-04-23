import { Platform } from "react-native";

/**
 * Easy Bite theme tokens.
 * Constraints:
 * - Large text defaults (18pt+) via `text-lg` in UI components
 * - WCAG AA-friendly contrast targets (avoid low-contrast grays)
 * - Palette: warm luxury metallic + cream background (Silver 2026)
 *   Source of truth: `app-functionality-he.md`
 */

export const Palette = {
  // Brand neutrals
  cream: "#FAF9F6",
  white: "#FFFFFF",
  // Text
  textPrimary: "#2C3E50",
  textSecondary: "#546E7A",
  // Borders / subtle UI chrome
  border: "#E0E0E0",
  // Primary (warm metallic)
  primary: "#D4AF37",
  primaryAlt: "#C19A6B",
  // Accent (success only)
  successNeon: "#00E676",
  // Functional
  danger: "#EF4444",
} as const;

export const Colors = {
  light: {
    background: Palette.cream,
    surface: Palette.white,
    surface2: "#F5F3EE",
    text: Palette.textPrimary,
    textMuted: Palette.textSecondary,
    border: Palette.border,
    primary: Palette.primary,
    primaryPressed: Palette.primaryAlt,
    // Success is the only place we use the neon accent.
    success: Palette.successNeon,
    warning: "#B7791F",
    focusRing: Palette.primary,
  },
  dark: {
    background: "#0F0F10",
    surface: "#171718",
    surface2: "#1F1F20",
    text: "#F5F2EA",
    textMuted: "#CFC7BB",
    border: "#2A2A2C",
    primary: "#D4AF37",
    primaryPressed: "#C19A6B",
    success: "#00E676",
    warning: "#F6AD55",
    focusRing: "#D4AF37",
  },
} as const;

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const Typography = {
  // Minimum sizes for accessibility (target audience 50+)
  h1: { fontSize: 32, fontWeight: "700" as const, lineHeight: Math.round(32 * 1.3) },
  h2: { fontSize: 24, fontWeight: "600" as const, lineHeight: Math.round(24 * 1.4) },
  body: { fontSize: 18, fontWeight: "400" as const, lineHeight: Math.round(18 * 1.5) },
  button: { fontSize: 20, fontWeight: "500" as const, lineHeight: Math.round(20 * 1.2) },
} as const;

export const A11ySizing = {
  // Components
  minTouch: 48,
  buttonHeight: 56,
  inputHeight: 56,
  radius: 12,
  fabSize: 64,
} as const;

export const Elevation = {
  // Matches PRD: 0px 4px 12px rgba(0,0,0,0.05)
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
} as const;
