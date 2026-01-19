import { Platform } from "react-native";

const tintColorLight = "#007AFF";
const tintColorDark = "#0A84FF";

export const Colors = {
  light: {
    text: "#11181C",
    buttonText: "#FFFFFF",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    link: "#007AFF",
    backgroundRoot: "#FFFFFF",
    backgroundDefault: "#F2F2F2",
    backgroundSecondary: "#E6E6E6",
    backgroundTertiary: "#D9D9D9",
  },
  dark: {
    text: "#ECEDEE",
    buttonText: "#FFFFFF",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    link: "#0A84FF",
    backgroundRoot: "#1F2123",
    backgroundDefault: "#2A2C2E",
    backgroundSecondary: "#353739",
    backgroundTertiary: "#404244",
  },
};

export const GameColors = {
  papalGold: "#C9A961",
  bloodCrimson: "#8B0000",
  textPrimary: "#F5F5DC",
  textSecondary: "#A9A9A9",
  textWarning: "#FF4500",
  overlayBackground: "rgba(0,0,0,0.85)",
  sceneBackgrounds: {
    coronation: {
      colors: ["#C9A961", "#8B5A00"],
      start: { x: 0.5, y: 0 },
      end: { x: 0.5, y: 1 },
    },
    council: {
      colors: ["#5C4033", "#1A1A1A"],
      start: { x: 0.5, y: 0 },
      end: { x: 0.5, y: 1 },
    },
    war: {
      colors: ["#8B0000", "#0D0D0D"],
      start: { x: 0.5, y: 0 },
      end: { x: 0.5, y: 1 },
    },
    famine: {
      colors: ["#4A4A4A", "#1A1A1A"],
      start: { x: 0.5, y: 0 },
      end: { x: 0.5, y: 1 },
    },
    scandal: {
      colors: ["#2F4F2F", "#0A0A0A"],
      start: { x: 0.5, y: 0 },
      end: { x: 0.5, y: 1 },
    },
    schism: {
      colors: ["#C9A961", "#8B0000"],
      start: { x: 0, y: 0.5 },
      end: { x: 1, y: 0.5 },
    },
    judgment: {
      colors: ["#000000", "#0A0A0A"],
      start: { x: 0.5, y: 0 },
      end: { x: 0.5, y: 1 },
    },
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  inputHeight: 48,
  buttonHeight: 52,
};

export const BorderRadius = {
  xs: 8,
  sm: 12,
  md: 18,
  lg: 24,
  xl: 30,
  "2xl": 40,
  "3xl": 50,
  full: 9999,
};

export const Typography = {
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "700" as const,
  },
  h2: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "700" as const,
  },
  h3: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "600" as const,
  },
  h4: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "600" as const,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400" as const,
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400" as const,
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400" as const,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
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
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
